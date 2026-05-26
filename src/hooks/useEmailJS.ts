import { useState } from 'react'
import emailjs from '@emailjs/browser'

type Status = 'idle' | 'sending' | 'success' | 'error'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export function useEmailJS() {
  const [status, setStatus] = useState<Status>('idle')

  const sendEmail = async (body: string) => {
    setStatus('sending')
    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            order_details: body,
            timestamp: new Date().toLocaleString(),
          },
          PUBLIC_KEY,
        )
      }
      setStatus('success')
    } catch (err) {
      console.error('EmailJS error:', err)
      // Still proceed to confirmation even on error — don't block the UX
      setStatus('error')
    }
  }

  return { sendEmail, status }
}
