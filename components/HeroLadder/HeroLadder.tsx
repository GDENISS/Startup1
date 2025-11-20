import React, { useEffect, useRef } from "react";
import { Lexend } from "next/font/google";
import Image from "next/image";
import * as THREE from "three";

const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400"] });

const HeroLadder = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const size = Math.min(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 8;
    camera.position.y = 0;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff0066, 1, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Ladder structure
    const ladderGroup = new THREE.Group();
    const rungCount = 5;
    const rungHeight = 2;
    const rungWidth = 3;

    // Materials
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0099ff,
      transparent: true,
      opacity: 0.6,
    });

    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0066,
      transparent: true,
      opacity: 0.9,
    });

    // Create vertical rails
    const railGeometry = new THREE.CylinderGeometry(
      0.05,
      0.05,
      rungHeight * rungCount,
      8
    );
    const leftRail = new THREE.Mesh(railGeometry, glowMaterial);
    leftRail.position.x = -rungWidth / 2;
    ladderGroup.add(leftRail);

    const rightRail = new THREE.Mesh(railGeometry, glowMaterial);
    rightRail.position.x = rungWidth / 2;
    ladderGroup.add(rightRail);

    // Create rungs and nodes
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < rungCount; i++) {
      const yPos =
        i * rungHeight - (rungHeight * rungCount) / 2 + rungHeight / 2;

      // Rung line
      const points = [];
      points.push(new THREE.Vector3(-rungWidth / 2, yPos, 0));
      points.push(new THREE.Vector3(rungWidth / 2, yPos, 0));
      const rungGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const rungLine = new THREE.Line(rungGeometry, lineMaterial);
      ladderGroup.add(rungLine);

      // Connection nodes
      const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);

      const leftNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
      leftNode.position.set(-rungWidth / 2, yPos, 0);
      ladderGroup.add(leftNode);
      nodes.push(leftNode);

      const rightNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
      rightNode.position.set(rungWidth / 2, yPos, 0);
      ladderGroup.add(rightNode);
      nodes.push(rightNode);

      // Center node for visual interest
      if (i % 2 === 0) {
        const centerNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
        centerNode.position.set(0, yPos, 0);
        ladderGroup.add(centerNode);
        nodes.push(centerNode);
      }
    }

    // Add connecting diagonal lines for depth
    for (let i = 0; i < rungCount - 1; i++) {
      const yPos1 =
        i * rungHeight - (rungHeight * rungCount) / 2 + rungHeight / 2;
      const yPos2 =
        (i + 1) * rungHeight - (rungHeight * rungCount) / 2 + rungHeight / 2;

      const diagonalPoints = [
        new THREE.Vector3(-rungWidth / 2, yPos1, 0),
        new THREE.Vector3(rungWidth / 2, yPos2, 0.5),
      ];
      const diagonalGeometry = new THREE.BufferGeometry().setFromPoints(
        diagonalPoints
      );
      const diagonalLine = new THREE.Line(
        diagonalGeometry,
        new THREE.LineBasicMaterial({
          color: 0x0066ff,
          transparent: true,
          opacity: 0.3,
        })
      );
      ladderGroup.add(diagonalLine);
    }

    // Add particle system for ambient glow
    const particleCount = 50;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(ladderGroup);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    mountRef.current.addEventListener("mousemove", handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate ladder slowly
      ladderGroup.rotation.y = Math.sin(time * 0.3) * 0.3;
      ladderGroup.rotation.x = Math.cos(time * 0.2) * 0.1;

      // Mouse-based tilt
      ladderGroup.rotation.y += mouseRef.current.x * 0.05;
      ladderGroup.rotation.x += mouseRef.current.y * 0.05;

      // Pulse nodes
      nodes.forEach((node, index) => {
        const pulseTime = time + index * 0.3;
        node.scale.setScalar(1 + Math.sin(pulseTime * 2) * 0.2);
      });

      // Rotate particles slowly
      particles.rotation.y = time * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative col-span-1 flex h-full w-full flex-col items-center justify-center space-y-2 border-b-[0.5px] border-neutral-400">
      <div
        ref={mountRef}
        className="flex h-full w-full items-center justify-center"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
};

export default HeroLadder;
