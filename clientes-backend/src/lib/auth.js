const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chavesecreta';

function gerarToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { gerarToken, verificarToken };