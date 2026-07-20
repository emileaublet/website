"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const KEY_STEP = 0.05;
const KEY_MAP: Record<string, [number, number, number]> = {
  w: [0, 0, -1],
  s: [0, 0, 1],
  a: [-1, 0, 0],
  d: [1, 0, 0],
  q: [0, -1, 0],
  e: [0, 1, 0],
};

function logCamera(camera: THREE.Camera, target?: THREE.Vector3) {
  const p = camera.position;
  const fov = (camera as THREE.PerspectiveCamera).fov;
  const t = target
    ? `, target: [${target.x.toFixed(2)}, ${target.y.toFixed(
        2
      )}, ${target.z.toFixed(2)}]`
    : "";
  console.log(
    `[camera] position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(
      2
    )}], fov: ${fov}${t}`
  );
}

function KeyboardCamera({
  controlsRef,
}: {
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const pressed = useRef<Set<string>>(new Set());
  const lastLog = useRef(0);

  useEffect(() => {
    const down = (e: KeyboardEvent) =>
      pressed.current.add(e.key.toLowerCase());
    const up = (e: KeyboardEvent) => pressed.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    let moved = false;
    pressed.current.forEach((key) => {
      const dir = KEY_MAP[key];
      if (!dir) return;
      const [x, y, z] = dir;
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      const right = new THREE.Vector3()
        .crossVectors(forward, camera.up)
        .normalize();
      const move = new THREE.Vector3()
        .addScaledVector(right, x)
        .addScaledVector(camera.up, y)
        .addScaledVector(forward, -z)
        .multiplyScalar(KEY_STEP);
      camera.position.add(move);
      controlsRef.current?.target.add(move);
      moved = true;
    });

    if (moved) {
      controlsRef.current?.update();
      lastLog.current += delta;
      if (lastLog.current > 0.3) {
        lastLog.current = 0;
        logCamera(camera, controlsRef.current?.target);
      }
    }
  });

  return null;
}

type PartConfig = {
  src: string;
  x?: number;
};

function Part({ src, x = 0 }: PartConfig) {
  const { scene } = useGLTF(src);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.6 / maxDim;

    clone.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    );
    clone.scale.setScalar(scale);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#d4d4d8",
          roughness: 0.5,
          metalness: 0.05,
        });
      }
    });

    return clone;
  }, [scene]);

  return (
    <group position={[x, 0, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

function SpinRig({
  children,
  autoSpin,
  paused,
}: {
  children: React.ReactNode;
  autoSpin: boolean;
  paused: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const { gl } = useThree();

  useEffect(() => {
    if (!autoSpin) return;
    const el = gl.domElement;
    el.style.cursor = "grab";

    const down = (e: PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current || !group.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      group.current.rotation.y += dx * 0.008;
    };
    const up = () => {
      dragging.current = false;
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl, autoSpin]);

  useFrame((_, delta) => {
    if (group.current && autoSpin && !dragging.current && !paused) {
      group.current.rotation.y += delta * 0.4;
    }
  });

  return <group ref={group}>{children}</group>;
}

export function WireframeScene({
  parts,
  aspect = "21/9",
  debug = false,
}: {
  parts: PartConfig[];
  aspect?: string;
  debug?: boolean;
}) {
  const controlsRef = useRef<any>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!debug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " ") setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [debug]);

  return (
    <div
      className="w-full rounded-lg overflow-hidden bg-zinc-950 relative"
      style={{ aspectRatio: aspect }}
    >
      {debug && (
        <div className="absolute top-2 left-2 z-10 text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-1 rounded pointer-events-none">
          drag: orbit · scroll: zoom · wasd/qe: move · space: pause · logs in
          console
        </div>
      )}
      <Canvas camera={{ position: [2.38, 1.74, 1.78], fov: 40 }}>
        <Suspense fallback={null}>
          <SpinRig autoSpin={!debug} paused={debug && paused}>
            {parts.map((part) => (
              <Part key={part.src} src={part.src} x={part.x ?? 0} />
            ))}
          </SpinRig>
          <Grid
            args={[10, 10]}
            cellSize={0.25}
            cellThickness={0.4}
            cellColor="#3f3f46"
            sectionSize={1}
            sectionThickness={0.7}
            sectionColor="#52525b"
            fadeDistance={10}
            fadeStrength={1.2}
            infiniteGrid
          />
          {debug && <axesHelper args={[2]} />}
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 2]} intensity={1.1} />
          {debug && <KeyboardCamera controlsRef={controlsRef} />}
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          target={[-0.44, 0.45, -0.34]}
          enablePan={debug}
          enableZoom={debug}
          enableRotate={debug}
          minPolarAngle={debug ? 0 : Math.PI / 6}
          maxPolarAngle={debug ? Math.PI : Math.PI / 2.1}
          onChange={
            debug
              ? (e) => {
                  const controls = e?.target;
                  if (controls) logCamera(controls.object, controls.target);
                }
              : undefined
          }
        />
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          boxShadow: "inset 0 0 min(8vw, 3rem) min(2vw, 1rem) #09090b",
        }}
      />
    </div>
  );
}
