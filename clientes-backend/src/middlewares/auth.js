const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação por JWT.
 * Uso: app.get('/rota', auth());                // qualquer role
 *      app.get('/rota', auth(['cliente']));     // apenas role 'cliente'
 */
function auth(requiredRoles = []) {
  return (req, res, next) => {
    const header = req.headers['authorization'] || '';
    const [type, token] = header.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ ok: false, error: 'NO_TOKEN' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // payload esperado: { email, role, ... }
      req.user = payload;

      if (requiredRoles.length && !requiredRoles.includes(payload.role)) {
        return res.status(403).json({ ok: false, error: 'FORBIDDEN_ROLE' });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ ok: false, error: 'INVALID_TOKEN' });
    }
  };
}

module.exports = { auth };
