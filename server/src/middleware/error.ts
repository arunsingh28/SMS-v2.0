import ErrorRespose from '../utils/errorResponse'

const handleError = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message

    if (err.code === 11000) {
        const message: string = "Duplicate value"
        error = new ErrorRespose(message, 400)
    }
    if (err.name === 'ValidationError') {
        const message: any = Object.values(err.errors).map((val) => val)
        error = new ErrorRespose(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server error from error.ts'
    })
}

export default handleError