import { useRef } from 'react'
import { motion } from 'framer-motion'
import RejectButton from '../components/RejectButton'

interface Props {
  onAccept: () => void
}

export default function LandingPage({ onAccept }: Props) {
  const acceptRef = useRef<HTMLButtonElement>(null)

  return (
    <motion.div
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100svh',
        padding: '24px',
        textAlign: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ maxWidth: '520px', width: '100%' }}>
        {/* Sentence 1 */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(18px, 4vw, 22px)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
            margin: '0 0 28px',
          }}
        >
          Last time we only made it 30 minutes into La La Land&hellip;
        </motion.p>

        {/* Sentence 2 */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1.2, ease: 'easeOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(22px, 5vw, 30px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.35,
            margin: '0 0 48px',
          }}
        >
          I think we deserve to finish the story.
        </motion.p>

        {/* Button zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            minHeight: '60px',
          }}
        >
          {/* Accept — always stationary */}
          <motion.button
            ref={acceptRef}
            onClick={onAccept}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '14px 32px',
              borderRadius: '999px',
              border: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: '#07051A',
              background: '#F5C518',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(245,197,24,0.35), 0 0 40px rgba(245,197,24,0.1)',
              flexShrink: 0,
            }}
          >
            Accept ✨
          </motion.button>

          <RejectButton avoidRef={acceptRef} />
        </motion.div>
      </div>
    </motion.div>
  )
}
