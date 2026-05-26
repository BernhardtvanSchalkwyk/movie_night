import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SnackCard from '../components/SnackCard'
import ConfirmationModal from '../components/ConfirmationModal'
import { useEmailJS } from '../hooks/useEmailJS'
import { formatEmailBody } from '../utils/emailTemplate'
import type { SnackSelection } from '../App'

interface SnackItem {
  id: string
  emoji: string
  label: string
  category: 'snacks' | 'drinks' | 'extras'
}

const ITEMS: SnackItem[] = [
  { id: 'popcorn', emoji: '🍿', label: 'Popcorn', category: 'snacks' },
  { id: 'chocolate', emoji: '🍫', label: 'Chocolate', category: 'snacks' },
  { id: 'candy', emoji: '🍬', label: 'Candy', category: 'snacks' },
  { id: 'chips', emoji: '🥨', label: 'Chips', category: 'snacks' },
  { id: 'coke', emoji: '🥤', label: 'Coke', category: 'drinks' },
  { id: 'water', emoji: '💧', label: 'Water', category: 'drinks' },
  { id: 'hot_choc', emoji: '☕', label: 'Hot Chocolate', category: 'drinks' },
  { id: 'milkshake', emoji: '🥛', label: 'Milkshake', category: 'drinks' },
  { id: 'blankets', emoji: '🛋️', label: 'Extra Blankets', category: 'extras' },
  { id: 'cuddle', emoji: '🤗', label: 'Cuddle Priority', category: 'extras' },
  { id: 'pause', emoji: '⏸️', label: 'Pause Privileges', category: 'extras' },
  { id: 'butter', emoji: '🍵', label: 'Matcha', category: 'extras' },
]

const CATEGORY_META: Record<string, { label: string }> = {
  snacks: { label: 'Snacks' },
  drinks: { label: 'Drinks' },
  extras: { label: 'Fun Extras' },
}

interface Props {
  selections: SnackSelection
  onUpdateSelections: (s: SnackSelection) => void
  onConfirmed: () => void
}

export default function SnacksPage({ selections, onUpdateSelections, onConfirmed }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [customNote, setCustomNote] = useState('')
  const { sendEmail, status } = useEmailJS()

  const handleChange = (id: string, qty: number) => {
    onUpdateSelections({ ...selections, [id]: qty })
  }

  const handleConfirm = async () => {
    if (status === 'sending') return
    const body = formatEmailBody(selections, ITEMS, customNote)
    await sendEmail(body)
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      onConfirmed()
    }, 3200)
  }

  const categories: Array<'snacks' | 'drinks' | 'extras'> = ['snacks', 'drinks', 'extras']

  return (
    <>
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100svh',
          padding: '48px 16px 32px',
          maxWidth: '480px',
          margin: '0 auto',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 5vw, 28px)',
              color: '#ffffff',
              margin: '0 0 8px',
              lineHeight: 1.3,
            }}
          >
            Choose your movie night essentials
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            🍿 Select everything you need
          </p>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {categories.map(cat => (
            <div key={cat}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,197,24,0.75)',
                  margin: '0 0 14px 2px',
                }}
              >
                {CATEGORY_META[cat].label}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {ITEMS.filter(i => i.category === cat).map(item => (
                  <SnackCard
                    key={item.id}
                    id={item.id}
                    emoji={item.emoji}
                    label={item.label}
                    quantity={selections[item.id] ?? 0}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom recommendations */}
        <div style={{ marginTop: '32px' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,197,24,0.75)',
              margin: '0 0 14px 2px',
            }}
          >
            Anything else?
          </p>
          <textarea
            value={customNote}
            onChange={e => setCustomNote(e.target.value)}
            placeholder="Any special requests or recommendations…"
            rows={3}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#ffffff',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,197,24,0.55)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
        </div>

        {/* Confirm button */}
        <div style={{ marginTop: '40px', paddingBottom: '32px' }}>
          <motion.button
            onClick={handleConfirm}
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: '#07051A',
              background: status === 'sending' ? 'rgba(245,197,24,0.6)' : '#F5C518',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 20px rgba(245,197,24,0.3), 0 0 40px rgba(245,197,24,0.1)',
              letterSpacing: '0.03em',
            }}
          >
            {status === 'sending' ? 'Sending\u2026' : 'Confirm Order \u2728'}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <ConfirmationModal />}
      </AnimatePresence>
    </>
  )
}
