const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'trpo',
  password: 'Kuc1804SX',
  port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clubs WHERE club_code = $1', ['fc-barcelona']);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404error.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});