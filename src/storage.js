// ===== Storage Helper =====
// © محمد هژبری

const PREFIX = 'hozhi_';

function ls(k, v) {
  if (v === undefined) {
    try { return JSON.parse(localStorage.getItem(PREFIX + k)); } catch { return null; }
  } else {
    localStorage.setItem(PREFIX + k, JSON.stringify(v));
  }
}

// ===== UI Helpers =====
function toast(msg, d = 2300) {
  const el = document.getElementById('toast-el');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), d);
}

function showSaved() {
  const el = document.getElementById('saved-ind');
  if (!el) return;
  el.style.opacity = '1';
  setTimeout(() => el.style.opacity = '0', 2000);
}

function vEl(id) { return document.getElementById(id)?.value || ''; }
function svEl(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }

function gp(p, el) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(x => x.classList.remove('active'));
  const pg = document.getElementById('pg-' + p);
  if (pg) pg.classList.add('active');
  if (el) el.classList.add('active');
  const t = PG_INFO[p];
  if (t) {
    document.getElementById('pg-title').textContent = t[0];
    document.getElementById('pg-desc').textContent = t[1];
  }
  if (p === 'reports') renderReports();
  if (p === 'test') updTestSt();
}
