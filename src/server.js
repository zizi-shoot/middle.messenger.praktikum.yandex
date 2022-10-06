const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`
  ============================================
    Server started on http://localhost:${PORT}
  ============================================
    `);
});
