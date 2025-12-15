const Article = require("../repositories/articles.repo");

async function getAllArticles(query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.tag) filter.tags = query.tag;
  if (query.q) {
    filter.$or = [
      { title: { $regex: query.q, $options: "i" } },
      { content: { $regex: query.q, $options: "i" } },
    ];
  }

  const articles = await Article.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Article.countDocuments(filter);
  return { page, limit, total, results: articles };
}

// UPDATE: Menerima parameter `user` untuk simpan Author ID
async function createArticle(data, user) {
  const article = new Article({
    ...data,
    author: user.email,     // Simpan email pembuat
    authorId: user.id,      // Simpan ID pembuat (PENTING untuk cek kepemilikan)
  });
  return await article.save();
}

// UPDATE: Cek apakah yang edit adalah Owner atau Admin
async function updateArticle(id, data, user) {
  const article = await Article.findById(id);
  if (!article) return null;

  // Cek Kepemilikan
  const isOwner = article.authorId === user.id;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    const err = new Error("Forbidden: You are not the owner");
    err.statusCode = 403;
    throw err;
  }

  Object.assign(article, data);
  return await article.save();
}

// BARU: Fitur Hapus
async function deleteArticle(id) {
  return await Article.findByIdAndDelete(id);
}

module.exports = { getAllArticles, createArticle, updateArticle, deleteArticle };