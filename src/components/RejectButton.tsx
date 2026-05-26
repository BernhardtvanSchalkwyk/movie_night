import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REJECT_TEXTS = [
  'Reject ❌',
  'No',
  'Absolutely not',
  'Try again',
  'Interesting choice',
  "That's illegal",
  'Be serious',
  'Nuh uh',
  'Wrong answer',
  "You can't do that",
  'Nice try',
]

const AVOID_PADDING = 24 // extra clearance around the accept button (px)

interface Props {
  avoidRef: React.RefObject<HTMLButtonElement | null>
}

function overlaps(
  x: number,
  y: number,
  bW: number,
  bH: number,
  avoidRect: DOMRect,
): boolean {
  const pad = AVOID_PADDING
  return (
    x < avoidRect.right + pad &&
    x + bW > avoidRect.left - pad &&
    y < avoidRect.bottom + pad &&
    y + bH > avoidRect.top - pad
  )
}

export default function RejectButton({ avoidRef }: Props) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [hoverCount, setHoverCount] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isMoving = useRef(false)

  const getTransitionDuration = (count: number) => {
    if (count < 2) return 0.3
    if (count < 5) return 0.2
    if (count < 8) return 0.12
    return 0.07
  }

  const getNewPosition = useCallback(
    (count: number, currentPos: { x: number; y: number } | null) => {
      const button = buttonRef.current
      const bW = button?.offsetWidth || 120
      const bH = button?.offsetHeight || 44
      const avoidRect = avoidRef.current?.getBoundingClientRect() ?? null

      const maxX = window.innerWidth - bW - 8
      const maxY = window.innerHeight - bH - 8

      const candidate = (cx: number, cy: number): { x: number; y: number } => {
        if (count < 2) {
          const angle = Math.random() * Math.PI * 2
          const dist = 100 + Math.random() * 120
          return {
            x: Math.max(8, Math.min(maxX, cx + Math.cos(angle) * dist)),
            y: Math.max(8, Math.min(maxY, cy + Math.sin(angle) * dist)),
          }
        }
        return {
          x: 8 + Math.random() * (maxX - 8),
          y: 8 + Math.random() * (maxY - 8),
        }
      }

      const cx = currentPos?.x ?? window.innerWidth / 2 - bW / 2
      const cy = currentPos?.y ?? window.innerHeight / 2

      // Re-sample until we find a position that doesn't overlap the accept button
      for (let attempt = 0; attempt < 30; attempt++) {
        const pos = candidate(cx, cy)
        if (!avoidRect || !overlaps(pos.x, pos.y, bW, bH, avoidRect)) {
          return pos
        }
      }

      // Fallback: top-left corner, always safe
      return { x: 8, y: 8 }
    },
    [avoidRef],
  )

  const handleEscape = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      if (isMoving.current) return
      isMoving.current = true

      const newCount = hoverCount + 1
      setHoverCount(newCount)
      setTextIndex(prev => (prev + 1) % REJECT_TEXTS.length)
      const newPos = getNewPosition(newCount, position)
      if (newPos) setPosition(newPos)

      setTimeout(() => {
        isMoving.current = false
      }, getTransitionDuration(newCount) * 1000 + 50)
    },
    [hoverCount, position, getNewPosition],
  )

  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 50,
        transition: `left ${getTransitionDuration(hoverCount)}s ease-out, top ${getTransitionDuration(hoverCount)}s ease-out`,
      }
    : { position: 'relative' }

  return (
    <button
      ref={buttonRef}
      style={style}
      onMouseEnter={handleEscape}
      onTouchStart={handleEscape}
      className="px-6 py-3 rounded-full border border-red-500/40 text-red-400 bg-glass font-sans text-sm font-medium cursor-default select-none whitespace-nowrap overflow-hidden"
      tabIndex={-1}
      type="button"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={textIndex}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
          style={{ display: 'block' }}
        >
          {REJECT_TEXTS[textIndex]}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
