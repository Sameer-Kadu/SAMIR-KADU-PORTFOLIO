'use client';

import React, { memo } from "react";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { MoveDirection, OutMode } from "@tsparticles/engine";

const isMobileOrLowEnd = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || navigator.maxTouchPoints > 0;
};

const ParticlesContainer = memo(() => {
  const [init, setInit] = useState(false);
  const [isMobile] = useState(isMobileOrLowEnd);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async () => {};

  const options = useMemo(
    () => ({
      background: {
        color: { value: "" },
      },
      fpsLimit: isMobile ? 30 : 60,
      interactivity: {
        events: {
          onClick: { enable: !isMobile, mode: "push" },
          onHover: { enable: !isMobile, mode: "repulse" },
        },
        modes: {
          push: { quantity: 2 },
          repulse: { distance: 80, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 130,
          enable: !isMobile,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.bounce },
          random: false,
          speed: isMobile ? 1 : 2,
        },
        number: {
          density: { enable: true },
          value: isMobile ? 18 : 35,
        },
        opacity: { value: isMobile ? 0.3 : 0.45 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: false,
    }),
    [isMobile]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute top-0 left-0 w-full h-full z-[1]"
      />
    );
  }

  return <></>;
});

export default ParticlesContainer;

