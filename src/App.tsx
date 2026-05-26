import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import TicketPage from './pages/TicketPage'
import SnacksPage from './pages/SnacksPage'
import FinalPage from './pages/FinalPage'
import StarField from './components/StarField'

export type Screen = 'landing' | 'ticket' | 'snacks' | 'final'

export type SnackSelection = Record<string, number>

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [snackSelections, setSnackSelections] = useState<SnackSelection>({})

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: '#07051A' }}>
      <StarField />
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingPage key="landing" onAccept={() => setScreen('ticket')} />
        )}
        {screen === 'ticket' && (
          <TicketPage key="ticket" onContinue={() => setScreen('snacks')} />
        )}
        {screen === 'snacks' && (
          <SnacksPage
            key="snacks"
            selections={snackSelections}
            onUpdateSelections={setSnackSelections}
            onConfirmed={() => setScreen('final')}
          />
        )}
        {screen === 'final' && (
          <FinalPage key="final" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
