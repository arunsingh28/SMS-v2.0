import express from "express";
import config from "../config/config";
import logging from "../config/logger";
import { connectDB } from "./utils/DB";
import Router from "./routes/router";
import Cors from "cors";
import Session from "./middleware/session.middleware";

// init express variable to app =====================
const app = express();

const NAMESPACE = "server";

// body parser =======================================
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// databse connection =================================
connectDB();

// Policy =================================
app.use(Cors());

// logger =============================================
app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// proxy ==============================================
// app.set("trust proxy", 1);

// session ============================================
Session(app);

// inti router ========================================
Router(app);

// Admin router ========================================
// app.use("/admin/v1", require("./routes/admin"));

// invalid url handling ===============================
app.use((req, res, next) => {
  const error = new Error("Page not found");
  return res
    .status(404)
    .json({ message: error.message, statusCode: res.statusCode });
});

// server start ======================================
const server = app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

// handle server crash ===============================
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`logged Error: ${err}`);
//   server.close(() => process.exit(1));
// });
