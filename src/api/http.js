// src/api/http.js
const BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

// POST genérico (JSON)
export async function apiPost(path, body) {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// GET genérico
export async function apiGet(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// GET com token JWT no header
export async function withAuthGet(path) {
  const t = localStorage.getItem('token');
  if (!t) throw new Error('Token ausente');
  const res = await fetch(BASE + path, {
    headers: { Authorization: `Bearer ${t}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
