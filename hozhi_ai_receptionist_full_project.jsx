// hozhi-ai-receptionist FULL PROJECT STRUCTURE
// ==========================================
// package.json
// netlify.toml
// netlify/functions/chat.js
// netlify/functions/call-webhook.js
// src/app/page.tsx

// ================= package.json =================
{
  "name": "hozhi-ai-receptionist",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}

// ================= netlify.toml =================
[build]
command = "npm run build"
publish = ".next"

[[plugins]]
package = "@netlify/plugin-nextjs"

// ================= netlify/functions/chat.js =================
exports.handler = async (event) => {
 const body = JSON.parse(event.body || '{}');
 const { apiKey, prompt, question } = body;
 const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
   method:'POST',
   headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`},
   body: JSON.stringify({
    model:'openai/gpt-4o-mini',
    messages:[
      {role:'system',content:prompt},
      {role:'user',content:question}
    ]
   })
 });
 const data = await res.json();
 return {
   statusCode:200,
   body: JSON.stringify({reply:data.choices?.[0]?.message?.content || 'پاسخی دریافت نشد'})
 };
};

// ================= netlify/functions/call-webhook.js =================
exports.handler = async (event) => {
 const payload = JSON.parse(event.body || '{}');
 console.log('CALL:', payload);
 return {
  statusCode:200,
  body: JSON.stringify({
   success:true,
   reply:'سلام، با منشی هوشمند هژی تماس گرفتید.'
  })
 };
};

// ================= src/app/page.tsx =================
'use client';
import { useState } from 'react';

export default function Home(){
 const [form,setForm]=useState({name:'',type:'',hours:'',services:'',faq:'',apiKey:'',question:''});
 const [reply,setReply]=useState('');
 const [loading,setLoading]=useState(false);
 const change=(k,v)=>setForm({...form,[k]:v});

 const ask=async()=>{
  setLoading(true);
  const prompt=`شما منشی هوشمند ${form.name} هستید. نوع کسب و کار:${form.type}. ساعات:${form.hours}. خدمات:${form.services}. سوالات:${form.faq}. فقط فارسی جواب بده.`;
  const res=await fetch('/.netlify/functions/chat',{
   method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({apiKey:form.apiKey,prompt,question:form.question})
  });
  const data=await res.json();
  setReply(data.reply);
  setLoading(false);
 };

 return <main dir='rtl' style={{maxWidth:900,margin:'auto',padding:30,fontFamily:'sans-serif'}}>
  <h1>منشی هوشمند هژی</h1>
  <input placeholder='نام کسب و کار' onChange={e=>change('name',e.target.value)} /><br/><br/>
  <input placeholder='نوع کسب و کار' onChange={e=>change('type',e.target.value)} /><br/><br/>
  <input placeholder='ساعات کاری' onChange={e=>change('hours',e.target.value)} /><br/><br/>
  <textarea placeholder='خدمات' onChange={e=>change('services',e.target.value)} /><br/><br/>
  <textarea placeholder='سوالات متداول' onChange={e=>change('faq',e.target.value)} /><br/><br/>
  <input placeholder='OpenRouter API Key' onChange={e=>change('apiKey',e.target.value)} /><br/><br/>
  <textarea placeholder='سوال مشتری...' onChange={e=>change('question',e.target.value)} /><br/><br/>
  <button onClick={ask}>{loading?'درحال پاسخ...':'تست منشی'}</button>
  <p>{reply}</p>
 </main>
}
