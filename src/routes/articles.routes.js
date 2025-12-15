const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware"); // Gembok Login
const requireRole = require("../middlewares/role.middleware"); // Gembok Role

const {
  createArticleSchema,
  updateArticleSchema,
  listArticlesSchema,
} = require("../utils/articles.validation");

const {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles.controller");

// 1. PUBLIC (Bisa diakses siapa saja)
router.get("/", validate(listArticlesSchema), listArticles);

// 2. PROTECTED (Harus Login)
// Hanya User & Admin yang boleh buat
router.post(
  "/",
  verifyToken,
  requireRole("user", "admin"),
  validate(createArticleSchema),
  createArticle
);

// Hanya Owner/Admin yang boleh edit (dicek di service)
router.put(
  "/:id",
  verifyToken,
  validate(updateArticleSchema),
  updateArticle
);

// Hanya ADMIN yang boleh hapus
router.delete(
  "/:id",
  verifyToken,
  requireRole("admin"),
  deleteArticle
);

module.exports = router;