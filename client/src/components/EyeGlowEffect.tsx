import { useEffect, useState } from 'react';

const EyeGlowEffect = () => {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGlow(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="eye-glow left"
        style={{
          opacity: showGlow ? 1 : 0,
          transform: showGlow ? 'scale(1.5)' : 'scale(1)'
        }}
      />
      <div
        className="eye-glow right"
        style={{
          opacity: showGlow ? 1 : 0,
          transform: showGlow ? 'scale(1.5)' : 'scale(1)'
        }}
      />
    </>
  );
};

export default EyeGlowEffect;
