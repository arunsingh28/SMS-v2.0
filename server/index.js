const express = requrie('express')
const app = express()


app.listen(process.env.PORT || 8080,()=>{
	console.log('server is up on port:8080)
})
