// server.js — clientes, transportadores e afiliados (com rota _debug para DEV)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client, Databases, Query } = require('node-appwrite');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4101;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DB_ID,
  APPWRITE_CLIENTS_COLLECTION_ID,
  APPWRITE_TRANSPORTERS_COLLECTION_ID,
  APPWRITE_AF_COLLECTION_ID,
  NODE_ENV
} = process.env;

const awClient = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const db = new Databases(awClient);

// ===== helpers =====
const gerarToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

// ===== LOGIN: cliente (aceita senha_hash OU senha em texto) =====
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const rs = await db.listDocuments(APPWRITE_DB_ID, APPWRITE_CLIENTS_COLLECTION_ID, [
      Query.equal('email', email),
    ]);
    if (rs.total === 0) return res.status(401).json({ ok:false, error:'Usuário não encontrado' });

    const doc = rs.documents[0];
    let ok = false;
    if (doc.senha_hash) ok = await bcrypt.compare(senha, doc.senha_hash);
    else if (doc.senha) ok = senha === doc.senha;

    if (!ok) return res.status(401).json({ ok:false, error:'Senha incorreta' });

    const token = gerarToken({ userId: doc.$id, email: doc.email, role:'cliente' });
    return res.json({ ok:true, token });
  } catch (e) {
    console.error('Erro login cliente:', e);
    return res.status(500).json({ ok:false, error:'Erro interno no login cliente' });
  }
});

// ===== LOGIN: transportador =====
app.post('/login-transp', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const rs = await db.listDocuments(APPWRITE_DB_ID, APPWRITE_TRANSPORTERS_COLLECTION_ID, [
      Query.equal('email', email),
    ]);
    if (rs.total === 0) return res.status(401).json({ ok:false, error:'Usuário não encontrado' });

    const doc = rs.documents[0];
    const ok = doc.senha_hash ? await bcrypt.compare(senha, doc.senha_hash) : senha === doc.senha;
    if (!ok) return res.status(401).json({ ok:false, error:'Senha incorreta' });

    const token = gerarToken({ userId: doc.$id, email: doc.email, role:'transportador' });
    return res.json({ ok:true, token });
  } catch (e) {
    console.error('Erro login transportador:', e);
    return res.status(500).json({ ok:false, error:'Erro interno no login transportador' });
  }
});

// ===== LOGIN: afiliado =====
app.post('/login-af', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const rs = await db.listDocuments(APPWRITE_DB_ID, APPWRITE_AF_COLLECTION_ID, [
      Query.equal('email', email),
    ]);
    if (rs.total === 0) return res.status(401).json({ ok:false, error:'Usuário não encontrado' });

    const doc = rs.documents[0];
    const ok = doc.senha_hash ? await bcrypt.compare(senha, doc.senha_hash) : senha === doc.senha;
    if (!ok) return res.status(401).json({ ok:false, error:'Senha incorreta' });

    const token = gerarToken({ userId: doc.$id, email: doc.email, role:'afiliado' });
    return res.json({ ok:true, token });
  } catch (e) {
    console.error('Erro login afiliado:', e);
    return res.status(500).json({ ok:false, error:'Erro interno no login afiliado' });
  }
});

// ===== Rotas protegidas simples =====
app.get('/protegido', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error:'Token ausente' });
  try {
    const token = auth.split(' ')[1];
    const dec = jwt.verify(token, JWT_SECRET);
    return res.json({ ok:true, message:'Área protegida CLIENTE', user: dec });
  } catch { return res.status(401).json({ error:'Token inválido' }); }
});

app.get('/protegido-transp', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error:'Token ausente' });
  try {
    const token = auth.split(' ')[1];
    const dec = jwt.verify(token, JWT_SECRET);
    if (dec.role !== 'transportador') return res.status(403).json({ error:'Acesso negado' });
    return res.json({ ok:true, message:'Área protegida TRANSPORTADOR', user: dec });
  } catch { return res.status(401).json({ error:'Token inválido' }); }
});

app.get('/protegido-af', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error:'Token ausente' });
  try {
    const token = auth.split(' ')[1];
    const dec = jwt.verify(token, JWT_SECRET);
    if (dec.role !== 'afiliado') return res.status(403).json({ error:'Acesso negado' });
    return res.json({ ok:true, message:'Área protegida AFILIADO', user: dec });
  } catch { return res.status(401).json({ error:'Token inválido' }); }
});

// ===== DEBUG (apenas fora de produção) =====
if (process.env.NODE_ENV !== 'production') {
  app.get('/_debug/client', async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) return res.status(400).json({ ok:false, error:'Passe ?email=' });
      const rs = await db.listDocuments(APPWRITE_DB_ID, APPWRITE_CLIENTS_COLLECTION_ID, [
        Query.equal('email', email),
      ]);
      if (rs.total === 0) return res.json({ ok:false, found:0 });
      const d = rs.documents[0];
      return res.json({
        ok:true,
        found: rs.total,
        fields: Object.keys(d),
        has_senha_hash: !!d.senha_hash,
        has_senha_texto: !!d.senha,
        sample_doc_id: d.$id
      });
    } catch (e) {
      console.error('DEBUG /_debug/client', e);
      return res.status(500).json({ ok:false, error:'debug fail' });
    }
  });
}

// health
app.get('/health', (_req,res)=>res.json({ok:true}));

// start
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
