import { GLSL_NOISE, GLSL_ROTATE_Y } from "./common";

/**
 * Earth surface.
 *
 * Continents are generated from domain-warped fBm evaluated on the sphere
 * normal, so there is no seam and no texture to download. The shader carries a
 * single `uHover` uniform that drives the entire "this is interactive"
 * transformation — saturation, city lights, specular and rim all lift together.
 */
export const earthVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPosL;
  varying vec3 vViewDir;

  void main() {
    vPosL = normalize(position);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const earthFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uHover;      // 0 = distant and cool, 1 = alive and saturated
  uniform vec3  uSunDir;     // normalised, world space
  uniform vec3  uAccent;     // portfolio accent, tints the night side
  uniform int   uOctaves;    // quality tier

  varying vec3 vNormalW;
  varying vec3 vPosL;
  varying vec3 vViewDir;

  ${GLSL_NOISE}
  ${GLSL_ROTATE_Y}

  void main() {
    vec3 sp = normalize(vPosL);

    // ── Landmass ──────────────────────────────────────────────
    // A low-frequency warp field pushes the continent noise around so the
    // shapes read as coastlines rather than blobs.
    float warp = fbm(sp * 1.7, max(uOctaves - 2, 2));
    float h = fbm(sp * 2.25 + warp * 0.85, uOctaves);

    // Squeeze land toward the mid-latitudes, thin it out near the poles.
    float latBias = 1.0 - 0.28 * pow(abs(sp.y), 3.0);
    h *= latBias;

    float land = smoothstep(0.505, 0.560, h);
    float coast = smoothstep(0.490, 0.520, h) - smoothstep(0.545, 0.585, h);

    // Relief on land only — drives both colour and a fake specular break-up.
    float relief = ridge(sp * 6.5 + 11.3, max(uOctaves - 1, 3));

    // ── Palette ───────────────────────────────────────────────
    vec3 deepOcean    = vec3(0.008, 0.045, 0.145);
    vec3 shallowOcean = vec3(0.035, 0.180, 0.360);
    vec3 lowland      = vec3(0.075, 0.165, 0.095);
    vec3 arid         = vec3(0.310, 0.265, 0.165);
    vec3 highland     = vec3(0.215, 0.205, 0.180);

    float oceanDepth = smoothstep(0.36, 0.52, h);
    vec3 ocean = mix(deepOcean, shallowOcean, oceanDepth);

    // Arid belts around ±25° latitude, greener toward the equator and poles.
    float aridBand = smoothstep(0.12, 0.42, abs(sp.y)) * (1.0 - smoothstep(0.52, 0.78, abs(sp.y)));
    vec3 ground = mix(lowland, arid, aridBand * 0.85);
    ground = mix(ground, highland, smoothstep(0.55, 0.95, relief));

    vec3 albedo = mix(ocean, ground, land);

    // Polar ice, pushed outward slightly where the terrain is high.
    float ice = smoothstep(0.72, 0.90, abs(sp.y) + relief * 0.06);
    albedo = mix(albedo, vec3(0.86, 0.90, 0.95), ice);

    // Coastal brightening — the detail that sells a planet at distance.
    albedo += vec3(0.05, 0.11, 0.14) * coast * (1.0 - ice);

    // ── Lighting ──────────────────────────────────────────────
    vec3 N = normalize(vNormalW);
    float ndl = dot(N, normalize(uSunDir));
    float day = smoothstep(-0.14, 0.30, ndl);

    // Ocean specular: tight highlight, suppressed over land and ice.
    vec3 H = normalize(normalize(uSunDir) + vViewDir);
    float spec = pow(max(dot(N, H), 0.0), 90.0);
    spec *= (1.0 - land) * (1.0 - ice) * day;

    vec3 lit = albedo * (0.055 + 0.95 * day);
    lit += vec3(0.55, 0.72, 0.95) * spec * (0.5 + 0.5 * uHover);

    // ── Night side ────────────────────────────────────────────
    // City lights cluster on habitable land: coastal, away from poles and
    // deserts. They are the strongest part of the hover transformation.
    float night = smoothstep(0.10, -0.30, ndl);
    float cityNoise = fbm(sp * 34.0, 4);
    float habitable = land * (1.0 - ice) * (1.0 - aridBand * 0.6);
    float cities = smoothstep(0.60, 0.78, cityNoise) * habitable;
    cities *= 0.35 + 0.65 * smoothstep(0.0, 0.35, coast + 0.12);

    vec3 cityColor = mix(vec3(1.0, 0.78, 0.44), uAccent, 0.28);
    lit += cityColor * cities * night * (0.55 + 1.75 * uHover);

    // A faint airglow band so the dark limb never goes fully black.
    lit += uAccent * 0.035 * night;

    // ── Atmospheric rim on the surface itself ─────────────────
    float fres = pow(1.0 - max(dot(N, vViewDir), 0.0), 3.2);
    vec3 rim = mix(vec3(0.20, 0.42, 0.85), vec3(0.35, 0.66, 1.0), uHover);
    lit += rim * fres * (0.30 + 0.55 * uHover) * (0.25 + 0.75 * day);

    // ── Hover grade ───────────────────────────────────────────
    // Distant Earth is desaturated and cool; approaching it warms and enriches.
    float lum = dot(lit, vec3(0.2126, 0.7152, 0.0722));
    vec3 cool = mix(vec3(lum), lit, 0.62) * vec3(0.88, 0.94, 1.06);
    vec3 rich = mix(vec3(lum), lit, 1.16) * vec3(1.04, 1.01, 0.99);
    vec3 color = mix(cool, rich, uHover);

    color = pow(max(color, 0.0), vec3(0.4545));
    gl_FragColor = vec4(color, 1.0);
  }
`;

/** Cloud shell — a second, slightly larger sphere with drifting fBm cover. */
export const cloudVertex = earthVertex;

export const cloudFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uHover;
  uniform vec3  uSunDir;
  uniform int   uOctaves;

  varying vec3 vNormalW;
  varying vec3 vPosL;
  varying vec3 vViewDir;

  ${GLSL_NOISE}
  ${GLSL_ROTATE_Y}

  void main() {
    // Clouds rotate slightly faster than the surface below them.
    vec3 sp = rotateY(normalize(vPosL), uTime * 0.014);

    float band = fbm(sp * 2.1 + vec3(0.0, uTime * 0.008, 0.0), max(uOctaves - 2, 3));
    float detail = ridge(sp * 5.4 + band * 1.6, uOctaves);

    // Latitudinal banding keeps cloud cover from looking like uniform static.
    float lat = abs(sp.y);
    float bandMask = 0.55 + 0.45 * sin(lat * 9.0 + band * 3.0);

    float cover = smoothstep(0.46, 0.74, detail * bandMask);
    cover *= 1.0 - smoothstep(0.82, 0.99, lat) * 0.45;

    if (cover < 0.004) discard;

    vec3 N = normalize(vNormalW);
    float ndl = dot(N, normalize(uSunDir));
    float day = smoothstep(-0.20, 0.34, ndl);

    vec3 tint = mix(vec3(0.62, 0.70, 0.84), vec3(1.0), day);
    float alpha = cover * (0.16 + 0.72 * day) * (0.72 + 0.28 * uHover);

    // Fade clouds at the limb so they do not form a hard silhouette edge.
    float fres = pow(1.0 - max(dot(N, vViewDir), 0.0), 2.0);
    alpha *= 1.0 - fres * 0.45;

    gl_FragColor = vec4(pow(tint, vec3(0.4545)), alpha);
  }
`;

/**
 * Atmosphere shell, rendered back-face-only so it reads as a halo wrapping the
 * planet rather than a bubble in front of it.
 */
export const atmosphereVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const atmosphereFragment = /* glsl */ `
  precision highp float;

  uniform float uHover;
  uniform vec3  uSunDir;
  uniform vec3  uColor;
  uniform float uIntensity;

  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    vec3 N = normalize(vNormalW);

    // These shells render back-faces-only, so the visible normals point *away*
    // from the camera and dot() is negative. Taking the magnitude makes the
    // falloff depend on the grazing angle: 0 at the silhouette edge, 1 facing
    // straight away. Clamping to zero instead would light the entire disc.
    float ndv = abs(dot(N, vViewDir));

    // Two-lobe falloff: a tight bright band right at the limb plus a wide,
    // very faint haze. A single power term reads as a drawn ring instead.
    float rim  = pow(1.0 - ndv, 7.0);
    float haze = pow(1.0 - ndv, 2.2);

    // Scattering is strongest where the sun grazes the limb.
    float ndl = dot(-N, normalize(uSunDir));
    float scatter = smoothstep(-0.55, 0.85, ndl);

    float a = (rim * 0.85 + haze * 0.16) * (0.22 + 0.78 * scatter);
    a *= uIntensity * (0.70 + 0.50 * uHover);

    vec3 color = mix(uColor, vec3(0.58, 0.80, 1.0), 0.40 * uHover);

    gl_FragColor = vec4(color, clamp(a, 0.0, 1.0));
  }
`;
