import express from "express";
import cookieParser from 'cookie-parser'
import logging from "../config/logger";
import { connectDB } from "./utils/DB";
import Router from "./routes/router";
import AdminRouter from "./routes/admin";
import OtpRouter from './routes/otpRouter'
import cors from "cors";
import Session from "./middleware/session.middleware";
import corsOption from "../config/corsOption";
import errorHandler from "./utils/errorHandler";
import credentials from "./middleware/credentials";
import logger from "./middleware/logEvents.middleware";
import config from '../config/config'
import dot from 'dotenv'
import path from "path";
dot.config()
// init express variable to app =====================
const app = express();


// databse connection =================================
connectDB();


// logger for file ====================================
app.use(logger.logger)

const NAMESPACE = "server";

// body parser =======================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(credentials)

// cookie parser =======================================
app.use(cookieParser())

// Policy ============================================
app.use(cors(corsOption));

// logger for console =================================
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

// session ============================================
Session(app);
// Public router ======================================
Router(app);
// otp router =========================================
OtpRouter(app)
// Admin router =======================================
AdminRouter(app);


// invalid url handling ===============================
app.use('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname + '/templates/404.html'))
  res.emit('close')
});

let server;

// handle server crash ===============================
errorHandler(server, app);


app.use(function (err: any, res: express.Response) {
  console.log(err.message)
  logger.logEvents(err.message, 'serverInternalError.txt')
  return res.status(500).json(err.message)
})

server = app.listen(config.port, () => {
  console.log(`------ Server start on port ${config.port} ------`)
})
