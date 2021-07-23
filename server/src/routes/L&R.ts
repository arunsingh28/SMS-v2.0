import express from 'express'
import login_contollers from '../controllers/L&R'
const loginAPI = express.Router()

loginAPI.post('/login', login_contollers.login)
loginAPI.post('/register', login_contollers.register)

export default loginAPI