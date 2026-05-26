import { motion } from 'framer-motion'
import MovieTicket from '../components/MovieTicket'

interface Props {
  onContinue: () => void
}

export default function TicketPage({ onContinue }: Props) {
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
      }}
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '28px',
        }}
      >
        Your invitation
      </motion.p>

      <MovieTicket onClick={onContinue} />
    </motion.div>
  )
}
