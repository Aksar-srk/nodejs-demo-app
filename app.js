const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('CI/CD Is working fine need to update with features');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});