"use client";

import { useExplorer } from "@/lib/explorer/store";
import Earth from "./Earth";
import Starfield from "./Starfield";
import { DistantPlanet, Moon, Nebula, Sun } from "./CelestialBodies";
import {
  DISTANT_PLANETS,
  EARTH_POSITION,
  EARTH_RADIUS,
  MOON_POSITION,
  MOON_RADIUS,
  SUN_DIR,
  SUN_POSITION,
} from "./layout";

/**
 * Everything visible through the cockpit window.
 *
 * Earth is the only interactive object; every other body exists for depth,
 * scale and composition.
 */
export default function SpaceScene({ onEnterEarth }: { onEnterEarth: () => void }) {
  const { phase, setEarthHovered, quality } = useExplorer();

  const cinematic = phase !== "cockpit";

  return (
    <>
      <Nebula />
      <Starfield />

      <Sun position={SUN_POSITION} />
      <Moon position={MOON_POSITION} radius={MOON_RADIUS} sunDir={SUN_DIR} />

      {quality !== "low" &&
        DISTANT_PLANETS.map((p) => (
          <DistantPlanet
            key={`${p.position[0]}-${p.position[2]}`}
            position={p.position}
            radius={p.radius}
            color={p.color}
            sunDir={SUN_DIR}
          />
        ))}

      <group position={EARTH_POSITION}>
        <Earth
          radius={EARTH_RADIUS}
          interactive={!cinematic}
          onPointerOver={() => setEarthHovered(true)}
          onPointerOut={() => setEarthHovered(false)}
          onClick={onEnterEarth}
        />
      </group>
    </>
  );
}
