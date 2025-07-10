const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'news_site'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MariaDB');
});

app.get('/api/categories', (req, res) => {
  db.query('SELECT name FROM categories', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/articles', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
  db.query(
    'SELECT a.id, a.title, a.summary, c.name AS category, u.username AS author, a.created_at FROM articles a JOIN categories c ON a.category_id = c.id JOIN users u ON a.author_id = u.id ORDER BY a.created_at ' + order + ' LIMIT ? OFFSET ?',
    [limit, offset],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/api/articles/category/:name', (req, res) => {
  const category = req.params.name;
  db.query(
    'SELECT a.id, a.title, a.summary, c.name AS category, u.username AS author, a.created_at FROM articles a JOIN categories c ON a.category_id = c.id JOIN users u ON a.author_id = u.id WHERE c.name = ?',
    [category],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/api/articles/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT a.id, a.title, a.summary, a.content, c.name AS category, u.username AS author, a.created_at FROM articles a JOIN categories c ON a.category_id = c.id JOIN users u ON a.author_id = u.id WHERE a.id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.json(results[0] || {});
      }
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});