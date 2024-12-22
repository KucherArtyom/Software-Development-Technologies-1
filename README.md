# Software-Development-Technologies-1 (Кучер Артем Сергеевич ЭФМО-02-24)
## Футболикс - сайт для любителей футбола
### Главная страница сайта
![Главная страница](https://github.com/user-attachments/assets/3feda39e-5ad8-4457-ad2a-567f5fcb29cd)
### Страница футбольного клуба "Барселона"
![Страница футболбного клуба](https://github.com/user-attachments/assets/f8b03f60-4a8c-454b-a865-a969f3db1215)

### Страница теста
![Страница теста](https://github.com/user-attachments/assets/28bd7047-8bbf-426a-a2b8-47f7d4c66427)

### Страница ошибки 404
![Ошибка 404](https://github.com/user-attachments/assets/03ce178c-1630-4aa3-9b11-c7967d23e79c)

### server.js
```
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'trpo',
  password: '*********',
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
```
