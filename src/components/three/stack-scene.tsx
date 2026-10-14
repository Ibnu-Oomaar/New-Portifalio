"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, Sparkles } from "@react-three/drei";
import {
  BoxGeometry,
  EdgesGeometry,
  MathUtils,
  Object3D,
  type Group,
  type InstancedMesh,
  type LineBasicMaterial,
  type MeshStandardMaterial,
} from "three";

import { seededRandom } from "@/lib/utils";

/** Values the surrounding page can change at any time without re-rendering React. */
export interface StackControl {
  /** Index (0 = interface … 3 = tooling) of the highlighted layer, or null for none. */
  active: number | null;
  /** 0 = tight stack, 1 = fully exploded. */
  spread: number;
}

interface StackSceneProps {
  controlRef: MutableRefObject<StackControl>;
  /** Run the animation loop (false pauses rendering, e.g. when off-screen). */
  running: boolean;
  reducedMotion: boolean;
  /** Shift the model sideways on wide viewports so it can sit beside text. */
  offset?: number;
  /** Overall size multiplier for wide viewports. */
  scale?: number;
  /** On narrow screens, push the model down so it sits beneath the headline instead of behind it. */
  dropOnNarrow?: boolean;
}

const ACCENT = "#C6FF4A";
const LAYERS = 4;
const SLAB = { width: 3.4, height: 0.14, depth: 2.4 } as const;
const dummy = new Object3D();

const slabGeometry = new BoxGeometry(SLAB.width, SLAB.height, SLAB.depth);
const slabEdges = new EdgesGeometry(slabGeometry);

/** Small emblem on top of each slab, hinting at what lives on that layer. */
function Emblem({ index }: { index: number }) {
  const top = SLAB.height / 2;
  const fill = { color: "#161616", metalness: 0.4, roughness: 0.5 } as const;

  switch (index) {
    case 0: // Interface: UI cards
      return (
        <group position={[0, top, 0]}>
          {[
            [-0.9, 0.5, 0.9, 0.55],
            [0.05, 0.5, 0.7, 0.55],
            [0.85, 0.5, 0.6, 0.55],
          ].map(([x, z, w, d], i) => (
            <mesh key={i} position={[x, 0.04, z - 0.5]}>
              <boxGeometry args={[w, 0.08, d]} />
              <meshStandardMaterial {...fill} />
            </mesh>
          ))}
          <mesh position={[0, 0.04, 0.55]}>
            <boxGeometry args={[2.3, 0.08, 0.28]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} />
          </mesh>
        </group>
      );
    case 1: // Server: nodes
      return (
        <group position={[0, top, 0]}>
          {[-0.95, 0, 0.95].map((x) => (
            <mesh key={x} position={[x, 0.11, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.22, 28]} />
              <meshStandardMaterial {...fill} />
            </mesh>
          ))}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[1.95, 0.04, 0.06]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.5} />
          </mesh>
        </group>
      );
    case 2: // Data: stacked discs
      return (
        <group position={[0, top, 0]}>
          {[0, 1, 2].map((level) => (
            <mesh key={level} position={[0, 0.07 + level * 0.19, 0]}>
              <cylinderGeometry args={[0.62, 0.62, 0.14, 40]} />
              <meshStandardMaterial {...fill} />
            </mesh>
          ))}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.63, 0.63, 0.025, 40]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.5} />
          </mesh>
        </group>
      );
    default: // Tooling: ring and core
      return (
        <group position={[0, top, 0]}>
          <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.045, 16, 56]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.55} />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <octahedronGeometry args={[0.24, 0]} />
            <meshStandardMaterial {...fill} />
          </mesh>
        </group>
      );
  }
}

