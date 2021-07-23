import express from 'express'
import bodyParser from 'body-parser'
import config from '../config/config'
import logging from '../config/logger'
import { connectDB } from './utils/DB'
// init express variable to app ==========
const app = express()


const NAMESPACE = 'server'


// body parser ===========================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

connectDB()

// logger ===================================
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
    })
    next()
})


// routes ======================================
import loginRoutes from './routes/login'

app.use('/api/login', loginRoutes)



// error handling ===============================
app.use((req, res, next) => {
    const error = new Error('Page not found');
    return res.json({ message: error.message, statusCode: 404 }).status(404);
})


// server start =================================
app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
})