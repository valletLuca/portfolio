"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PARTICLE_COLOR_VARS, readCssColor } from "@/lib/theme";

type ParticlesCursorProps = {
  /** Incrémenté à chaque Konami code — déclenche l'explosion. */
  burstSignal: RefObject<number>;
  /** false sur mobile : champ ambiant seul, pas de traînée curseur. */
  interactive: boolean;
};

/* ────────────────────────────────────────────────────────────────
   Champ ambiant : poussières d'or et braises en lévitation lente.
   ──────────────────────────────────────────────────────────────── */

type AmbientFieldProps = {
  burstSignal: RefObject<number>;
  count: number;
  colorA: string;
  colorB: string;
};

function AmbientField({ burstSignal, count, colorA, colorB }: AmbientFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const seenBurst = useRef(0);

  const { basePositions, phases, colors, velocities, positions } = useMemo(() => {
    const base = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const cols = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    const a = new THREE.Color(colorA);
    const b = new THREE.Color(colorB);
    const mixed = new THREE.Color();
    for (let i = 0; i < count; i += 1) {
      base[i * 3] = (Math.random() - 0.5) * 18;
      base[i * 3 + 1] = (Math.random() - 0.5) * 11;
      base[i * 3 + 2] = (Math.random() - 0.5) * 6;
      phase[i] = Math.random() * Math.PI * 2;
      mixed.lerpColors(a, b, Math.random() * Math.random());
      cols[i * 3] = mixed.r;
      cols[i * 3 + 1] = mixed.g;
      cols[i * 3 + 2] = mixed.b;
    }
    return {
      basePositions: base,
      phases: phase,
      colors: cols,
      velocities: vels,
      positions: base.slice(),
    };
  }, [count, colorA, colorB]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    if (burstSignal.current !== seenBurst.current) {
      seenBurst.current = burstSignal.current;
      for (let i = 0; i < count; i += 1) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const len = Math.max(0.001, Math.hypot(x, y, z));
        const force = 14 + Math.random() * 18;
        velocities[i * 3] = (x / len) * force;
        velocities[i * 3 + 1] = (y / len) * force;
        velocities[i * 3 + 2] = (z / len) * force;
      }
    }

    for (let i = 0; i < count; i += 1) {
      const targetX = basePositions[i * 3] + Math.sin(t * 0.18 + phases[i]) * 0.6;
      const targetY = basePositions[i * 3 + 1] + Math.sin(t * 0.32 + phases[i] * 1.7) * 0.5;
      const targetZ = basePositions[i * 3 + 2];

      positions[i * 3] += velocities[i * 3] * dt + (targetX - positions[i * 3]) * 0.02;
      positions[i * 3 + 1] +=
        velocities[i * 3 + 1] * dt + (targetY - positions[i * 3 + 1]) * 0.02;
      positions[i * 3 + 2] +=
        velocities[i * 3 + 2] * dt + (targetZ - positions[i * 3 + 2]) * 0.02;

      velocities[i * 3] *= 0.94;
      velocities[i * 3 + 1] *= 0.94;
      velocities[i * 3 + 2] *= 0.94;
    }

    const attribute = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    attribute.needsUpdate = true;
    points.rotation.y = Math.sin(t * 0.04) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ────────────────────────────────────────────────────────────────
   Traînée curseur : braises qui s'élèvent dans le sillage du pointeur.
   ──────────────────────────────────────────────────────────────── */

const TRAIL_COUNT = 160;

const trailVertexShader = /* glsl */ `
  attribute float aLife;
  attribute float aSeed;
  uniform float uPixelRatio;
  varying float vLife;
  varying float vSeed;

  void main() {
    vLife = aLife;
    vSeed = aSeed;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (8.0 + aSeed * 14.0) * aLife * uPixelRatio * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const trailFragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vLife;
  varying float vSeed;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.05, dist) * vLife;
    vec3 color = mix(uColorA, uColorB, vSeed);
    gl_FragColor = vec4(color, alpha);
  }
`;

type CursorTrailProps = {
  colorA: string;
  colorB: string;
};

function CursorTrail({ colorA, colorB }: CursorTrailProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const head = useRef(0);
  const { camera, gl } = useThree();

  const buffers = useMemo(
    () => ({
      positions: new Float32Array(TRAIL_COUNT * 3),
      lives: new Float32Array(TRAIL_COUNT),
      seeds: new Float32Array(TRAIL_COUNT),
      velocities: new Float32Array(TRAIL_COUNT * 3),
    }),
    [],
  );

  const uniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uPixelRatio: { value: 1 },
    }),
    [colorA, colorB],
  );

  useEffect(() => {
    uniforms.uPixelRatio.value = gl.getPixelRatio();

    const spawn = (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
      const target = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
      const direction = target.sub(camera.position).normalize();
      const distance = -camera.position.z / direction.z;
      const world = camera.position.clone().addScaledVector(direction, distance);

      for (let n = 0; n < 3; n += 1) {
        const i = head.current;
        head.current = (head.current + 1) % TRAIL_COUNT;
        buffers.positions[i * 3] = world.x + (Math.random() - 0.5) * 0.18;
        buffers.positions[i * 3 + 1] = world.y + (Math.random() - 0.5) * 0.18;
        buffers.positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        buffers.lives[i] = 1;
        buffers.seeds[i] = Math.random();
        buffers.velocities[i * 3] = (Math.random() - 0.5) * 0.8;
        buffers.velocities[i * 3 + 1] = Math.random() * 0.6;
        buffers.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
    };

    const onPointerMove = (event: PointerEvent) => spawn(event.clientX, event.clientY);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [buffers, camera, gl, uniforms]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < TRAIL_COUNT; i += 1) {
      if (buffers.lives[i] <= 0) {
        continue;
      }
      buffers.lives[i] = Math.max(0, buffers.lives[i] - dt * 1.5);
      buffers.positions[i * 3] += buffers.velocities[i * 3] * dt;
      buffers.positions[i * 3 + 1] += buffers.velocities[i * 3 + 1] * dt;
      buffers.positions[i * 3 + 2] += buffers.velocities[i * 3 + 2] * dt;
      buffers.velocities[i * 3 + 1] += dt * 0.9;
    }
    (points.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (points.geometry.getAttribute("aLife") as THREE.BufferAttribute).needsUpdate = true;
    (points.geometry.getAttribute("aSeed") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffers.positions, 3]} />
        <bufferAttribute attach="attributes-aLife" args={[buffers.lives, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[buffers.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={trailVertexShader}
        fragmentShader={trailFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ────────────────────────────────────────────────────────────────
   Canvas principal — chargé en lazy (ssr: false) depuis LandingSection.
   ──────────────────────────────────────────────────────────────── */

export default function ParticlesCursor({ burstSignal, interactive }: ParticlesCursorProps) {
  const colorA = readCssColor(PARTICLE_COLOR_VARS.primary, "#e6a341");
  const colorB = readCssColor(PARTICLE_COLOR_VARS.secondary, "#8c0902");

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true }}
      aria-hidden="true"
    >
      <AmbientField
        burstSignal={burstSignal}
        count={interactive ? 650 : 220}
        colorA={colorA}
        colorB={colorB}
      />
      {interactive && <CursorTrail colorA={colorA} colorB={colorB} />}
    </Canvas>
  );
}
