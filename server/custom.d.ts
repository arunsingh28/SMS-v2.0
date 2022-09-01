declare global {
    export interface RequestCustome extends Request {
        email?: string
    }
}