import { Request } from 'express'
export interface RequestCustome extends Request {
    email: string
}