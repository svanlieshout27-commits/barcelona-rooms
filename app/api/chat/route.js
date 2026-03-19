import Groq from 'groq-sdk'
import { supabase } from '../../lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request) {

  const { message } = await request.json()

  // Fetch all rooms from database
  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')

  // Build a plain-text description of every room for the AI
  const roomsText = rooms?.map(r =>
    `Room: ${r.title} | Area: ${r.neighbourhood} | Price: €${r.price}/mo | ` +
    `Size: ${r.size_m2}m² | Available: ${r.available ? 'Yes' : 'From ' + r.available_date} | ` +
    `Features: ${r.features}`
  ).join('\n')

  // The system prompt tells the AI who it is and what it knows
  const systemPrompt = `You are a helpful room rental assistant in Barcelona.
Always reply in the same language the user writes in.
Be friendly, concise, and helpful.

AVAILABLE ROOMS:
${roomsText}

HOUSE RULES:
- Minimum 3 month stay
- No pets
- Couples welcome
- No smoking indoors

If someone wants to book or has a question you cannot answer,
ask for their name and email and say the landlord replies within 24 hours.`

  // Send the message to Groq and wait for the reply
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: message }
    ],
    max_tokens: 500
  })

  // Extract the text from Groq's response
  const text = completion.choices[0].message.content

  // Send it back to the browser as JSON
  return Response.json({ reply: text })

}