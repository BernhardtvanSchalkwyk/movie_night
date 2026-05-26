import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  id: string
  emoji: string
  label: string
  quantity: number
  onChange: (id: string, quantity: number) => void
}

export default function SnackCard({ id, emoji, label, quantity, onChange }: Props) {
  const isSelected = quantity > 0

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.94 }}
      onClick={() => onChange(id, isSelected ? 0 : 1)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '16px',
        padding: '16px 8px',
        textAlign: 'center',
        userSelect: 'none',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isSelected
          ? '1px solid rgba(245, 197, 24, 0.55)'
          : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected
          ? '0 0 16px rgba(245,197,24,0.2), 0 0 32px rgba(245,197,24,0.07)'
          : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>{emoji}</span>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          color: isSelected ? '#F5C518' : 'rgba(255,255,255,0.65)',
          margin: 0,
          transition: 'color 0.2s',
        }}
      >
        {label}
      </p>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#F5C518',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#07051A', fontSize: '11px', fontWeight: 700 }}>✓</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
