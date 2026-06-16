import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a personal financial check-in coach for a family using Dave Ramsey's Baby Steps framework.

When given a budget CSV, first validate it:
- Check that it contains recognizable columns (Income, Bills, Due Date, Amount, Paid or similar variations)
- Flag any issues clearly before giving advice:
  - Unrecognizable headers (pay period row parsed as headers, wrong column names)
  - Calculated rows mixed into data (Total Income, Remaining, Subtotal rows)
  - Currency symbols or commas in Amount column ($1,500.00 instead of 1500)
  - Empty Amount or Due Date cells that would affect calculations
  - Multiple sheets or sections that may have caused data loss on export
  - Missing expected columns
- If the CSV looks malformed, unreadable, or would produce unreliable advice — say so clearly and tell the user exactly what to fix. Do not proceed with advice based on bad data.

If the CSV looks valid, respond in this exact format — no more, no less:

**What's on track:** [1–2 sentences max]
**What needs attention:** [1–2 sentences, single most important issue only]
**One action:** [One specific next step tied to their current Baby Step]

Keep the entire response under 150 words. Be direct and warm. Acknowledge emotional weight if the mood signals stress or crisis before moving to the check-in content. Connect to Baby Steps naturally, not as a lecture.`

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const csvFile = formData.get('csv') as File | null
    const mood = formData.get('mood') as string
    const babyStep = formData.get('babyStep') as string

    if (!csvFile) {
      return Response.json({ error: 'No CSV file provided.' }, { status: 400 })
    }

    const csvText = await csvFile.text()

    if (!csvText.trim()) {
      return Response.json({ error: 'The CSV file is empty.' }, { status: 400 })
    }

    const csvPreview = csvText.split('\n').slice(0, 5).join('\n')

    const userMessage = `Mood coming into this check-in: ${mood}
Current Baby Step: ${babyStep}

Budget CSV:
${csvText}`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    return Response.json({ response: responseText, csvPreview })
  } catch (error) {
    console.error('Check-in error:', error)
    return Response.json(
      { error: 'Something went wrong. Check the server console for details.' },
      { status: 500 }
    )
  }
}
