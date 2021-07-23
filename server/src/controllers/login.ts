import jwt from "jsonwebtoken";

declare var process: {
    env: {
        JWT_SECRET_KEY: string,
        JWT_EXPIRE_TIME: number
    }
}


// creating jsonwebtoken

const getToken = async (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        // in what time token expire
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}


// interface req {
//     body: string,
//     param
// }


const login = async (req: any, res: any, next: any) => {
    const {id} = req.body
    if (!id) {
        return res.json({message:'please add id'}).status(200)
    } else {
        const token = await getToken(id)
        console.log(token)
        return res.json({ message: 'hello', token })
    }
}















const LOGIN_API = {
    login
}

export default LOGIN_API