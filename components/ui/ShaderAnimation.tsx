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
    let isMounted = true

    // Check if Three.js is already available in window
    if (typeof window !== "undefined" && window.THREE) {
      initThreeJS()
    } else {
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js"
      script.onload = () => {
        if (isMounted && containerRef.current && window.THREE) {
          initThreeJS()
        }
      }
      document.head.appendChild(script)
    }

    return () => {
      isMounted = false
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
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

    // Fragment shader tailored for vibrant light mode streams
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
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        float t = time * 0.055;
        
        // Crisp, clean light background
        vec3 colorBg = vec3(0.985, 0.988, 0.996);
        
        // Brand & aesthetic stream colors:
        vec3 colorElectric = vec3(0.00, 0.447, 0.984); // Royal Blue #0072FB
        vec3 colorCyan     = vec3(0.00, 0.640, 0.980); // Sky Cyan
        vec3 colorPurple   = vec3(0.486, 0.227, 0.929); // Royal Purple
        vec3 colorTeal     = vec3(0.050, 0.700, 0.600); // Teal Mint
        vec3 colorIndigo   = vec3(0.200, 0.350, 0.950); // Deep Indigo
        
        vec3 col = colorBg;
        
        // 5 vertical chromatic fluid waterfall streams
        for(int j = 0; j < 5; j++) {
          float tShift = t + float(j) * 0.038;
          float flowY = p.y + tShift * 1.7;
          
          float sprayAmp = smoothstep(0.85, -1.0, p.y) * 0.35;
          float nX = noise(vec2(p.x * (1.3 + float(j) * 0.1), flowY * 0.8)) * sprayAmp;
          float nY = noise(vec2(p.y * 0.8, tShift * 0.4)) * 0.08;
          
          float posX = p.x + nX + nY;
          
          float r1 = sin(posX * (5.5 + float(j) * 1.1));
          float r2 = sin(posX * (11.0 + float(j) * 1.6) + flowY * 1.3);
          float r3 = cos(posX * (3.5 + float(j) * 0.75) - flowY * 0.65);
          
          float d1 = r1 * 2.6;
          float d2 = r2 * 3.2;
          float d3 = r3 * 1.8;
          
          float cascadeGlow = exp(-d1 * d1) * 0.48 + exp(-d2 * d2) * 0.32 + exp(-d3 * d3) * 0.36;
          
          float verticalFade = smoothstep(-1.3, 0.75, p.y);
          cascadeGlow *= verticalFade;
          
          vec3 streamColor = colorElectric;
          if (j == 1) streamColor = colorCyan;
          if (j == 2) streamColor = colorPurple;
          if (j == 3) streamColor = colorTeal;
          if (j == 4) streamColor = colorIndigo;
          
          // Clearly blend streams into light background
          col = mix(col, streamColor, cascadeGlow * 0.42);
        }
        
        // Soft edge feathering so it dissolves seamlessly into page background
        float edgeFade = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        edgeFade = clamp(pow(16.0 * edgeFade, 0.35), 0.0, 1.0);
        col = mix(colorBg, col, edgeFade);
        
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
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
      if (!container || !renderer) return
      const width = container.clientWidth || window.innerWidth
      const height = container.clientHeight || window.innerHeight
      renderer.setSize(width, height)
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
      className="w-full h-full absolute inset-0 pointer-events-none" 
    />
  )
}
