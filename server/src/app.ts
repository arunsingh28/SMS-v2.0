import express from 'express'
import config from '../config/default'



const port = config.port as number;
const host = config.host as string;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.listen(port,host,()=>{
    console.log(`Server started on port ${port}`);
})