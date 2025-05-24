const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

router.post('/cadastro', async (req, res) => {
  const { nome, email, telefone, senha, tipo } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  db.query(
    'INSERT INTO usuarios (nome, email, telefone, senha, tipo) VALUES (?, ?, ?, ?, ?)',
    [nome, email, telefone, hash, tipo],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ success: true, id: result.insertId });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Usuário não encontrado');

    const match = await bcrypt.compare(senha, results[0].senha);
    if (!match) return res.status(401).send('Senha incorreta');

    res.send({ success: true, usuario: results[0] });
  });
});

module.exports = router;
