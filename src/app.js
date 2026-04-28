// ===== Hozhi AI Receptionist — Main App =====
// © محمد هژبری — All Rights Reserved

window.chatHistory = [];
window.totalTokens = 0;
let selProv = 0, selModel = 0;

// ===== Business =====
function saveBiz() {
  ls('biz', {
    name: vEl('b-name'), type: vEl('b-type'), phone: vEl('b-phone'),
    site: vEl('b-site'), addr: vEl('b-addr'), desc: vEl('b-desc'),
    aiName: vEl('b-ainame') || 'سارا', tone: vEl('b-tone'), welcome: vEl('b-welcome'),
  });
  showSaved(); toast('اطلاعات کسب‌وکار ذخیره شد ✓');
}

function loadBiz() {
  const d = ls('biz'); if (!d) return;
  svEl('b-name', d.name); svEl('b-type', d.type); svEl('b-phone', d.phone);
  svEl('b-site', d.site); svEl('b-addr', d.addr); svEl('b-desc', d.desc);
  svEl('b-ainame', d.aiName); svEl('b-tone', d.tone); svEl('b-welcome', d.welcome);
}

// ===== Docs =====
function dragOver(e) { e.preventDefault(); document.getElementById('upload-area').classList.add('drag'); }
function dragLeave() { document.getElementById('upload-area').classList.remove('drag'); }
function dropFile(e) { e.preventDefault(); dragLeave(); handleFiles(e.dataTransfer.files); }

function handleFiles(files) {
  const docs = ls('docs') || [];
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;
      docs.push({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        content: typeof content === 'string' ? content.slice(0, 8000) : '[فایل باینری — محتوا در دسترس نیست]',
        date: new Date().toLocaleDateString('fa-IR'),
      });
      ls('docs', docs);
      renderDocs();
      toast(`فایل «${file.name}» اضافه شد ✓`);
      showSaved();
    };
    if (file.type.includes('pdf') || file.name.endsWith('.pdf')) reader.readAsDataURL(file);
    else reader.readAsText(file, 'UTF-8');
  });
}

function addTextDoc() {
  const title = vEl('doc-title').trim(), text = vEl('doc-text').trim();
  if (!title || !text) { toast('عنوان و محتوا را وارد کنید'); return; }
  const docs = ls('docs') || [];
  docs.push({id: Date.now(), name: title, size: text.length, type: 'text/plain', content: text, date: new Date().toLocaleDateString('fa-IR')});
  ls('docs', docs); svEl('doc-title', ''); svEl('doc-text', '');
  renderDocs(); toast('سند اضافه شد ✓'); showSaved();
}

function delDoc(id) { ls('docs', (ls('docs') || []).filter(d => d.id !== id)); renderDocs(); }

function renderDocs() {
  const docs = ls('docs') || [];
  const icon = d => d.name.endsWith('.pdf') ? '📕' : d.name.endsWith('.docx') || d.name.endsWith('.doc') ? '📘' : d.name.endsWith('.md') ? '📓' : '📄';
  const list = document.getElementById('doc-list');
  if (list) list.innerHTML = docs.map(d => `
    <div class="doc-item">
      <div class="doc-icon">${icon(d)}</div>
      <div class="doc-info">
        <div class="doc-name">${d.name}</div>
        <div class="doc-meta">${d.date} — ${(d.size / 1024).toFixed(1)} KB</div>
      </div>
      <button class="delbtn" onclick="delDoc(${d.id})">✕</button>
    </div>`).join('') || '<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">هنوز سندی آپلود نشده</div>';

  const sum = document.getElementById('docs-summary');
  if (sum) {
    if (docs.length) {
      sum.style.display = 'block';
      const totalChar = docs.reduce((a, d) => a + (d.content || '').length, 0);
      document.getElementById('docs-stats').innerHTML = `<span class="badge bg">${docs.length} سند</span>&nbsp;<span class="badge bb">~${Math.round(totalChar / 4).toLocaleString('fa-IR')} توکن</span>`;
    } else {
      sum.style.display = 'none';
    }
  }
}

