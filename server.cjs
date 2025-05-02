const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Caminho correto da pasta build
const buildPath = path.join(__dirname, 'build');

// Serve os arquivos estáticos (HTML, JS, CSS)
app.use(express.static(buildPath));

// SPA fallback: todas as rotas não reconhecidas vão pro index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`✅ Servindo em http://localhost:${port}`);
});
