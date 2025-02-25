import { ScrollControls, OrbitControls } from "@react-three/drei";
import { StoryCurve } from "./StoryCurve";

export function Experience() {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls horizontal damping={0.2} pages={3}>
        <StoryCurve />
      </ScrollControls>
    </>
  );
}
