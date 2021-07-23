import express from 'express'
import login_contollers from '../controllers/login'
const loginAPI = express.Router()

loginAPI.post('/user', login_contollers.login)


export default loginAPI