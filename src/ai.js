// ===== AI Engine =====
// © محمد هژبری

function buildSystemPrompt() {
  const biz   = ls('biz') || {};
  const faqs  = ls('faqs') || [];
  const hours = ls('hours') || {};
  const depts = ls('depts') || [];
  const tr    = ls('transfer') || {};
  const docs  = ls('docs') || [];

  const name   = biz.name   || 'کسب‌وکار ما';
  const aiName = biz.aiName || 'سارا';
  const tone   = biz.tone   || 'رسمی و حرفه‌ای';

  let sp = `تو ${aiName}، منشی تلفنی هوشمند "${name}" هستی.\n`;
  sp += `لحن: ${tone}.\n`;
  sp += `قوانین مهم:\n`;
  sp += `- همیشه فارسی پاسخ بده\n`;
  sp += `- پاسخ‌ها کوتاه، واضح و مفید باشند (حداکثر ۳-۴ جمله)\n`;
  sp += `- مؤدب و حرفه‌ای باش\n`;
  sp += `- اگر سوالی نمی‌دانی، صادق باش\n\n`;

  if (biz.desc)    sp += `درباره کسب‌وکار:\n${biz.desc}\n\n`;
  if (biz.addr)    sp += `آدرس: ${biz.addr}\n`;
  if (biz.phone)   sp += `تلفن: ${biz.phone}\n`;
  if (biz.site)    sp += `وب‌سایت: ${biz.site}\n`;
  if (biz.welcome) sp += `جمله خوش‌آمدگویی: ${biz.welcome}\n`;

  // ساعات کاری امروز
  const dayMap = {0:1,1:2,2:3,3:4,4:5,5:6,6:0};
  const todayIdx = dayMap[new Date().getDay()];
  const ht = hours[todayIdx];
  if (ht) {
    sp += `\nساعت کاری امروز (${DAYS[todayIdx]}): `;
    sp += ht.open ? `${ht.from} تا ${ht.to}` : 'تعطیل';
    sp += '\n';
  }

  // اسناد
  if (docs.length) {
    sp += '\n--- اطلاعات اسناد کسب‌وکار ---\n';
    let totalChars = 0;
    for (const doc of docs) {
      if (totalChars > 4000) break;
      const chunk = (doc.content || '').slice(0, 2000);
      sp += `\n[${doc.name}]\n${chunk}\n`;
      totalChars += chunk.length;
    }
    sp += '--- پایان اسناد ---\n';
  }

  // FAQ
  if (faqs.length) {
    sp += '\nسوالات متداول:\n';
    faqs.forEach(f => { sp += `س: ${f.q}\nج: ${f.a}\n`; });
  }

  // انتقال
  const kw = tr.kw || 'با اپراتور,با کارشناس,با انسان,مسئول,نماینده';
  if (depts.length) {
    sp += `\nانتقال تماس:\nاگر مشتری عباراتی مثل "${kw}" گفت، اعلام کن که به بخش مربوطه متصل می‌کنی.\n`;
    sp += `بخش‌های موجود: ${depts.map(d => `${d.name} (${d.num})`).join('، ')}\n`;
    sp += `پیام انتقال: ${tr.msg || 'لطفاً لحظه‌ای صبر کنید.'}\n`;
  }

  return sp;
}

async function callAI(userMsg, cfg, sysOverride) {
  const ep = ENDPOINTS[cfg.provider || 'anthropic'];
  if (!ep) return 'خطا: ارائه‌دهنده نامشخص است.';
  if (!cfg.key) return 'خطا: کلید API ثبت نشده. به بخش «هوش مصنوعی» بروید و کلید خود را وارد کنید.';

  const sys    = sysOverride || buildSystemPrompt();
  const maxTok = parseInt(cfg.maxTok || 300);
  const ctxLen = parseInt(cfg.ctxLen || 8);
  const hist   = (window.chatHistory || []).slice(-ctxLen);

  try {
    if (ep.type === 'anthropic') {
      const res = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': cfg.key,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: cfg.model,
          max_tokens: maxTok,
          system: sys,
          messages: [...hist, {role: 'user', content: userMsg}],
        }),
      });
      const data = await res.json();
      if (!res.ok) return `خطا: ${data.error?.message || res.status}`;
      window.totalTokens = (window.totalTokens || 0) + (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);
      return data.content?.[0]?.text || '';

    } else if (ep.type === 'openai') {
      let url = ep.url;
      const headers = {'Content-Type': 'application/json'};
      const msgs = [{role:'system', content:sys}, ...hist, {role:'user', content:userMsg}];

      if (cfg.provider === 'google') {
        url = ep.url.replace('{model}', cfg.model) + '?key=' + cfg.key;
        const gRes = await fetch(url, {method:'POST', headers, body: JSON.stringify({contents:[{parts:[{text: sys+'\n\nمشتری: '+userMsg}]}]})});
        const gData = await gRes.json();
        if (!gRes.ok) return `خطا: ${gData.error?.message || gRes.status}`;
        return gData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }

      if (cfg.provider !== 'google') headers['Authorization'] = 'Bearer ' + cfg.key;
      if (cfg.provider === 'openrouter') {
        headers['HTTP-Referer'] = 'https://hozhi.ai';
        headers['X-Title'] = 'Hozhi AI Receptionist';
      }

      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({model: cfg.model, max_tokens: maxTok, messages: msgs}),
      });
      const data = await res.json();
      if (!res.ok) return `خطا: ${data.error?.message || res.status}`;
      window.totalTokens = (window.totalTokens || 0) + (data.usage?.total_tokens || 0);
      return data.choices?.[0]?.message?.content || '';
    }
  } catch (e) {
    return 'خطای شبکه: ' + e.message;
  }
}
