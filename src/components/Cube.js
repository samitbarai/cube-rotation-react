import { useState, useRef, useEffect } from 'react';
import '../App.css';

function Cube() {
  const [rps, setRps] = useState(0.1);
  const cubeRef = useRef(null);
  const animationRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateRotation = () => {
      setRotation(prev => ({
        x: (prev.x + (rps * 360) / 60) % 360,
        y: (prev.y + (rps * 360) / 60) % 360
      }));
      animationRef.current = requestAnimationFrame(updateRotation);
    };

    animationRef.current = requestAnimationFrame(updateRotation);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rps]);

  const increaseSpeed = () => {
    setRps(prevRps => {
      if (prevRps < 0.5) return prevRps + 0.1;
      if (prevRps < 2) return prevRps + 0.25;
      return prevRps + 0.5;
    });
  };

  const decreaseSpeed = () => {
    setRps(prevRps => {
      if (prevRps <= 0.1) return prevRps;
      if (prevRps <= 0.5) return prevRps - 0.1;
      if (prevRps <= 2) return prevRps - 0.25;
      return prevRps - 0.5;
    });
  };

  return (
    <div className="App">
      <div className="speed-indicator">
        Rotation Speed: {rps.toFixed(1)} rotations per second
      </div>
      <div className="cube-container">
        <div 
          className="cube" 
          ref={cubeRef}
          style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>
      <div className="controls">
        <button onClick={increaseSpeed}>Speed Up</button>
        <button onClick={decreaseSpeed}>Slow Down</button>
      </div>
    </div>
  );
}

export default Cube; 