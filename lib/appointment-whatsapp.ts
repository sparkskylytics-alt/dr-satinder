const WHATSAPP_NUMBER = '918958344505'

export function sendAppointmentToWhatsApp(form: HTMLFormElement) {
  const data = new FormData(form)
  const name = String(data.get('name') ?? '').trim()
  const phone = String(data.get('phone') ?? '').trim()
  const email = String(data.get('email') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()

  const details = [
    'New appointment request',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    message && `Message: ${message}`,
  ].filter(Boolean).join('\n')

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer')
}
