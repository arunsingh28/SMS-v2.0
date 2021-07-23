import express from 'express'
import config from '../config/config'
import logging from '../config/logger'


const app = express()


const NAMESPACE = 'server'

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



// routes ======================================
/** 
 * import route file from controller
@param route file

 */

import loginController from './controllers/index'

app.use('/api/login', loginController)




// error handling
app.use((req, res, next) => {
    const error = new Error('Page not found');
    return res.json({message:error.message,statusCode: 404}).status(404);
})

app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
})