// ===== FAQ =====
function addFaq() {
  const q = vEl('fq-q').trim(), a = vEl('fq-a').trim();
  if (!q || !a) { toast('سوال و پاسخ را وارد کنید'); return; }
  const f = ls('faqs') || []; f.push({q, a, id: Date.now()});
  ls('faqs', f); svEl('fq-q', ''); svEl('fq-a', '');
  renderFaqs(); toast('سوال اضافه شد ✓'); showSaved();
}

function delFaq(id) { ls('faqs', (ls('faqs') || []).filter(f => f.id !== id)); renderFaqs(); }

function renderFaqs() {
  const f = ls('faqs') || [];
  document.getElementById('faq-cnt').textContent = f.length;
  document.getElementById('faq-list').innerHTML = f.length
    ? f.map(x => `<div class="fai"><div class="fai-b"><div class="fai-q">${x.q}</div><div class="fai-a">${x.a}</div></div><button class="delbtn" onclick="delFaq(${x.id})">✕</button></div>`).join('')
    : '<div style="text-align:center;color:var(--text3);font-size:12px;padding:16px">هنوز سوالی ثبت نشده</div>';
}

// ===== Hours =====
function renderHours() {
  const saved = ls('hours') || {};
  document.getElementById('hours-rows').innerHTML = DAYS.map((d, i) => {
    const open = saved[i]?.open ?? DEF_OPEN[i], from = saved[i]?.from || '09:00', to = saved[i]?.to || '17:00';
    return `<div class="hr-row">
      <span style="font-size:12px;color:var(--text);font-weight:500">${d}</span>
      <input type="time" id="ho-${i}" value="${from}" ${open ? '' : 'disabled'} style="opacity:${open ? 1 : .3}"/>
      <input type="time" id="hc-${i}" value="${to}" ${open ? '' : 'disabled'} style="opacity:${open ? 1 : .3}"/>
      <label class="tog"><input type="checkbox" ${open ? 'checked' : ''} onchange="togDay(${i},this)"><span class="tog-t"></span></label>
    </div>`;
  }).join('');
}

function togDay(i, cb) {
  const o = cb.checked;
  ['ho-', 'hc-'].forEach(p => { const el = document.getElementById(p + i); el.disabled = !o; el.style.opacity = o ? 1 : .3; });
}

function saveHours() {
  const d = {};
  DAYS.forEach((_, i) => {
    d[i] = {open: !document.getElementById('ho-' + i)?.disabled, from: document.getElementById('ho-' + i)?.value || '09:00', to: document.getElementById('hc-' + i)?.value || '17:00'};
  });
  ls('hours', d); ls('closedMsg', vEl('closed-msg'));
  showSaved(); toast('ساعات کاری ذخیره شد ✓');
}

