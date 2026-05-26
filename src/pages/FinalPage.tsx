import { motion } from 'framer-motion'

export default function FinalPage() {
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
      transition={{ duration: 1.5 }}
    >
      <div style={{ maxWidth: '440px' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 6vw, 40px)',
            color: '#ffffff',
            lineHeight: 1.3,
            margin: '0 0 24px',
          }}
        >
          See you for the ending.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1.2 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            color: 'rgba(255,255,255,0.45)',
            margin: '0 0 40px',
          }}
        >
          Now all that&rsquo;s left is the movie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1.0 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              style={{ fontSize: '24px', color: '#F5C518' }}
              animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, delay: i * 0.65, repeat: Infinity }}
            >
              ★
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
