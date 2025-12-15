const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinoHttp = require("pino-http");
const logger = require("./utils/logger");
const correlationId = require("./middlewares/correlationId.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const { generalLimiter } = require("./middlewares/rateLimit.middleware");

// Import Routes
const systemRoutes = require("./routes/system.routes");
const articlesRoutes = require("./routes/articles.routes");
const authRoutes = require("./routes/auth.routes"); // <-- BARU (1)

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const openapiSpec = YAML.load("./src/docs/openapi.yaml");
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());
app.use(helmet());
app.use(generalLimiter);
app.use(correlationId);

app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      cid: req.correlationId,
      userId: req.user?.id,
    }),
  })
);

// Routes
app.use(systemRoutes);
app.use("/api/auth", authRoutes); // <-- BARU (2) Pasang di URL /api/auth
app.use("/api/articles", articlesRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(notFound);
app.use(errorHandler);

module.exports = app;