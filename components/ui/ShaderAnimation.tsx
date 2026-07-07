"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    THREE: any
  }
}

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: any
    scene: any
    renderer: any
    uniforms: any
    animationId: number | null
  }>({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    // Load Three.js dynamically
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js"
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS()
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return

    const THREE = window.THREE
    const container = containerRef.current

    // Clear any existing content
    container.innerHTML = ""

    // Initialize camera
    const camera = new THREE.Camera()
    camera.position.z = 1

    // Initialize scene
    const scene = new THREE.Scene()

    // Create geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2)

    // Define uniforms
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
        
      float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
      }
      
      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), 
                         hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), 
                         hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      void main(void) {
        // Normalized coordinates [0, 1]
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        // Aspect ratio corrected coordinates [-1, 1]
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // Waterfall flow speed
        float t = time * 0.055;
        
        // Brand & rich aesthetic colors:
        // Deep Midnight Slate background
        vec3 colorBg = vec3(0.012, 0.015, 0.022);
        
        // Channel 0: Electric Royal Blue (Brand)
        vec3 colorElectric = vec3(0.302, 0.412, 0.871);
        // Channel 1: Glow Cyan (Brand)
        vec3 colorGlow = vec3(0.459, 0.659, 0.937);
        // Channel 2: Cyber Purple / Violet (Brand Accent)
        vec3 colorPurple = vec3(0.659, 0.333, 0.969);
        // Channel 3: Soft Mint Teal (Cool Accent)
        vec3 colorTeal = vec3(0.180, 0.804, 0.627);
        // Channel 4: Champagne Gold (Warm Accent)
        vec3 colorGold = vec3(0.847, 0.663, 0.424);
        
        vec3 col = colorBg;
        
        // Accumulate 5 distinct chromatic vertical waterfall streams
        for(int j = 0; j < 5; j++) {
          float tShift = t + float(j) * 0.03;
          float flowY = p.y + tShift * 1.8; // Constant downward flow coordinate offset
          
          // Waterfall mist spray amplitude (zero at top, high at bottom)
          float sprayAmp = smoothstep(0.8, -1.1, p.y) * 0.32;
          
          // Noise warp to simulate turbulent water streams and mist particles
          float nX = noise(vec2(p.x * (1.3 + float(j) * 0.1), flowY * 0.8)) * sprayAmp;
          float nY = noise(vec2(p.y * 0.8, tShift * 0.4)) * 0.08;
          
          float posX = p.x + nX + nY;
          
          // Generate multiple overlapping frequencies of vertical flows
          float r1 = sin(posX * (5.5 + float(j) * 1.1));
          float r2 = sin(posX * (11.0 + float(j) * 1.6) + flowY * 1.3);
          float r3 = cos(posX * (3.5 + float(j) * 0.75) - flowY * 0.65);
          
          // Convert to clean, sharp-edged volumetric waterfall columns
          float d1 = r1 * 2.8;
          float d2 = r2 * 3.4;
          float d3 = r3 * 1.9;
          
          float cascadeGlow = exp(-d1 * d1) * 0.42 + exp(-d2 * d2) * 0.28 + exp(-d3 * d3) * 0.32;
          
          // Dissolve envelope (bright at top, dispersing/fading into bottom mist)
          float verticalFade = smoothstep(-1.2, 0.7, p.y);
          cascadeGlow *= verticalFade;
          
          // Map each shifted phase to its respective aesthetic color
          if (j == 0) col += cascadeGlow * colorElectric * 0.95;
          if (j == 1) col += cascadeGlow * colorGlow * 0.85;
          if (j == 2) col += cascadeGlow * colorPurple * 0.9;
          if (j == 3) col += cascadeGlow * colorTeal * 0.7;
          if (j == 4) col += cascadeGlow * colorGold * 0.55;
        }
        
        // Premium subtle analog film grain
        float grain = hash(gl_FragCoord.xy + time) * 0.012;
        col += vec3(grain);
        
        // Soft vignette to merge with page's deep black background
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.55), 0.0, 1.0);
        col *= vignette;
        
        gl_FragColor = vec4(col, 1.0);
      }
    `

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
    }

    // Handle resize
    const onWindowResize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    animate()
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute" 
    />
  )
}
