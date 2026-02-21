const express = require('express');
const app = express();

app.get('/temperatura/:location_code', (req, res) => {
    // ... código para buscar o clima ...
});

app.listen(8080, () => {
  console.log('Servidor está rodando na porta 8080.');
});