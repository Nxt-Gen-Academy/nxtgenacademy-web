"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

interface ShaderAnimationProps {
  className?: string;
}

export function ShaderAnimation({ className = "" }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: any;
    scene: any;
    renderer: any;
    uniforms: any;
    animationId: number | null;
  }>({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let isCancelled = false;

    const init = () => {
      if (isCancelled || !containerRef.current) return;
      initThreeJS();
    };

    if (window.THREE) {
      init();
    } else {
      // Check if script already exists in head
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src*="three.js"]'
      );
      if (existingScript) {
        existingScript.addEventListener("load", init);
      } else {
        script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
        script.async = true;
        script.onload = init;
        document.head.appendChild(script);
      }
    }

    return () => {
      isCancelled = true;
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        try {
          sceneRef.current.renderer.dispose();
          if (
            containerRef.current &&
            sceneRef.current.renderer.domElement &&
            containerRef.current.contains(sceneRef.current.renderer.domElement)
          ) {
            containerRef.current.removeChild(sceneRef.current.renderer.domElement);
          }
        } catch {}
      }
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    const container = containerRef.current;

    // Clear any existing canvas
    container.innerHTML = "";

    // Initialize camera
    const camera = new THREE.Camera();
    camera.position.z = 1;

    // Initialize scene
    const scene = new THREE.Scene();

    // Create geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define uniforms
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment shader
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      // NxtGen Website Primary Palette
      const vec3 primaryBlue  = vec3(0.0, 0.357, 0.824); // #005bd2
      const vec3 electricCyan = vec3(0.22, 0.74, 0.98);  // #38bdf8

      // Deterministic pseudorandom hash
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        float t = time * 0.38;
        vec3 col = vec3(0.0);

        // 1. Futuristic 3D Perspective Grid Floor (receding into the horizon)
        vec2 gridUv = uv;
        gridUv.y += 0.42;
        if (gridUv.y < 0.0) {
          float depth = -1.0 / gridUv.y;
          vec2 plane = vec2(gridUv.x * depth * 0.75, depth + t * 0.9);
          vec2 grid = abs(fract(plane - 0.5) - 0.5);
          float lineThickness = 0.03 * (1.0 + depth * 0.12);
          float gridX = 1.0 - smoothstep(0.0, lineThickness, grid.x);
          float gridY = 1.0 - smoothstep(0.0, lineThickness, grid.y);
          float gridVal = max(gridX, gridY);
          float fog = exp(-depth * 0.16) * smoothstep(0.0, -0.12, gridUv.y);
          col += electricCyan * gridVal * 0.16 * fog;
        }

        // 2. High-Tech Fluid Wave Ribbons (Linear / Stripe tech startup aesthetic)
        for (int i = 0; i < 7; i++) {
          float fi = float(i);
          float speed = t * (0.65 + fi * 0.07);
          float freq = 1.5 + fi * 0.22;
          
          // Organic fluid wave modulation
          float waveY = -0.22 + fi * 0.075 
                      + sin(uv.x * freq + speed) * (0.16 + fi * 0.02)
                      + cos(uv.x * (freq * 1.4) - speed * 0.7) * 0.06;
          
          float dist = abs(uv.y - waveY);
          
          // Silky neon beam falloff
          float beam = 0.0038 / (dist + 0.0038);
          beam = pow(max(0.0001, beam), 1.15);

          // High-speed illuminated data pulses traveling along the waves
          float packet = pow(max(0.0001, sin(uv.x * 4.5 - speed * 3.2 + fi * 1.4)), 14.0) * 2.0;
          
          // Subtle color gradation: deep primary blue (#005bd2) to bright electric cyan (#38bdf8)
          vec3 waveColor = mix(primaryBlue, electricCyan, fi / 6.0);
          col += (waveColor * beam * 0.65) + (vec3(0.75, 0.92, 1.0) * beam * packet * 0.45);
        }

        // 3. Volumetric Luminous Aura behind the right-column 3D laptop preview
        vec2 glowCenter = vec2(0.38, 0.08);
        float glowDist = length(uv - glowCenter);
        float ambientGlow = exp(-glowDist * 2.0) * 0.32;
        col += mix(primaryBlue, electricCyan, 0.45) * ambientGlow;

        // 4. Subtle Digital Particles / Data Sparks in the atmosphere
        vec2 cell = floor(uv * 20.0);
        float pHash = hash(cell);
        if (pHash > 0.965) {
          float pBlink = sin(time * 3.5 + pHash * 6.28) * 0.5 + 0.5;
          vec2 pFrac = fract(uv * 20.0) - 0.5;
          float pDot = smoothstep(0.10, 0.0, length(pFrac));
          col += electricCyan * pDot * pBlink * 0.35;
        }

        // Soft peripheral vignette so edges seamlessly dissolve into midnight black
        float edgeVignette = smoothstep(2.2, 0.65, length(uv));
        col *= edgeVignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
    };

    // Handle resize
    const onWindowResize = () => {
      if (!containerRef.current || !renderer) return;
      const rect = containerRef.current.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    // Animation loop
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
}
