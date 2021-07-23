import express from 'express'
import config from '../config/config'
import logging from '../config/logger'


const app = express()

// logger
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
    })
    next()
})



app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const NAMESPACE = 'server'



// routes ======================================
/** 
 * import route file from controller
@param route file

 */

import loginController from './controllers/index'

app.use('/api/login', loginController)

app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
})