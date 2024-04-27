const express = require("express");

const methodOverride = require('method-override');
const app = express();
const pool = require('./db');

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));


// 追加：DELETEを扱うため？
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

// ホームページのルーティング
app.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY id DESC');
  res.render('index', { posts: rows });
});

// 投稿の作成ルーティング
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  await pool.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content]);
  res.redirect('/');
});

// 投稿の削除ルーティング
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log('Server is running on port 4000');
})