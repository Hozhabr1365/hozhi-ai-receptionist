// ===== Hozhi AI Receptionist — Static Data =====
// © محمد هژبری — All Rights Reserved

const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه'];
const DEF_OPEN = [true,true,true,true,true,false,false];

const PROVIDERS = [
  {
    id: 'anthropic', name: 'Anthropic', flag: '🇺🇸',
    stars: '⭐⭐⭐⭐⭐', badge: 'بهترین فارسی',
    hint: 'console.anthropic.com',
    models: [
      {id:'claude-sonnet-4-20250514', n:'Claude Sonnet 4', m:'دقیق — پیشنهادی'},
      {id:'claude-haiku-4-5-20251001', n:'Claude Haiku 4.5', m:'سریع — اقتصادی'},
    ]
  },
  {
    id: 'openai', name: 'OpenAI', flag: '🇺🇸',
    stars: '⭐⭐⭐⭐⭐', badge: 'فارسی عالی',
    hint: 'platform.openai.com',
    models: [
      {id:'gpt-4o', n:'GPT-4o', m:'قوی — پیشنهادی'},
      {id:'gpt-4o-mini', n:'GPT-4o Mini', m:'اقتصادی'},
      {id:'o3-mini', n:'o3-mini', m:'استدلالی'},
    ]
  },
  {
    id: 'google', name: 'Google Gemini', flag: '🇺🇸',
    stars: '⭐⭐⭐⭐', badge: 'فارسی خوب',
    hint: 'aistudio.google.com',
    models: [
      {id:'gemini-2.0-flash', n:'Gemini 2.0 Flash', m:'سریع — رایگان'},
      {id:'gemini-1.5-pro', n:'Gemini 1.5 Pro', m:'قوی'},
    ]
  },
  {
    id: 'deepseek', name: 'DeepSeek', flag: '🇨🇳',
    stars: '⭐⭐⭐⭐', badge: 'ارزان — فارسی خوب',
    hint: 'platform.deepseek.com',
    models: [
      {id:'deepseek-chat', n:'DeepSeek V3', m:'پیشنهادی'},
      {id:'deepseek-reasoner', n:'DeepSeek R1', m:'استدلالی'},
    ]
  },
  {
    id: 'openrouter', name: 'OpenRouter', flag: '🌐',
    stars: '⭐⭐⭐⭐', badge: 'دسترسی به ۲۰۰+ مدل',
    hint: 'openrouter.ai/keys',
    customModelEnabled: true,
    models: [
      {id:'meta-llama/llama-3.3-70b-instruct', n:'Llama 3.3 70B', m:'رایگان — فارسی خوب'},
      {id:'google/gemini-2.0-flash-exp:free', n:'Gemini 2.0 Flash Free', m:'رایگان'},
      {id:'qwen/qwen-2.5-72b-instruct', n:'Qwen 2.5 72B', m:'فارسی عالی — ارزان'},
      {id:'mistralai/mistral-large', n:'Mistral Large', m:'فارسی متوسط'},
      {id:'x-ai/grok-2', n:'Grok-2', m:'قوی'},
    ]
  },
  {
    id: 'mistral', name: 'Mistral AI', flag: '🇫🇷',
    stars: '⭐⭐⭐', badge: 'فارسی متوسط',
    hint: 'console.mistral.ai',
    models: [
      {id:'mistral-large-latest', n:'Mistral Large', m:'قوی'},
      {id:'mistral-small-latest', n:'Mistral Small', m:'اقتصادی'},
    ]
  },
];

const ENDPOINTS = {
  anthropic:   {url:'https://api.anthropic.com/v1/messages', type:'anthropic'},
  openai:      {url:'https://api.openai.com/v1/chat/completions', type:'openai'},
  google:      {url:'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent', type:'google'},
  deepseek:    {url:'https://api.deepseek.com/v1/chat/completions', type:'openai'},
  openrouter:  {url:'https://openrouter.ai/api/v1/chat/completions', type:'openai'},
  mistral:     {url:'https://api.mistral.ai/v1/chat/completions', type:'openai'},
};

const PG_INFO = {
  biz:      ['اطلاعات کسب‌وکار',     'مشخصات کسب‌وکار خود را وارد کنید'],
  docs:     ['اسناد کسب‌وکار',        'فایل‌ها و متون اطلاعاتی را آپلود کنید'],
  faq:      ['سوالات متداول',          'سوال‌وجواب‌هایی که منشی باید بداند'],
  hours:    ['ساعات کاری',            'زمان‌بندی پاسخ‌گویی منشی'],
  aiset:    ['هوش مصنوعی',            'انتخاب مدل و کلید API'],
  phone:    ['خط تلفنی',              'اتصال سرویس تلفن ابری Twilio'],
  transfer: ['انتقال تماس',           'مدیریت انتقال به اپراتور انسانی'],
  reports:  ['گزارش‌ها',              'آمار و تاریخچه مکالمات'],
  test:     ['آزمایش منشی',           'منشی را پیش از راه‌اندازی واقعی تست کنید'],
};
