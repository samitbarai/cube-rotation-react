import { useState, useRef, useEffect } from 'react';
import '../App.css';

function Cube() {
  const [speed, setSpeed] = useState(10);
  const cubeRef = useRef(null);
  const animationRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateRotation = () => {
      setRotation(prev => ({
        x: (prev.x + 360 / (speed * 60)) % 360,
        y: (prev.y + 360 / (speed * 60)) % 360
      }));
      animationRef.current = requestAnimationFrame(updateRotation);
    };

    animationRef.current = requestAnimationFrame(updateRotation);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  const increaseSpeed = () => {
    setSpeed(prevSpeed => {
      if (prevSpeed <= 2) return prevSpeed - 0.2;
      return prevSpeed - 2;
    });
  };

  const decreaseSpeed = () => {
    setSpeed(prevSpeed => {
      if (prevSpeed < 2) return prevSpeed + 0.2;
      return prevSpeed + 2;
    });
  };

  const degreesPerSecond = Math.floor(360 / speed);

  return (
    <div className="App">
      <div className="speed-indicator">
        Rotation Speed: {degreesPerSecond}° per second
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