const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`
  ============================================
    Server started on http://localhost:${PORT}
  ============================================
    `);
});
