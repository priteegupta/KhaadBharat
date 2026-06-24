const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(cors({ origin: '*', methods: ['POST', 'GET'] }));
// app.use(express.static(path.join(__dirname, 'widgets')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Please wait a moment.' },
});
app.use('/chat', limiter);

// ─── System Prompts ───────────────────────────────────────────
const SYSTEM_PROMPTS = {
  khaad_en: `You are a helpful assistant for Khaad Bharat, an Indian agricultural company that sells fertilizers and farming products.
Always reply in ENGLISH only.
Your job is to:
- Help farmers understand which fertilizers are best for their crops
- Answer questions about products, pricing, availability, and delivery
- Provide basic farming advice related to soil health and crop nutrition
- Guide users on how to place orders or contact support
- Be warm, respectful, and use simple language that farmers can understand
- If you don't know specific product prices, say "Please contact our team for the latest pricing"
- Never make up product names or specifications
Keep responses concise and helpful. Always be polite.`,

  khaad_hi: `आप खाद भारत के लिए एक सहायक हैं, जो एक भारतीय कृषि कंपनी है जो उर्वरक और खेती के उत्पाद बेचती है।
हमेशा केवल हिंदी में जवाब दें।
आपका काम है:
- किसानों को यह समझने में मदद करना कि उनकी फसलों के लिए कौन सा उर्वरक सबसे अच्छा है
- उत्पादों, मूल्य निर्धारण, उपलब्धता और डिलीवरी के बारे में सवालों के जवाब देना
- मिट्टी के स्वास्थ्य और फसल पोषण से संबंधित बुनियादी खेती की सलाह देना
- ऑर्डर देने या सहायता से संपर्क करने में मार्गदर्शन करना
- अगर कीमत न पता हो तो कहें: "नवीनतम मूल्य के लिए हमारी टीम से संपर्क करें"
सरल और विनम्र भाषा में जवाब दें।`,

  erp: `You are an intelligent support assistant for an ERP SaaS software platform.
Your job is to:
- Help users navigate and use the ERP system features
- Answer questions about modules like inventory, billing, HR, payroll, accounts, and reports
- Guide users through common tasks step by step
- Troubleshoot common issues and errors
- Explain ERP concepts in simple, non-technical language
- Escalate complex technical issues by saying "Please raise a support ticket for this issue"
Keep responses clear and structured. Use numbered steps when explaining processes.`,
};

// ─── Groq API Call ────────────────────────────────────────────
async function callGroq(messages, platform) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY_HERE') {
    throw new Error('GROQ_API_KEY not set in .env file');
  }

  const systemPrompt = SYSTEM_PROMPTS[platform] || SYSTEM_PROMPTS.khaad_en;

  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 1024,
  };

  console.log(`📤 Calling Groq for platform: ${platform}`);

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('❌ Groq error:', JSON.stringify(data));
    throw new Error(data?.error?.message || 'Groq API error');
  }

  console.log('✅ Groq replied successfully');
  return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
}

// ─── Routes ──────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'Chatbot API is running ✅', version: '1.0.0', provider: 'Groq (Llama 3.3)' });
});

app.post('/chat', async (req, res) => {
  try {
    const { messages, platform } = req.body;
    console.log(`💬 New message | platform: ${platform} | messages: ${messages?.length}`);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const validPlatforms = ['khaad_en', 'khaad_hi', 'erp'];
    if (!platform || !validPlatforms.includes(platform)) {
      return res.status(400).json({ error: `platform must be one of: ${validPlatforms.join(', ')}` });
    }

    const reply = await callGroq(messages, platform);
    res.json({ reply });

  } catch (error) {
    console.error('❌ Chat error:', error.message);
    res.status(500).json({ error: error.message || 'Something went wrong. Please try again.' });
  }
});

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Chatbot API running on http://localhost:${PORT}`);
  // console.log(`📁 Widgets available at:`);
  // console.log(`   http://localhost:${PORT}/khaad-bharat-widget.html`);
  

  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
    console.warn('⚠️  WARNING: GROQ_API_KEY not set in .env file!');
  } else {
    console.log('🔑 Groq API key loaded ✅');
  }
});
