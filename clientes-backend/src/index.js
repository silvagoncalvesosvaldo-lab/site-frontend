// src/index.js
require('dotenv').config();
const express = require('express');
const { auth } = require('./middlewares/auth');

const app = express();
app.use(express.json());

// rota pública
app.get('/public', (req, res) => res.json({ ok: true, message: 'rota pública' }));

// rota protegida: exige token
app.get('/me', auth(), (req, res) => {
  return res.json({ ok: true, user: req.user });
});

// rota protegida por perfil: apenas 'cliente'
app.get('/clientes-area', auth(['cliente']), (req, res) => {
  return res.json({ ok: true, area: 'clientes' });
});

// subir o servidor
const port = Number(process.env.PORT || 4101);
app.listen(port, () => {
  console.log(`API UP http://localhost:${port}`);
});
