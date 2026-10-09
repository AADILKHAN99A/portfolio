"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const DEFAULT_PALETTE: Record<string, string> = {
  "--device-shell": "#cfcac0",
  "--device-edge": "#b2ada2",
  "--device-bevel": "#4d4f55",
  "--device-bezel": "#292a2e",
  "--device-black": "#141517",
  "--device-button": "#44464c",
  "--device-indicator": "#00f0ff",
  "--screen-bg": "#0d1a1b",
  "--screen-band": "rgba(13, 26, 27, 0.92)",
  "--screen-code": "#2dd4bf",
  "--screen-text": "#e2e8f0",
  "--screen-spark": "#facc15",
  "--screen-track": "#1b383c",
  "--screen-scan": "rgba(0, 0, 0, 0.15)",
  "--background": "#090d10",
};

function cssColor(name: string): string {
  if (typeof window === "undefined") return DEFAULT_PALETTE[name] || "#888888";
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return DEFAULT_PALETTE[name] || "#888888";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!context) return DEFAULT_PALETTE[name] || "#888888";
    context.fillStyle = value;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return DEFAULT_PALETTE[name] || "#888888";
  }
}

function Screen({ restart }: { restart: number }) {
  const canvas = useMemo(() => {
    if (typeof document === "undefined") return null;
    const element = document.createElement("canvas");
    element.width = 480;
    element.height = 250;
    return element;
  }, []);

  const texture = useMemo(() => {
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [canvas]);

  const startedAt = useRef(0);
  const lastFrame = useRef(-1);

  useEffect(() => {
    startedAt.current = 0;
  }, [restart]);

  useFrame(({ clock }) => {
    if (!canvas || !texture) return;
    const t = clock.getElapsedTime();
    if (startedAt.current === 0) startedAt.current = t;
    const frame = Math.floor(t * 10);
    if (frame === lastFrame.current) return;
    lastFrame.current = frame;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const style = getComputedStyle(document.documentElement);
    const color = (name: string) => style.getPropertyValue(name).trim() || DEFAULT_PALETTE[name] || "#888";
    const elapsed = t - startedAt.current;
    ctx.fillStyle = color("--screen-bg");
    ctx.fillRect(0, 0, 480, 250);

    // Dense, brighter terminal fragments
    ctx.font = "10px monospace";
    const lines = [
      "const future = await create();",
      "npm run dev -- --watch",
      "git commit -m 'launch day'",
      "</hello_world>",
      "101101 001011 110010",
      "function dream() { return true }",
      "[ system.boot : 09 ]",
      "> compiling memories...",
      "0x2F 0x41 0x50 0x50",
      "render( imagination );",
      "while(alive) { code(); }",
      "deploy --prod #letsgo",
    ];
    lines.forEach((line, i) => {
      const flicker = Math.sin(t * (3.4 + i * 0.37) + i * 11) > 0.4;
      ctx.globalAlpha = flicker ? 0.55 : 0.3;
      ctx.fillStyle = i % 3 === 0 ? color("--screen-spark") : color("--screen-code");
      ctx.fillText(line, 14 + (i % 3) * 12, 18 + i * 20);
    });
    ctx.globalAlpha = 1;

    // Translucent dark band
    ctx.fillStyle = color("--screen-band");
    ctx.fillRect(14, 84, 452, 96);
    ctx.fillStyle = color("--screen-code");
    ctx.font = "bold 12px monospace";
    ctx.fillText("// CODE.EXE_", 30, 106);
    ctx.fillStyle = color("--screen-text");
    ctx.font = "bold 30px monospace";
    ctx.fillText("AADIL KHAN", 28, 148);
    if (Math.floor(t * 2) % 2 === 0) ctx.fillRect(230, 130, 16, 7);
    ctx.fillStyle = color("--screen-code");
    ctx.font = "11px monospace";
    ctx.fillText("print('hello, world') // mobile & full-stack engineer", 30, 170);

    const progress = Math.min(1, elapsed / 16);
    ctx.fillStyle = color("--screen-code");
    ctx.font = "10px monospace";
    ctx.fillText("BOOT SEQUENCE", 25, 208);
    ctx.fillText(`${String(Math.floor(progress * 100)).padStart(2, "0")}%`, 408, 208);
    ctx.fillStyle = color("--screen-track");
    ctx.fillRect(25, 220, 430, 7);
    ctx.fillStyle = color("--screen-spark");
    ctx.fillRect(25, 220, 430 * progress, 7);
    for (let x = 0; x < 480; x += 4) {
      ctx.fillStyle = color("--screen-scan");
      ctx.fillRect(x, 0, 1, 250);
    }
    texture.needsUpdate = true;
  });

  if (!texture) return null;

  return (
    <mesh position={[0, 0.18, 0.8]}>
      <planeGeometry args={[4.8, 2.5]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Monitor({
  pointer,
  scroll,
  restart,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
  restart: number;
}) {
  const group = useRef<THREE.Group>(null);
  const palette = useMemo(
    () => ({
      shell: cssColor("--device-shell"),
      shellEdge: cssColor("--device-edge"),
      bevel: cssColor("--device-bevel"),
      bezel: cssColor("--device-bezel"),
      black: cssColor("--device-black"),
      button: cssColor("--device-button"),
      indicator: cssColor("--device-indicator"),
      floor: cssColor("--background"),
    }),
    []
  );

  useFrame(({ clock }, rawDelta) => {
    if (!group.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const x = reduced || !pointer.current ? 0 : pointer.current.x;
    const y = reduced || !pointer.current ? 0 : pointer.current.y;
    const s = reduced || !scroll.current ? 0 : scroll.current;
    const ease = 1 - Math.exp(-3.5 * delta);
    group.current.rotation.y += (-0.09 + x * 0.18 + s * 0.21 - group.current.rotation.y) * ease;
    group.current.rotation.x += (-0.035 - y * 0.12 - s * 0.07 - group.current.rotation.x) * ease;
    group.current.position.y +=
      (0.05 + (reduced ? 0 : Math.sin(clock.getElapsedTime() * 0.7) * 0.045) - s * 0.2 - group.current.position.y) * ease;
  });

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight
        position={[-4, 8, 8]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[5, 3, 3]} intensity={50} color={palette.indicator} />
      <Environment>
        <Lightformer intensity={2} position={[-4, 5, 5]} scale={[8, 5, 1]} />
        <Lightformer intensity={1} position={[4, 2, -3]} scale={[5, 8, 1]} />
      </Environment>
      <mesh rotation-x={-Math.PI / 2} position={[0, -2.66, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.16} color={palette.black} />
      </mesh>
      <group ref={group} position={[0, 0.05, 0]}>
        {/* Warm molded CRT housing */}
        <RoundedBox args={[6.0, 4.0, 1.12]} radius={0.23} smoothness={5} castShadow receiveShadow>
          <meshStandardMaterial color={palette.shell} roughness={0.67} metalness={0.05} />
        </RoundedBox>
        <RoundedBox args={[5.78, 3.78, 0.12]} radius={0.2} smoothness={5} position={[0, 0, 0.58]} castShadow>
          <meshStandardMaterial color={palette.shellEdge} roughness={0.58} />
        </RoundedBox>
        <RoundedBox args={[5.62, 3.62, 0.09]} radius={0.2} smoothness={5} position={[0, 0, 0.65]}>
          <meshStandardMaterial color={palette.bezel} roughness={0.62} />
        </RoundedBox>
        <RoundedBox args={[5.2, 2.86, 0.08]} radius={0.14} smoothness={5} position={[0, 0.18, 0.71]}>
          <meshStandardMaterial color={palette.black} roughness={0.48} />
        </RoundedBox>
        <RoundedBox args={[4.98, 2.5, 0.05]} radius={0.075} smoothness={5} position={[0, 0.18, 0.762]}>
          <meshStandardMaterial color={palette.bevel} roughness={0.34} metalness={0.12} />
        </RoundedBox>
        <Screen restart={restart} />
        <mesh position={[0, 0.18, 0.803]}>
          <planeGeometry args={[4.8, 2.5]} />
          <meshBasicMaterial color={palette.indicator} transparent opacity={0.025} depthWrite={false} />
        </mesh>
        {/* Lower control strip, tiny power light, tactile buttons */}
        <mesh position={[-1.9, -1.62, 0.72]}>
          <boxGeometry args={[0.58, 0.035, 0.025]} />
          <meshStandardMaterial color={palette.shell} />
        </mesh>
        {[0, 1, 2, 3, 4].map((index) => (
          <RoundedBox
            key={index}
            args={[0.15, 0.068, 0.04]}
            radius={0.025}
            smoothness={2}
            position={[0.8 + index * 0.27, -1.58, 0.72]}
          >
            <meshStandardMaterial color={palette.button} roughness={0.65} />
          </RoundedBox>
        ))}
        <mesh position={[-0.7, -1.58, 0.73]}>
          <sphereGeometry args={[0.055, 12, 8]} />
          <meshBasicMaterial color={palette.indicator} />
        </mesh>
        {/* Small side dial and rear ventilation */}
        <mesh position={[3.05, -0.72, -0.1]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.27, 0.27, 0.22, 24]} />
          <meshStandardMaterial color={palette.bezel} roughness={0.75} />
        </mesh>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[1.8, 1.68 - i * 0.19, -0.565]}>
            <boxGeometry args={[1.9, 0.035, 0.008]} />
            <meshStandardMaterial color={palette.shellEdge} />
          </mesh>
        ))}
        <RoundedBox args={[1.1, 0.21, 0.74]} radius={0.08} smoothness={4} position={[0, -2.06, -0.18]} castShadow>
          <meshStandardMaterial color={palette.shellEdge} roughness={0.75} />
        </RoundedBox>
        <RoundedBox args={[3.5, 0.18, 1.3]} radius={0.085} smoothness={4} position={[0, -2.32, -0.08]} castShadow>
          <meshStandardMaterial color={palette.shell} roughness={0.7} />
        </RoundedBox>
      </group>
    </>
  );
}

export function RetroMonitor({ restart }: { restart: number }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-cyan-400/60 animate-pulse">
        [ INITIALIZING CRT MATRIX... ]
      </div>
    );
  }

  const cameraZ = typeof window !== "undefined" && window.innerWidth > 700 ? 9.9 : 11.2;

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, cameraZ], fov: 37 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Monitor pointer={pointer} scroll={scroll} restart={restart} />
    </Canvas>
  );
}