// ===== AI Provider =====
function renderProviders() {
  const saved = ls('aiCfg') || {};
  const el = document.getElementById('prov-list');
  if (!el) return;

  el.innerHTML = PROVIDERS.map((p, i) => {
    const isActive = i === selProv;
    return `
    <div class="prov-item ${isActive ? 'active' : ''}" id="prov-${i}" onclick="selectProv(${i})">
      <div class="prov-header">
        <div class="prov-radio"><div class="prov-radio-inner"></div></div>
        <div class="prov-info">
          <div class="prov-name">${p.flag} ${p.name}</div>
          <div class="prov-meta">${p.stars}&nbsp;&nbsp;<span class="badge bc" style="font-size:9px">${p.badge}</span></div>
        </div>
      </div>
      <div class="prov-body">
        <div style="font-size:10px;color:var(--text3);margin-bottom:8px">مدل را انتخاب کنید:</div>
        <div class="model-chips">
          ${p.models.map((m, j) => `<div class="mchip ${isActive && j === selModel ? 'sel' : ''}" id="mchip-${i}-${j}" onclick="event.stopPropagation();selectModel(${i},${j})">${m.n}<br><span style="font-size:9px;opacity:.7">${m.m}</span></div>`).join('')}
        </div>
        ${p.customModelEnabled ? `
          <div style="font-size:10px;color:var(--text3);margin-bottom:5px">یا مدل سفارشی (مثال: anthropic/claude-3-opus):</div>
          <div class="fg" style="margin-bottom:10px"><input id="or-custom-${i}" placeholder="model-id سفارشی..." onclick="event.stopPropagation()" value="${saved.provider === p.id && saved.customModel ? saved.customModel : ''}"/></div>
        ` : ''}
        <div style="font-size:10px;color:var(--text3);margin-bottom:5px">کلید API — <a href="https://${p.hint}" target="_blank" style="color:#93c5fd">${p.hint}</a></div>
        <div class="fg" style="margin-bottom:10px">
          <input type="password" id="key-${i}" placeholder="کلید API خود را وارد کنید..." onclick="event.stopPropagation()" value="${saved.provider === p.id && saved.key ? saved.key : ''}"/>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn-p btn-s" onclick="event.stopPropagation();saveAI(${i})">ذخیره</button>
          <button class="btn btn-s" onclick="event.stopPropagation();testAI(${i})">تست اتصال</button>
          <span id="ai-st-${i}" style="font-size:10px;color:var(--text3)"></span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function selectProv(i) { selProv = i; selModel = 0; renderProviders(); }

function selectModel(provIdx, modelIdx) {
  if (provIdx !== selProv) return;
  selModel = modelIdx;
  PROVIDERS[provIdx].models.forEach((_, j) => {
    const el = document.getElementById(`mchip-${provIdx}-${j}`);
    if (el) { if (j === modelIdx) el.classList.add('sel'); else el.classList.remove('sel'); }
  });
}

function saveAI(provIdx) {
  const p = PROVIDERS[provIdx];
  const m = p.models[selModel] || p.models[0];
  const key = document.getElementById('key-' + provIdx)?.value || '';
  const customModel = p.customModelEnabled ? (document.getElementById('or-custom-' + provIdx)?.value || '') : '';
  const modelId = customModel || m.id;
  ls('aiCfg', {provider: p.id, model: modelId, key, maxTok: vEl('max-tok'), ctxLen: vEl('ctx-len'), customModel});
  showSaved(); toast('تنظیمات AI ذخیره شد ✓'); updTestSt();
}

async function testAI(provIdx) {
  const stEl = document.getElementById('ai-st-' + provIdx);
  const key = document.getElementById('key-' + provIdx)?.value?.trim();
  if (!key) { stEl.style.color = 'var(--amber)'; stEl.textContent = 'کلید را وارد کنید'; return; }
  stEl.style.color = 'var(--text3)'; stEl.textContent = 'در حال تست...';
  const p = PROVIDERS[provIdx];
  const m = p.models[selModel] || p.models[0];
  const tmpCfg = {provider: p.id, model: m.id, key, maxTok: 50, ctxLen: 2};
  const orig = window.chatHistory; window.chatHistory = [];
  const r = await callAI('سلام', tmpCfg, 'فقط بگو: آنلاین هستم');
  window.chatHistory = orig;
  if (r && !r.startsWith('خطا')) { stEl.style.color = 'var(--green)'; stEl.textContent = '✓ اتصال موفق'; }
  else { stEl.style.color = 'var(--red)'; stEl.textContent = r.slice(0, 50); }
}

// ===== Phone =====
function savePhone() {
  const sid = vEl('tw-sid'); if (!sid) { toast('Account SID را وارد کنید'); return; }
  ls('twilio', {sid, tok: vEl('tw-tok'), num: vEl('tw-num')});
  document.getElementById('phone-lines').innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--bg3);border:1px solid var(--accent);border-radius:var(--r)">
      <div class="pulse"></div>
      <div style="flex:1"><div style="font-size:12px;font-weight:600">${vEl('tw-num') || '—'}</div><div style="font-size:10px;color:var(--text3)">Twilio — فعال</div></div>
      <span class="badge bg">فعال</span>
    </div>`;
  showSaved(); toast('Twilio ذخیره شد ✓');
}

// ===== Depts =====
function addDept() {
  const n = vEl('d-name').trim(), num = vEl('d-num').trim();
  if (!n || !num) { toast('نام و شماره را وارد کنید'); return; }
  const d = ls('depts') || []; d.push({name: n, num, id: Date.now()});
  ls('depts', d); svEl('d-name', ''); svEl('d-num', ''); renderDepts(); toast('بخش اضافه شد ✓'); showSaved();
}
function delDept(id) { ls('depts', (ls('depts') || []).filter(d => d.id !== id)); renderDepts(); }
function renderDepts() {
  const d = ls('depts') || [];
  document.getElementById('dept-list').innerHTML = d.length
    ? d.map(x => `<div class="tr-row"><div style="flex:1"><div style="font-size:12px;font-weight:600">${x.name}</div><div style="font-size:10px;color:var(--text3)">${x.num}</div></div><span class="badge bg">فعال</span><button class="delbtn" onclick="delDept(${x.id})">✕</button></div>`).join('')
    : '<div style="color:var(--text3);font-size:12px;text-align:center;padding:10px">بخشی ثبت نشده</div>';
}
function saveTr() { ls('transfer', {kw: vEl('tr-kw'), msg: vEl('tr-msg'), no: vEl('tr-no')}); showSaved(); toast('تنظیمات انتقال ذخیره شد ✓'); }
function loadTr() { const d = ls('transfer'); if (!d) return; svEl('tr-kw', d.kw); svEl('tr-msg', d.msg); svEl('tr-no', d.no); }

// ===== Chat =====
async function sendMsg() {
  const inp = document.getElementById('chat-in'), msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  const cfg = ls('aiCfg') || {};
  const area = document.getElementById('chat-area');
  area.innerHTML += `<div class="mw user"><div class="ml">مشتری</div><div class="msg msg-user">${msg}</div></div>`;
  window.chatHistory.push({role: 'user', content: msg});
  area.scrollTop = area.scrollHeight;

  const thEl = document.createElement('div'); thEl.className = 'mw ai';
  const an = (ls('biz') || {}).aiName || 'منشی';
  thEl.innerHTML = `<div class="ml">${an}</div><div class="msg msg-ai"><div class="typing"><span></span><span></span><span></span></div></div>`;
  area.appendChild(thEl); area.scrollTop = area.scrollHeight;

  const reply = await callAI(msg, cfg);
  window.chatHistory.push({role: 'assistant', content: reply});
  thEl.innerHTML = `<div class="ml">${an}</div><div class="msg msg-ai">${reply}</div>`;
  area.scrollTop = area.scrollHeight;

  // Stats
  const s = ls('testStats') || {calls:0,ok:0,tr:0,tokens:0};
  s.calls++;
  const kws = (ls('transfer')?.kw || 'با اپراتور,با کارشناس').split(',');
  if (kws.some(k => msg.includes(k.trim()))) s.tr++; else if (!reply.startsWith('خطا')) s.ok++;
  s.tokens = window.totalTokens;
  ls('testStats', s);

  // Log
  const logs = ls('chatLogs') || [];
  logs.unshift({time: new Date().toLocaleTimeString('fa-IR'), msg, reply: reply.slice(0, 100), id: Date.now()});
  ls('chatLogs', logs.slice(0, 100));
  updateTokDisplay();
}

function qm(m) { document.getElementById('chat-in').value = m; sendMsg(); }
function clrChat() { window.chatHistory = []; document.getElementById('chat-area').innerHTML = ''; toast('چت پاک شد'); }

function updateTokDisplay() {
  const el = document.getElementById('tok-display');
  if (el) el.textContent = 'توکن: ' + (window.totalTokens || 0).toLocaleString('fa-IR');
}

// ===== Test Status =====
function updTestSt() {
  const cfg = ls('aiCfg') || {}, biz = ls('biz') || {};
  const el = document.getElementById('test-st-box'); if (!el) return;
  if (!cfg.key) {
    el.className = 'warn-box';
    el.innerHTML = '⚠️ کلید API ثبت نشده — به بخش <strong>هوش مصنوعی</strong> بروید و کلید خود را وارد و ذخیره کنید.';
  } else if (!biz.name) {
    el.className = 'warn-box';
    el.innerHTML = '⚠️ اطلاعات کسب‌وکار ثبت نشده — به بخش <strong>کسب‌وکار</strong> بروید.';
  } else {
    const p = PROVIDERS.find(x => x.id === cfg.provider) || PROVIDERS[0];
    const m = p.models.find(x => x.id === cfg.model) || p.models[0];
    el.className = 'ok-box';
    el.innerHTML = `✓ منشی آماده — ${biz.name} | مدل: ${m?.n || cfg.model} | توکن مصرفی: ${(window.totalTokens || 0).toLocaleString('fa-IR')}`;
  }
}

// ===== Reports =====
function renderReports() {
  const s = ls('testStats') || {};
  document.getElementById('r-tot').textContent = (s.calls || 0).toLocaleString('fa-IR');
  document.getElementById('r-ok').textContent  = (s.ok    || 0).toLocaleString('fa-IR');
  document.getElementById('r-tr').textContent  = (s.tr    || 0).toLocaleString('fa-IR');
  document.getElementById('r-tok').textContent = (s.tokens || window.totalTokens || 0).toLocaleString('fa-IR');
  const logs = ls('chatLogs') || [];
  document.getElementById('hist-list').innerHTML = logs.length
    ? `<table class="tbl"><thead><tr><th>زمان</th><th>پیام مشتری</th><th>پاسخ منشی</th></tr></thead><tbody>`
      + logs.map(l => `<tr><td>${l.time}</td><td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.msg}</td><td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text)">${l.reply}…</td></tr>`).join('')
      + '</tbody></table>'
    : '<div style="text-align:center;color:var(--text3);font-size:12px;padding:16px">هنوز مکالمه‌ای ثبت نشده</div>';
}

function clrHist() {
  ls('chatLogs', null); ls('testStats', null);
  window.totalTokens = 0; renderReports(); toast('تاریخچه پاک شد');
}

// ===== Init =====
function init() {
  renderAllPages();
  const saved = ls('aiCfg') || {};
  selProv = PROVIDERS.findIndex(p => p.id === (saved.provider || 'anthropic'));
  if (selProv < 0) selProv = 0;
  selModel = PROVIDERS[selProv].models.findIndex(m => m.id === saved.model);
  if (selModel < 0) selModel = 0;

  loadBiz(); renderFaqs(); renderHours(); renderProviders(); renderDepts(); renderDocs(); loadTr();
  const s = ls('testStats') || {};
  window.totalTokens = s.tokens || 0;
  updateTokDisplay();

  const tw = ls('twilio');
  if (tw?.sid) {
    const pl = document.getElementById('phone-lines');
    if (pl) pl.innerHTML = `<div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--bg3);border:1px solid var(--accent);border-radius:var(--r)"><div class="pulse"></div><div style="flex:1"><div style="font-size:12px;font-weight:600">${tw.num || '—'}</div><div style="font-size:10px;color:var(--text3)">Twilio — فعال</div></div><span class="badge bg">فعال</span></div>`;
    svEl('tw-sid', tw.sid); svEl('tw-num', tw.num);
  }
  setTimeout(updTestSt, 300);
}

document.addEventListener('DOMContentLoaded', init);
