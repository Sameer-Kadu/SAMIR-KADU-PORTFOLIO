"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useExplorer } from "@/lib/explorer/store";
import {
  DESTINATION_BY_ID,
  LANDING_CAMERA,
  PHASE_DURATION,
  destinationCamera,
  type Phase,
} from "@/lib/explorer/journey";
import { EARTH_POSITION, EARTH_RADIUS } from "./layout";

/** Smoothstep — the easing used for every cinematic move. */
const ease = (t: number) => t * t * (3 - 2 * t);
/** Slow-out only, for moves that should decelerate into place. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const PHASE_AFTER: Partial<Record<Phase, Phase>> = {
  warp: "cockpit",
  arming: "approach",
  approach: "entry",
  entry: "clouds",
  clouds: "landing",
  landing: "world",
};

/**
 * Single owner of the camera.
 *
 * Every phase writes a target position/look-at, and the rig damps toward it.
 * Nothing else in the scene touches the camera, which is what keeps the
 * transitions from fighting each other.
 */
export default function CameraRig() {
  const { camera, size } = useThree();
  const { phase, setPhase, destination, progress, phaseStart, reducedMotion } = useExplorer();

  const pointer = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });
  const lookAt = useRef(new THREE.Vector3());
  const startPos = useRef(new THREE.Vector3());

  // Damped pointer, captured on the window so it keeps working over the HUD.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Snapshot where the camera was when a cinematic phase begins.
  useEffect(() => {
    startPos.current.copy(camera.position);
  }, [phase, camera]);

  // Keep the framing sane on very wide or very short viewports.
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    cam.fov = aspect < 1.5 ? 62 : aspect > 2.2 ? 48 : 54;
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Advance the phase clock and auto-transition when a cinematic completes.
    // Timed against the wall clock, so dropped frames shorten the animation
    // rather than stretching the sequence out indefinitely.
    const duration = PHASE_DURATION[phase];
    if (duration) {
      const elapsed = (performance.now() - phaseStart.current) / 1000;
      progress.current = Math.min(1, elapsed / duration);
      if (progress.current >= 1) {
        const next = PHASE_AFTER[phase];
        if (next) setPhase(next);
      }
    }

    const p = progress.current;

    // Damped mouse-look. Reduced motion cuts the amplitude to near zero rather
    // than removing the mechanic, so the scene still feels responsive.
    const lookScale = reducedMotion ? 0.12 : 1;
    const k = 1 - Math.exp(-3.4 * dt);
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * k;
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * k;

    const target = new THREE.Vector3();
    const desiredLook = new THREE.Vector3();

    switch (phase) {
      case "warp": {
        // Arrival: already at speed, decelerating. The camera eases forward and
        // the idle drift fades in as the ship comes back under control.
        const e = easeOut(p);
        target.set(0, 0, 6 + (1 - e) * 3.5);
        desiredLook.copy(EARTH_POSITION);
        // Earth swings into frame as the ship settles onto its new heading.
        desiredLook.x += (1 - e) * 34;
        desiredLook.y += (1 - e) * 9;
        break;
      }

      case "arming": {
        // Anticipation. A small pull-back and a settle before the burn — the
        // windup that makes the acceleration land.
        const e = ease(p);
        target.set(0, 0, 6 + Math.sin(p * Math.PI) * 1.8);
        target.x += smoothed.current.x * -0.5 * lookScale * (1 - e);
        desiredLook.copy(EARTH_POSITION);
        break;
      }

      case "loading":
      case "cockpit": {
        // Drifting inside the ship: small positional sway, gentle look-around.
        //
        // Amplitudes are deliberately low. Earth is the click target, and a
        // strong look-offset makes it slide away from the cursor as you reach
        // for it. Most of the felt parallax comes from the depth-layered stars
        // rather than from swinging the view.
        //
        // The reference camera never holds still, even at rest — so underneath
        // the mouse-look there is a slow, permanent drift. Two incommensurate
        // periods so the motion never visibly loops.
        const t = performance.now() / 1000;
        const driftX = reducedMotion ? 0 : Math.sin(t * 0.11) * 2.4 + Math.sin(t * 0.047) * 1.2;
        const driftY = reducedMotion ? 0 : Math.cos(t * 0.083) * 1.1;

        target.set(
          smoothed.current.x * -1.1 * lookScale + driftX * 0.16,
          smoothed.current.y * -0.6 * lookScale + driftY * 0.18,
          6
        );
        desiredLook.copy(EARTH_POSITION);
        desiredLook.x += smoothed.current.x * 1.9 * lookScale + driftX;
        desiredLook.y += smoothed.current.y * -1.1 * lookScale + driftY;
        break;
      }

      case "approach": {
        // Travel most of the distance to Earth, decelerating into the limb.
        const e = ease(p);
        const from = new THREE.Vector3(0, 0, 6);
        const stop = EARTH_POSITION.clone();
        stop.z += EARTH_RADIUS * 2.35;
        stop.y += EARTH_RADIUS * 0.18;

        target.lerpVectors(from, stop, e);
        // Mouse-look authority fades out as the sequence takes over.
        const authority = (1 - e) * lookScale;
        target.x += smoothed.current.x * -1.1 * authority;
        target.y += smoothed.current.y * -0.6 * authority;

        desiredLook.copy(EARTH_POSITION);
        break;
      }

      case "entry": {
        // Drop toward the limb until the atmosphere fills the frame.
        const e = easeOut(p);
        const from = EARTH_POSITION.clone();
        from.z += EARTH_RADIUS * 2.35;
        from.y += EARTH_RADIUS * 0.18;

        const to = EARTH_POSITION.clone();
        to.z += EARTH_RADIUS * 1.09;
        to.y += EARTH_RADIUS * 0.02;

        target.lerpVectors(from, to, e);
        desiredLook.copy(EARTH_POSITION);
        break;
      }

      case "clouds": {
        // Inside the cloud deck the veil owns the screen; the camera just
        // keeps easing forward so the reveal has momentum behind it.
        const e = p;
        const from = EARTH_POSITION.clone();
        from.z += EARTH_RADIUS * 1.09;
        const to = EARTH_POSITION.clone();
        to.z += EARTH_RADIUS * 1.015;
        target.lerpVectors(from, to, e);
        desiredLook.copy(EARTH_POSITION);
        break;
      }

      case "landing": {
        // First frame on the ground: settle from a little above the pad.
        const e = easeOut(p);
        const from = new THREE.Vector3(0, 26, 52);
        const to = new THREE.Vector3(...LANDING_CAMERA.position);
        target.lerpVectors(from, to, e);
        desiredLook.set(...LANDING_CAMERA.target);
        break;
      }

      case "world": {
        const active = destination ? DESTINATION_BY_ID[destination] : null;
        const view = active ? destinationCamera(active) : LANDING_CAMERA;

        target.set(...view.position);
        desiredLook.set(...view.target);

        // Free look while standing still, damped and clamped.
        target.x += smoothed.current.x * -3.2 * lookScale;
        target.y += smoothed.current.y * -1.4 * lookScale;
        desiredLook.x += smoothed.current.x * 2.6 * lookScale;
        desiredLook.y += smoothed.current.y * -1.2 * lookScale;
        break;
      }
    }

    // Cinematic phases are already time-parameterised, so they snap to target;
    // interactive phases get an extra damping pass for weight.
    const interactive = phase === "cockpit" || phase === "world" || phase === "loading";
    if (interactive) {
      const damp = 1 - Math.exp(-(phase === "world" ? 2.6 : 3.0) * dt);
      camera.position.lerp(target, damp);
      lookAt.current.lerp(desiredLook, damp);
    } else {
      camera.position.copy(target);
      lookAt.current.lerp(desiredLook, 1 - Math.exp(-6 * dt));
    }

    camera.lookAt(lookAt.current);
  });

  return null;
}
