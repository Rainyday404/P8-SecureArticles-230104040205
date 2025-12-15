const { ok, created } = require("../utils/response");
const ArticleService = require("../services/articles.service");
const { toArticleDTO, toArticleListDTO } = require("../utils/articles.dto");

async function listArticles(req, res, next) {
  try {
    const result = await ArticleService.getAllArticles(req.query);
    return ok(res, toArticleListDTO(result));
  } catch (err) {
    next(err);
  }
}

// Update: Kirim req.user ke service
async function createArticle(req, res, next) {
  try {
    const article = await ArticleService.createArticle(req.body, req.user);
    return created(res, toArticleDTO(article));
  } catch (err) {
    next(err);
  }
}

// Update: Kirim req.user ke service untuk cek owner
async function updateArticle(req, res, next) {
  try {
    const article = await ArticleService.updateArticle(req.params.id, req.body, req.user);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    return ok(res, toArticleDTO(article), "Updated");
  } catch (err) {
    next(err);
  }
}

// Baru: Delete
async function deleteArticle(req, res, next) {
  try {
    const deleted = await ArticleService.deleteArticle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    return res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
}

module.exports = { listArticles, createArticle, updateArticle, deleteArticle };