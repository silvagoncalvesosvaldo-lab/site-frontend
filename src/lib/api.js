// src/lib/api.js

// 1) Base da API: prioriza variável do Vite (VITE_API_BASE) e tem fallbacks
const API_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
  'http://localhost:4101';

// 2) Ajuda a ler JSON com segurança (caso a resposta venha vazia)
function toJsonSafe(res) {
  return res.text().then((txt) => {
    try {
      return txt ? JSON.parse(txt) : null;
    } catch {
      return null;
    }
  });
}

// 3) Wrapper genérico
export async function api(path, { method = 'GET', body, headers } = {}) {
  // tenta pegar token do localStorage no browser, se existir
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'omit',
  });

  if (!res.ok) {
    const err = await toJsonSafe(res);
    const msg = err?.error || err?.message || res.statusText;
    throw new Error(msg);
  }

  return toJsonSafe(res);
}

// 4) Atalhos
export const get  = (path, opts)        => api(path, { ...(opts || {}), method: 'GET'    });
export const post = (path, body, opts)  => api(path, { ...(opts || {}), method: 'POST', body });
export const put  = (path, body, opts)  => api(path, { ...(opts || {}), method: 'PUT',  body });
export const del  = (path, opts)        => api(path, { ...(opts || {}), method: 'DELETE' });
