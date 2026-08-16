"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExplorer } from "@/lib/explorer/store";

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uStretch;   // 0 = points, 1 = warp streaks
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;

    // Very slow, low-amplitude brightness drift — not a twinkle strobe.
    vTwinkle = 0.82 + 0.18 * sin(uTime * 0.35 + aPhase * 6.2831);

    vec3 pos = position;

    // During the approach, stars stretch away from the direction of travel.
    pos.z += uStretch * 240.0 * (0.35 + 0.65 * fract(aPhase * 7.31));

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = aSize * (1.0 + uStretch * 2.2);
    gl_PointSize = size * uPixelRatio * (260.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    // Round, soft-edged point with a tight core.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 3.0);

    gl_FragColor = vec4(vColor * vTwinkle, glow);
  }
`;

/**
 * Depth-layered star field.
 *
 * Stars are distributed through a spherical shell rather than painted on a
 * backdrop, so mouse-look produces genuine parallax between near and far
 * stars. Colour is sampled from a small stellar-class palette so the field
 * is not uniformly white.
 */
export default function Starfield() {
  const { quality, phase, progress } = useExplorer();
  const points = useRef<THREE.Points>(null);
  const stretchRef = useRef(1);

  const count = quality === "high" ? 4200 : quality === "medium" ? 2600 : 1400;

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    // Loosely based on stellar classes: mostly white/blue-white, a few warm.
    const palette = [
      new THREE.Color("#cfe0ff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#e8f0ff"),
      new THREE.Color("#ffd9b0"),
      new THREE.Color("#ffb885"),
      new THREE.Color("#a9c6ff"),
    ];
    const weights = [0.3, 0.28, 0.2, 0.1, 0.05, 0.07];

    const pickColor = (r: number) => {
      let acc = 0;
      for (let i = 0; i < weights.length; i++) {
        acc += weights[i];
        if (r <= acc) return palette[i];
      }
      return palette[1];
    };

    for (let i = 0; i < count; i++) {
      // Even distribution on a sphere, then pushed to a random shell radius.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const radius = 120 + Math.pow(Math.random(), 0.55) * 480;

      positions[i * 3] = r * Math.cos(theta) * radius;
      positions[i * 3 + 1] = r * Math.sin(theta) * radius;
      positions[i * 3 + 2] = u * radius;

      const c = pickColor(Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Brightness distribution: many faint, a handful genuinely bright.
      sizes[i] = 0.5 + Math.pow(Math.random(), 3.2) * 3.4;
      phases[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uStretch: { value: 0 },
        uPixelRatio: {
          value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
        },
      },
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Speed is read from the phase clock every frame rather than from a prop,
    // so the arrival deceleration is a genuine curve instead of a step.
    const p = progress.current;
    let target = 0;
    if (phase === "warp" || phase === "loading") target = Math.pow(Math.max(0, 1 - p), 0.55);
    else if (phase === "arming") target = 0.05;
    else if (phase === "approach") target = Math.min(1, 0.25 + p * 1.1);
    else if (phase === "entry") target = 0.35 * (1 - p);

    // Building speed reads faster than shedding it.
    const rate = target > stretchRef.current ? 2.4 : 3.6;
    stretchRef.current += (target - stretchRef.current) * (1 - Math.exp(-rate * dt));
    material.uniforms.uStretch.value = stretchRef.current;

    // Almost imperceptible drift keeps the field from feeling like a decal.
    if (points.current) points.current.rotation.y += dt * 0.0016;
  });

  return <points ref={points} geometry={geometry} material={material} raycast={() => null} />;
}
