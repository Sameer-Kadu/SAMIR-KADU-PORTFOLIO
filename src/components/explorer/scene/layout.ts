import * as THREE from "three";

/**
 * Scene layout constants.
 *
 * Shared between the camera rig and the space scene so the cinematic never
 * drifts out of sync with where the bodies actually are. Earth sits slightly
 * off-centre and below the horizon line — composition first, so the visitor
 * discovers it rather than being pointed at it.
 */
export const EARTH_RADIUS = 6;
export const EARTH_POSITION = new THREE.Vector3(5.5, -1.6, -62);

export const MOON_RADIUS = 1.55;
export const MOON_POSITION: [number, number, number] = [-21, 7.5, -104];

export const SUN_POSITION: [number, number, number] = [74, 26, -250];

export const DISTANT_PLANETS = [
  { position: [-64, -20, -300] as [number, number, number], radius: 4.2, color: "#5a4b6b" },
  { position: [96, -34, -340] as [number, number, number], radius: 2.6, color: "#3d5570" },
];

/** Direction the sun light arrives from, in world space. */
export const SUN_DIR = new THREE.Vector3(1, 0.28, 0.55).normalize();
