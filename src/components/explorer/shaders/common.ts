/**
 * Shared GLSL building blocks.
 *
 * The noise here is hand-written value noise rather than an imported simplex
 * implementation, so Explorer View ships no third-party shader code and no
 * texture downloads — the whole planet is generated on the GPU.
 */
export const GLSL_NOISE = /* glsl */ `
  float hash13(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(hash13(i + vec3(0.0, 0.0, 0.0)), hash13(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), f.x),
        f.y
      ),
      f.z
    );
  }

  float fbm(vec3 p, int octaves) {
    float amp = 0.5;
    float sum = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      sum += amp * vnoise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return sum;
  }

  // Ridged variant — used for mountain belts and cloud banding.
  float ridge(vec3 p, int octaves) {
    float amp = 0.5;
    float sum = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      sum += amp * (1.0 - abs(vnoise(p) * 2.0 - 1.0));
      p *= 2.05;
      amp *= 0.5;
    }
    return sum;
  }
`;

/** Rotates a point around the Y axis — cheaper than a full matrix uniform. */
export const GLSL_ROTATE_Y = /* glsl */ `
  vec3 rotateY(vec3 p, float a) {
    float s = sin(a);
    float c = cos(a);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  }
`;
