# Gemini AI Chatbot Setup Guide

## Overview

Your portfolio now includes an AI-powered chatbot that can answer questions about your background, skills, and experience using Google's Gemini 2.5 Flash model via the Vercel AI SDK.

## Features

✅ **Popup Chat Widget** - Floating chat button in bottom-right corner  
✅ **Tabbed Contact Section** - Choose between AI Chat or Contact Form  
✅ **Streaming Responses** - Real-time streaming for natural conversation  
✅ **Resume Context** - AI trained on your resume data  
✅ **Modern UI** - Clean, responsive design matching your portfolio theme

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist):

```bash
cp .env.example .env.local
```

2. Add your Gemini API key to `.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

### 3. Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and:
- Click the floating chat button in the bottom-right corner
- Navigate to the Contact section and try the "Chat with AI" tab
- Ask questions like:
  - "What experience do you have with AI?"
  - "Tell me about your backend skills"
  - "Are you available for work?"

### 4. Deploy to Vercel

1. Push your changes to GitHub
2. In your Vercel dashboard, add the environment variable:
   - Go to Project Settings → Environment Variables
   - Add `GOOGLE_GENERATIVE_AI_API_KEY` with your API key
   - Apply to Production, Preview, and Development
3. Redeploy your site

## Components Added

### New Files Created

- `app/api/chat/route.ts` - API route handling chat requests with Gemini
- `components/chat/ChatWidget.tsx` - Floating popup chat widget
- `components/chat/ChatInterface.tsx` - Inline chat for Contact section
- `components/ui/tabs.tsx` - Shadcn tabs component

### Modified Files

- `components/sections/Contact.tsx` - Added tabs with Chat/Form options
- `app/layout.tsx` - Added ChatWidget globally
- `.env.example` - Added Gemini API key configuration

## How It Works

```mermaid
graph LR
    A[User Message] --> B[useChat Hook]
    B --> C[/api/chat Route]
    C --> D[streamText Function]
    D --> E[Google Gemini 2.5 Flash]
    E --> F[Resume Context]
    F --> G[Streamed Response]
    G --> H[User Interface]
```

1. User sends a message via the chat interface
2. `useChat` hook sends the message to `/api/chat`
3. API route uses `streamText` from Vercel AI SDK
4. Gemini model processes the message with resume context
5. Response streams back in real-time
6. UI updates progressively as the response comes in

## Customization

### Update Resume Context

Edit the `RESUME_CONTEXT` in `app/api/chat/route.ts` to update the AI's knowledge about you:

```typescript
const RESUME_CONTEXT = `You are an AI assistant representing Señor Roberto Francisco Pablo.

BACKGROUND:
- AI Engineer at THEOSYM (Nov 2024 - Present)
...
```

### Change Model

To use a different Gemini model, update the model in `app/api/chat/route.ts`:

```typescript
const result = streamText({
  model: google('gemini-2.5-pro'), // Change to pro for better responses
  system: RESUME_CONTEXT,
  messages: await convertToModelMessages(messages),
});
```

Available models:
- `gemini-2.5-flash` (default - fast and cost-effective)
- `gemini-2.5-pro` (more capable, higher cost)
- `gemini-1.5-flash`
- `gemini-1.5-pro`

### Styling

Both chat components use your existing design system:
- Primary color for user messages
- Muted background for AI responses
- Responsive design with mobile support
- Dark/light mode compatible

## API Costs

Google Gemini API pricing (as of 2026):
- **Gemini 2.5 Flash**: Free tier available, then pay-per-use
- Monitor usage at [Google AI Studio](https://aistudio.google.com/)
- Consider adding rate limiting for production use

## Troubleshooting

### Chat not working?

1. Check browser console for errors
2. Verify API key is correctly set in `.env.local`
3. Ensure you're using the correct environment variable name: `GOOGLE_GENERATIVE_AI_API_KEY`
4. Restart your dev server after adding environment variables

### Streaming issues?

- Ensure your deployment platform supports streaming responses (Vercel does by default)
- Check that `maxDuration` is set appropriately in the API route

### AI responses are off-topic?

- Update the `RESUME_CONTEXT` system prompt to be more specific
- Add explicit instructions about what topics to stay on

## Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

## Support

For issues or questions:
- Check the Vercel AI SDK documentation
- Review the Google Gemini API docs
- Reach out to robertopablo13.rp@gmail.com
