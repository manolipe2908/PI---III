const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.post('/cadastrar', async (req, res) => {
  const { tipo, nome, email, senha, telefone, regiao, servico, descricao } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  const tabela = tipo === 'cliente' ? 'clientes' : 'prestadores';
  let sql, params;

  if (tipo === 'cliente') {
    sql = "INSERT INTO clientes (nome, email, senha, telefone) VALUES (?, ?, ?, ?)";
    params = [nome, email, hash, telefone];
  } else {
    sql = "INSERT INTO prestadores (nome, email, senha, telefone, regiao, servico, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)";
    params = [nome, email, hash, telefone, regiao, servico, descricao];
  }

  connection.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: "Erro ao cadastrar" });
    res.status(200).json({ message: "Cadastro realizado com sucesso!" });
  });
});

module.exports = router;
