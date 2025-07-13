import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import styled from '@emotion/styled';
import type { Points } from 'three';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(to bottom, #0B0B1F, #1F1F3F);
`;

const StarField = () => {
  const starsRef = useRef<Points>(null);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={50}
      depth={50}
      count={3000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <StarField />
    </>
  );
};

const InteractiveBackground = () => {
  return (
    <BackgroundWrapper>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </BackgroundWrapper>
  );
};

export default InteractiveBackground; 