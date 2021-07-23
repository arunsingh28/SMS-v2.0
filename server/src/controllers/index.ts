import express from 'express'
const loginRouter = express.Router()

loginRouter.get('/user',(req,res,next)=>{
    res.send('ok')
})


export default loginRouter