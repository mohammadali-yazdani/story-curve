import { ScrollControls, OrbitControls } from "@react-three/drei";
import { StoryCurve } from "./StoryCurve";
import { useEffect, useState } from "react";
import { TOUCH } from "three";

export function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls
        enableZoom={false}
        touches={{
          ONE: TOUCH.PAN,
          TWO: TOUCH.ROTATE,
        }}
      />

      <ScrollControls horizontal damping={0.2} pages={3}>
        <StoryCurve />
      </ScrollControls>
    </>
  );
}
