import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  opacityDelta: number
}

interface CityLight {
  x: number
  y: number
  color: string
  size: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const stars: Star[] = []
    const STAR_COUNT = 180

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.75,
        radius: Math.random() * 1.4 + 0.3,
        opacity: Math.random(),
        opacityDelta: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      })
    }

    const cityLights: CityLight[] = []
    const lightColors = ['#F5C518', '#E8A0BF', '#7C3AED', '#3B82F6', '#F97316', '#ffffff']
    for (let i = 0; i < 70; i++) {
      cityLights.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.7 + Math.random() * canvas.height * 0.3,
        color: lightColors[Math.floor(Math.random() * lightColors.length)],
        size: Math.random() * 2 + 0.8,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width * 0.5, canvas.height)
      grad.addColorStop(0, '#07051A')
      grad.addColorStop(0.35, '#1A1035')
      grad.addColorStop(0.65, '#2D1B69')
      grad.addColorStop(1, '#07051A')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Horizon glow
      const horizonGrad = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height)
      horizonGrad.addColorStop(0, 'rgba(139, 92, 246, 0.0)')
      horizonGrad.addColorStop(0.5, 'rgba(109, 40, 217, 0.1)')
      horizonGrad.addColorStop(1, 'rgba(245, 197, 24, 0.05)')
      ctx.fillStyle = horizonGrad
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4)

      // City lights
      cityLights.forEach(light => {
        ctx.beginPath()
        ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2)
        ctx.fillStyle = light.color
        ctx.globalAlpha = 0.65
        ctx.fill()

        const lglow = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.size * 7)
        lglow.addColorStop(0, light.color + '55')
        lglow.addColorStop(1, 'transparent')
        ctx.fillStyle = lglow
        ctx.globalAlpha = 0.25
        ctx.beginPath()
        ctx.arc(light.x, light.y, light.size * 7, 0, Math.PI * 2)
        ctx.fill()
      })

      // Stars
      ctx.globalAlpha = 1
      stars.forEach(star => {
        star.opacity += star.opacityDelta
        if (star.opacity > 1 || star.opacity < 0) star.opacityDelta *= -1
        star.opacity = Math.max(0, Math.min(1, star.opacity))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}
