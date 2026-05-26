import { motion } from 'framer-motion'

interface Props {
  onClick: () => void
}

export default function MovieTicket({ onClick }: Props) {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onClick={onClick}
      whileHover={{ scale: 1.02, rotate: 0.5 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse, rgba(245,197,24,0.2) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(16px)',
        }}
      />

      {/* Ticket body */}
      <div
        style={{
          width: '320px',
          maxWidth: '90vw',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #1C1040 0%, #2D1B69 50%, #1C1040 100%)',
          border: '1px solid rgba(245, 197, 24, 0.35)',
          boxShadow: '0 0 40px rgba(245,197,24,0.15), inset 0 1px 0 rgba(245,197,24,0.25)',
        }}
      >
        {/* Top gold stripe */}
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(90deg, transparent, #F5C518, #E0A800, #F5C518, transparent)',
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: '24px 32px 16px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(245,197,24,0.15)',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: 'rgba(245,197,24,0.7)',
              textTransform: 'uppercase',
              margin: '0 0 8px',
            }}
          >
            Admit Two
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 4px',
              lineHeight: 1.2,
            }}
          >
            La La Land
          </h1>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#F5C518',
              margin: 0,
            }}
          >
            Part II
          </p>
        </div>

        {/* Perforated divider */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '12px 16px' }}>
          <div
            style={{
              position: 'absolute',
              left: '-12px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#07051A',
            }}
          />
          <div
            style={{
              flex: 1,
              borderTop: '2px dashed rgba(245,197,24,0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '-12px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#07051A',
            }}
          />
        </div>

        {/* Body content */}
        <div style={{ padding: '8px 32px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Guests
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#ffffff', margin: 0 }}>
                Bernhardt &amp; Jerusha
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Event
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                Movie Night
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Date
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#ffffff', margin: 0 }}>
                29 / 05 / 2026
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Time
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#F5C518', margin: 0 }}>
                17:00
              </p>
            </div>
          </div>

          {/* Animated stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px 0' }}>
            {[0, 1, 2, 3, 4].map(i => (
              <motion.span
                key={i}
                style={{ color: '#F5C518', fontSize: '12px' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}
              >
                ★
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom gold stripe */}
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(90deg, transparent, #F5C518, #E0A800, #F5C518, transparent)',
          }}
        />

        {/* Tap hint */}
        <motion.div
          style={{ position: 'absolute', bottom: '16px', right: '24px' }}
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', margin: 0 }}>
            tap to continue →
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
