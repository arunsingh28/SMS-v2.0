import { Response, Request } from 'express'

const image = (req: Request, res: Response) => {
    console.log(req.file)
}

export default { image }