import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { Island } from "./Island";
import { Rocket } from "./Rocket";
import { DraftingTable } from "./DraftingTable";
import * as THREE from "three";

export const NB_SLIDES = 3;
const TARGET_SIZE = 3;

const fitToSize = (object, targetSize) => {
  const bbox = new THREE.Box3().setFromObject(object);
  const size = bbox.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = targetSize / maxDim;
  object.scale.set(scale, scale, scale);
};

export const StoryCurve = () => {
  const { viewport } = useThree();
  const SLIDE_WIDTH = viewport.width;

  const ref = useRef();
  const tl = useRef();
  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline();
      tl.current.to(ref.current.position, {
        duration: 2,
        x: -SLIDE_WIDTH * (NB_SLIDES - 1),
      });
    });

    return () => ctx.revert();
  }, [SLIDE_WIDTH]);

  const handleModelLoaded = (object) => {
    if (object) fitToSize(object, TARGET_SIZE);
  };

  return (
    <group ref={ref}>
      <group position={[0, 0, 0]}>
        <Island ref={handleModelLoaded} />
      </group>
      <group position={[SLIDE_WIDTH, 0, 0]}>
        <Rocket ref={handleModelLoaded} />
      </group>
      <group position={[SLIDE_WIDTH * 2, 0, 0]}>
        <DraftingTable ref={handleModelLoaded} />
      </group>
    </group>
  );
};