/** Points travelling down through the layers, like a request passing through a real system. */
function Requests({
  count,
  gapRef,
  reducedMotion,
}: {
  count: number;
  gapRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const mesh = useRef<InstancedMesh>(null);

  const seeds = useMemo(() => {
    const random = seededRandom(11);
    return Array.from({ length: count }, () => ({
      x: (random() - 0.5) * 2.7,
      z: (random() - 0.5) * 1.8,
      speed: 0.07 + random() * 0.13,
      phase: random(),
      size: 0.6 + random() * 0.8,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    const instanced = mesh.current;
    if (!instanced) return;
    const time = reducedMotion ? 0 : clock.elapsedTime;
    const gap = gapRef.current;
    const top = gap * 1.5 + 0.9;
    const span = gap * 3 + 1.8;

    seeds.forEach((seed, index) => {
      const progress = (time * seed.speed + seed.phase) % 1;
      dummy.position.set(seed.x, top - progress * span, seed.z);
      dummy.scale.setScalar(seed.size * (0.5 + Math.sin(progress * Math.PI) * 0.9));
      dummy.updateMatrix();
      instanced.setMatrixAt(index, dummy.matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[0.04, 10, 10]} />
      <meshBasicMaterial color={ACCENT} toneMapped={false} />
    </instancedMesh>
  );
}

function StackModel({
  controlRef,
  reducedMotion,
  offset,
  scale: baseScale = 1,
  dropOnNarrow = false,
}: Pick<StackSceneProps, "controlRef" | "reducedMotion" | "offset" | "scale" | "dropOnNarrow">) {
  const group = useRef<Group>(null);
  const slabs = useRef<(Group | null)[]>([]);
  const bodies = useRef<(MeshStandardMaterial | null)[]>([]);
  const lines = useRef<(LineBasicMaterial | null)[]>([]);
  const gapRef = useRef(0.8);
  const pointer = useRef({ x: 0, y: 0 });
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }, delta) => {
    const root = group.current;
    if (!root) return;

    const narrow = size.width < 820;
    const control = controlRef.current;
    const time = reducedMotion ? 0 : clock.elapsedTime;
    const follow = reducedMotion ? 0 : 1;

    // Overall pose: a three-quarter view that leans toward the pointer.
    const targetY = -0.62 + pointer.current.x * 0.32 * follow + Math.sin(time * 0.35) * 0.05;
    const targetX = 0.26 + pointer.current.y * 0.14 * follow;
    root.rotation.y = MathUtils.damp(root.rotation.y, targetY, 3, delta);
    root.rotation.x = MathUtils.damp(root.rotation.x, targetX, 3, delta);

    const scale = narrow ? 0.62 : baseScale;
    root.scale.setScalar(MathUtils.damp(root.scale.x, scale, 4, delta));
    const targetPosX = narrow ? 0 : viewport.width * (offset ?? 0.17);
    root.position.x = MathUtils.damp(root.position.x, targetPosX, 4, delta);
    const targetPosY = narrow && dropOnNarrow ? -viewport.height * 0.27 : 0;
    root.position.y = MathUtils.damp(root.position.y, targetPosY, 4, delta) + Math.sin(time * 0.6) * 0.003;

    // Layer spacing grows as the page scrolls ("exploded view").
    const gap = 0.8 + control.spread * 0.9;
    gapRef.current = MathUtils.damp(gapRef.current, gap, 4, delta);

    for (let i = 0; i < LAYERS; i += 1) {
      const slab = slabs.current[i];
      const body = bodies.current[i];
      const line = lines.current[i];
      if (!slab || !body || !line) continue;

      const isActive = control.active === i;
      const dimmed = control.active !== null && !isActive;
      slab.position.y = MathUtils.damp(slab.position.y, (1.5 - i) * gapRef.current, 6, delta);
      slab.position.x = MathUtils.damp(slab.position.x, isActive ? 0.28 : 0, 6, delta);
      body.emissiveIntensity = MathUtils.damp(body.emissiveIntensity, isActive ? 0.45 : 0, 6, delta);
      line.opacity = MathUtils.damp(line.opacity, isActive ? 1 : dimmed ? 0.22 : 0.62, 6, delta);
    }
  });

  return (
    <group ref={group} rotation={[0.26, -0.62, 0]}>
      {Array.from({ length: LAYERS }, (_, index) => (
        <group
          key={index}
          ref={(node) => {
            slabs.current[index] = node;
          }}
          position={[0, (1.5 - index) * 0.8, 0]}
        >
          <mesh geometry={slabGeometry}>
            <meshStandardMaterial
              ref={(node) => {
                bodies.current[index] = node;
              }}
              color="#101010"
              metalness={0.75}
              roughness={0.3}
              emissive={ACCENT}
              emissiveIntensity={0}
            />
          </mesh>
          <lineSegments geometry={slabEdges}>
            <lineBasicMaterial
              ref={(node) => {
                lines.current[index] = node;
              }}
              color={ACCENT}
              transparent
              opacity={0.62}
              toneMapped={false}
            />
          </lineSegments>
          <Emblem index={index} />
        </group>
      ))}
      <Requests count={34} gapRef={gapRef} reducedMotion={reducedMotion} />
    </group>
  );
}

/** The 3D "full stack": four layers with requests travelling through them. */
export default function StackScene({
  controlRef,
  running,
  reducedMotion,
  offset,
  scale,
  dropOnNarrow,
}: StackSceneProps) {
  // Adaptive resolution: start sharp, drop to 1x if the device cannot hold its frame rate.
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.6, 8.2], fov: 30, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reducedMotion ? "demand" : running ? "always" : "never"}
      aria-hidden="true"
    >
      <PerformanceMonitor
        flipflops={2}
        onDecline={() => setDpr(1)}
        onFallback={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <pointLight position={[-4, 1.5, -2]} intensity={18} distance={14} color={ACCENT} />
      <StackModel
        controlRef={controlRef}
        reducedMotion={reducedMotion}
        offset={offset}
        scale={scale}
        dropOnNarrow={dropOnNarrow}
      />
      {!reducedMotion ? (
        <Sparkles count={46} scale={[9, 6, 6]} size={1.8} speed={0.25} opacity={0.5} color={ACCENT} />
      ) : null}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, 2]} scale={[10, 1.2, 1]} />
        <Lightformer form="rect" intensity={1.2} color={ACCENT} position={[-5, 0, 1]} scale={[1.4, 8, 1]} />
        <Lightformer form="ring" intensity={0.8} position={[4, 1, -4]} scale={3} />
      </Environment>
    </Canvas>
  );
}
