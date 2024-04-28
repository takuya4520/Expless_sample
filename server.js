const express = require("express");

const methodOverride = require('method-override');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));


// 追加：DELETEを扱うため？
app.use(methodOverride('_method'));
app.use("/public", express.static("public"));
app.set('view engine', 'ejs');

// ホームページのルーティング
app.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();

  const imageUrl = "/public/img/icon.webp";
  res.render('index', { posts: posts, imageUrl: imageUrl });
});

// 投稿の作成ルーティング
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title: title,
      content: content
    }
  });
  res.redirect('/');
});

// 投稿の削除ルーティング
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('Server is running on port 4000');
})