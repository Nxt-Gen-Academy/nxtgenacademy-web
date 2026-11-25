"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightShaderProps {
  className?: string;
  children?: React.ReactNode;
  color1?: [number, number, number]; // RGB 0-1
  color2?: [number, number, number]; // RGB 0-1
}

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float spotlight(vec2 uv, vec2 origin, float angle, float spread, float intensity) {
  vec2 dir = vec2(cos(angle), sin(angle));
  vec2 toPixel = uv - origin;
  float dist = length(toPixel);
  if (dist < 0.001) return intensity;
  
  vec2 toPixelNorm = toPixel / dist;
  float cosAngle = dot(toPixelNorm, dir);
  float beam = smoothstep(cos(spread), 1.0, cosAngle);
  
  // Soft volumetric distance attenuation
  float atten = 1.0 / (1.0 + dist * 1.2 + dist * dist * 0.8);
  return beam * atten * intensity;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.y = 1.0 - uv.y; // Invert Y so 0 is top
  
  float t = u_time * 0.32;
  vec2 mouseNorm = u_mouse / u_resolution.xy;
  mouseNorm.y = 1.0 - mouseNorm.y;
  float mouseInfluence = (mouseNorm.x - 0.5) * 0.22;
  
  // Left spotlight beam sweeping toward center-right
  float angle1 = 1.02 + sin(t) * 0.12 + mouseInfluence;
  float beam1 = spotlight(uv, vec2(0.06, -0.05), angle1, 0.50, 2.1);
  
  // Right spotlight beam sweeping toward center-left
  float angle2 = 2.12 + cos(t * 0.8) * 0.14 + mouseInfluence;
  float beam2 = spotlight(uv, vec2(0.94, -0.05), angle2, 0.54, 1.9);
  
  // Center atmospheric soft shaft
  float angle3 = 1.57 + sin(t * 0.5) * 0.08;
  float beam3 = spotlight(uv, vec2(0.5, -0.1), angle3, 0.72, 1.3);
  
  // Subtle atmospheric noise for soft cinematic haze
  float noise = (hash(gl_FragCoord.xy + t) - 0.5) * 0.012;
  
  vec3 col = u_color1 * beam1 + u_color2 * beam2 + mix(u_color1, u_color2, 0.5) * beam3 * 0.65 + vec3(noise);
  float alpha = clamp((beam1 * 0.85 + beam2 * 0.85 + beam3 * 0.55), 0.0, 0.95);
  
  gl_FragColor = vec4(col, alpha);
}
`;

export function SpotlightShader({
  className,
  children,
  color1 = [0.0, 0.36, 0.85], // Royal NxtGen Blue
  color2 = [0.22, 0.74, 0.98], // Electric Cyan
}: SpotlightShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      canvas.getContext("experimental-webgl", { alpha: true, antialias: true });

    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      setWebglSupported(false);
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    const posAttr = gl.getAttribLocation(program, "a_position");
    const resUniform = gl.getUniformLocation(program, "u_resolution");
    const timeUniform = gl.getUniformLocation(program, "u_time");
    const mouseUniform = gl.getUniformLocation(program, "u_mouse");
    const col1Uniform = gl.getUniformLocation(program, "u_color1");
    const col2Uniform = gl.getUniformLocation(program, "u_color2");

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    let animationId: number;
    const startTime = performance.now();
    let isVisible = true;
    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    const render = () => {
      if (isVisible) {
        const time = (performance.now() - startTime) / 1000;
        // Smooth lerp mouse tracking
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        gl.useProgram(program);

        gl.enableVertexAttribArray(posAttr);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(resUniform, canvas.width, canvas.height);
        gl.uniform1f(timeUniform, time);
        gl.uniform2f(mouseUniform, currentMouseX, currentMouseY);
        gl.uniform3f(col1Uniform, color1[0], color1[1], color1[2]);
        gl.uniform3f(col2Uniform, color2[0], color2[1], color2[2]);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(posBuffer);
    };
  }, [color1, color2]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000",
          webglSupported ? "opacity-100" : "opacity-0"
        )}
      />
      {children}
    </div>
  );
}
