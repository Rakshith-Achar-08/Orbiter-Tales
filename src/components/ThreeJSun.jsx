import React, { useEffect, useRef } from 'react';

function ThreeJSun() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Import Three.js dynamically
    const loadThreeJS = async () => {
      const THREE = await import('three');
      
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, 300 / 200, 0.1, 1000);
      camera.position.z = 5;
      
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(300, 200);
      renderer.setClearColor(0x000000, 0); // Transparent background
      mountRef.current.appendChild(renderer.domElement);
      
      // Sun geometry/material
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
      const sun = new THREE.Mesh(geometry, material);
      scene.add(sun);
      
      // Simple glow effect
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(1.15, 32, 32),
        new THREE.MeshBasicMaterial({ 
          color: 0xffee88, 
          transparent: true, 
          opacity: 0.35 
        })
      );
      scene.add(glow);
      
      // Ambient light
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        sun.rotation.y += 0.006;
        glow.rotation.y += 0.006;
        renderer.render(scene, camera);
      }
      animate();
      
      // Cleanup function
      return () => {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    };

    loadThreeJS();
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="flex items-center justify-center"
      style={{ width: '300px', height: '200px' }}
    />
  );
}

export default ThreeJSun;
