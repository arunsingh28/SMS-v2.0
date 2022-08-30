import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'

const logEvents = async (message: string | undefined, fileName: string) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    const logMessage = `${dateTime}\t ${uuid()}\t - ${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '../../logs'))) {
            fs.mkdirSync(path.join(__dirname, '../../logs'))
        }
        fs.appendFile(path.join(__dirname, '../../logs', fileName), logMessage, (err) => {
            if (err) throw err
        });
    }
    catch (err) {
        console.log(err)
    }
}

const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method} ${req.path}`, 'reqLog.txt')
    next()
}

export default { logEvents, logger }