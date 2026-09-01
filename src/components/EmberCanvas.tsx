import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  r: number
  hot: number
}

/**
 * A live bed of embers: particles rise from a source point, drift, and cool
 * from spark-yellow through ember-orange into coal red. The cursor stirs them.
 */
export default function EmberCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    const parts: Particle[] = []
    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (ox: number, oy: number, spread: number) => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.5 + 0.12
      parts.push({
        x: ox + (Math.random() - 0.5) * spread,
        y: oy + (Math.random() - 0.5) * 18,
        vx: Math.cos(angle) * speed,
        vy: -(Math.random() * 0.85 + 0.18),
        life: 0,
        max: Math.random() * 170 + 110,
        r: Math.random() * 1.9 + 0.5,
        hot: Math.random(),
      })
      if (parts.length > 300) parts.shift()
    }

    const color = (p: Particle, alpha: number) => {
      // hot young embers glow yellow, cooling embers go deep red
      const t = 1 - p.life / p.max
      const r = Math.round(179 + (255 - 179) * t)
      const g = Math.round(32 + (194 - 32) * t * t)
      const b = Math.round(14 + (75 - 14) * t * t * t)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const draw = (stir: boolean) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life += 1
        if (p.life > p.max || p.y < -30) {
          parts.splice(i, 1)
          continue
        }
        p.x += p.vx + Math.sin((p.life + p.hot * 100) / 34) * 0.24
        p.y += p.vy
        p.vy = Math.max(-1.5, p.vy - 0.0016)

        if (stir && pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < 14000 && d2 > 1) {
            const f = (1 - d2 / 14000) * 0.75
            const d = Math.sqrt(d2)
            p.x += (dx / d) * f * 3
            p.y += (dy / d) * f * 3 - f * 1.4
          }
        }

        const fadeIn = Math.min(1, p.life / 14)
        const alpha = Math.max(0, (1 - p.life / p.max)) * 0.85 * fadeIn
        const radius = p.r * (1 + (1 - p.life / p.max) * 0.6)

        ctx.fillStyle = color(p, alpha * 0.16)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 6.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = color(p, alpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    if (reduce) {
      for (let i = 0; i < 90; i++) {
        spawn(w * (0.15 + Math.random() * 0.7), h * (0.55 + Math.random() * 0.4), w * 0.5)
        const p = parts[parts.length - 1]
        p.life = Math.random() * p.max * 0.8
        p.y -= p.life * 0.55
      }
      draw(false)
      return () => window.removeEventListener('resize', resize)
    }

    const tick = () => {
      const baseX = w * 0.5
      const baseY = h * 0.96
      const count = w < 640 ? 2 : 4
      for (let i = 0; i < count; i++) spawn(baseX, baseY, w * 0.92)
      if (pointer.active && Math.random() > 0.45) spawn(pointer.x, pointer.y, 26)
      draw(true)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = pointer.y > 0 && pointer.y < h
    }
    const leave = () => {
      pointer.active = false
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
