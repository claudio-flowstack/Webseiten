/**
 * @baustein Animated Shader Hero
 * @zweck WebGL2 Fragment-Shader Hero mit interaktivem Hintergrund (Touch/Mouse reactive)
 * @geeignet-fuer Premium SaaS, Creative Agencies, Tech-Startups, KI/Automation Produkte
 * @stil Orange/Gold Gradients auf schwarzem WebGL-Shader, Touch-interaktiv
 * @props headline (line1+line2), subtitle, trustBadge, buttons (primary+secondary)
 */

import React, { useRef, useEffect } from 'react'

interface HeroProps {
  trustBadge?: {
    text: string
    icon?: string
  }
  headline: {
    line1: string
    line2: string
  }
  subtitle: string
  buttons?: {
    primary?: {
      text: string
      onClick?: () => void
    }
    secondary?: {
      text: string
      onClick?: () => void
    }
  }
  className?: string
}

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
    float d=1., t=.0;
    for (float i=.0; i<3.; i++) {
        float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
        t=mix(t,d,a); d=a; p*=2./(i+1.);
    }
    return t;
}
void main(void) {
    vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
    vec3 col=vec3(0);
    float bg=clouds(vec2(st.x+T*.5,-st.y));
    uv*=1.-.3*(sin(T*.2)*.5+.5);
    for (float i=1.; i<12.; i++) {
        uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
        vec2 p=uv;
        float d=length(p);
        col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
        float b=noise(i+p+bg*1.731);
        col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
        col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
    }
    O=vec4(col,1);
}`

const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2')
    if (!gl) return

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, vertexSrc)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, defaultShaderSource)
    gl.compileShader(fs)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resLoc = gl.getUniformLocation(program, 'resolution')
    const timeLoc = gl.getUniformLocation(program, 'time')

    let animId: number

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, now * 1e-3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: 'black' }}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {trustBadge && (
          <div className="mb-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-purple-500/10 backdrop-blur-md border border-purple-300/30 rounded-full text-sm">
              {trustBadge.icon && <span>{trustBadge.icon}</span>}
              <span className="text-purple-100">{trustBadge.text}</span>
            </div>
          </div>
        )}
        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-300 via-indigo-400 to-purple-300 bg-clip-text text-transparent">
              {headline.line1}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {headline.line2}
            </h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-purple-100/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-300/30 hover:border-purple-300/50 text-purple-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
