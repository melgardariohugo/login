// Archivo: login/backend/rutas/rutas.js
const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db');
const router = express.Router();


// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  connection.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'El correo ya est\u00e1 registrado' });
        }
        return res.status(500).json({ error: 'Error en el registro' });
      }
      res.status(200).json({ message: 'Usuario registrado con \u00e9xito' });
    }
  );
});



// Login
router.post('/login', (req, res) => {
const { email, password } = req.body;


connection.query(
'SELECT * FROM users WHERE email = ?',
[email],
async (err, results) => {
if (err || results.length === 0) {
return res.status(401).json({ error: 'Usuario no encontrado' });
}


const user = results[0];
const match = await bcrypt.compare(password, user.password);


if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });


res.status(200).json({ message: 'Login exitoso' });
}
);
});


module.exports = router;

