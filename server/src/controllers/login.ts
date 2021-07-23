import jwt from "jsonwebtoken";

declare var process:{
    env: {
        JWT_SECRET_KEY: string,
        JWT_EXPIRE_TIME: number
    }
}


console.log(process.env.JWT_EXPIRE_TIME)

// creating jsonwebtoken

const getToken = async (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        // in what time token expire
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}





const login = async (req: any, res: any, next: any) => {
    await getToken(req.body)
    return res.json({ message: 'hello' })

}















const LOGIN_API = {
    login
}

export default LOGIN_API