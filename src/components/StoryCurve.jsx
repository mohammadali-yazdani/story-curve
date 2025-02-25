import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Island } from "./Island";
import { Rocket } from "./Rocket";
import { DraftingTable } from "./DraftingTable";

export const NB_SLIDES = 3;

const CenteredModel = ({ children, scale = 1, position = [0, 0, 0] }) => {
  const ref = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    if (ref.current) {
      const box = new Box3().setFromObject(ref.current);
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = viewport.width / 4 / maxDim;

      ref.current.scale.setScalar(targetScale * scale);
    }
  }, [viewport.width, scale]);

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
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

  return (
    <group ref={ref}>
      <CenteredModel position={[0, 0, 0]}>
        <Island />
      </CenteredModel>
      <CenteredModel position={[SLIDE_WIDTH, 0, 0]}>
        <Rocket />
      </CenteredModel>
      <CenteredModel position={[SLIDE_WIDTH * 2, 0, 0]}>
        <DraftingTable />
      </CenteredModel>
    </group>
  );
};
