
import express from 'express';
import logging from './config/logging';
import config from './config/config';

const NAMESPACE = 'server';
const router = express();


router.use((req, res, next) => {
    logging.info(NAMESPACE,`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish',()=>{
        logging.info(NAMESPACE,`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - ${res.statusCode}`);
    })

    next()
})


router.use(express.urlencoded({ extended: false }))
router.use(express.json())

// routes ===========================================================



// error handling ====================================================
router.use((req, res, next) => {
    const err = new Error('Not Found');
    return res.status(404).json({ message: err.message });
})


// create server ====================================================

router.listen(config.server.port,() => {
    logging.info(NAMESPACE, `Server listening on ${config.server.hostname}:${config.server.port}`, )
})
