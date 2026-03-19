import { supabase } from '../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {

  const { name, email, message, roomId, roomTitle } = await request.json()

  // Save to database
  await supabase.from('enquiries').insert({
    room_id: roomId,
    name,
    email,
    message
  })

  // Send email to you
  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'svanlieshout27@gmail.com',
    subject: `New enquiry: ${roomTitle}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  })

  // Print the result to the terminal so we can see what happened
  console.log('Resend result:', JSON.stringify(result))
  console.log('API key loaded:', process.env.RESEND_API_KEY ? 'YES' : 'NO - KEY MISSING')

  return Response.json({ success: true })

}