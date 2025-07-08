import React, { useEffect, useState } from 'react';
import './Loader.css';
import arc from '../assets/arc.png';
import useSound from 'use-sound';
import jarvisSound from '../assets/jarvis.mp3';

const Loader= () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [play] = useSound(jarvisSound, { volume: 0.5 });

  useEffect(() => {
    play(); // Play sound on load

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [play]);

  if (!isVisible) return null;

  return (
    <div className="loader-overlay">
      <img src={arc} alt="Arc Reactor" className="arc-reactor" />
      <h1 className="boot-text">INITIALIZING</h1>
    </div>
  );
};

export default Loader;
