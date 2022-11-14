import _user from '../models/user.model'
import { Request, Response } from 'express'
import TOKEN from '../utils/token'

// logni api for emp
const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(401).json({
            message: "please fill all detail",
        });
    }
    const user = await _user.findOne({ email }).exec()
    // if user not found
    if (!user) {
        return res
            .status(203)
            .json({ message: "User not found", code: res.statusCode });
    } else {
        // checking user password
        const isMatch = await user.comparePassword(password);
        if (isMatch === false) {
            return res
                .status(401)
                .json({ message: "Invalid credinitals" });
        } else {
            // sign new access token
            const token = TOKEN.getToken(email);
            // sign new refresh token
            const refreshToken = TOKEN.refreshToken(email);

            // update the refresh token in DB
            await _user.findOneAndUpdate({ email }, {
                $set: { refresh_token: refreshToken }
            })
            // send the accessToken with cookie
            res.cookie('__session_rsh', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            // send data to client
            return res.status(200).json({
                message: "logged in",
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.profile.location,
                },
                accessToken: token,
                code: res.statusCode,
            });
        }
    }
};

// logout api 
const logout = async (req: Request, res: Response) => {
    // on client delte the access token
    const cookie = req.cookies?.__session_rsh
    if (!cookie) return res.sendStatus(204) //no content
    // match refresh token in DB
    const foundUser = await _user.findOne({ refresh_token: cookie }).exec()
    if (!foundUser) {
        res.clearCookie('__session_rsh', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        return res.sendStatus(204)
    }
    // delet refresh token in db
    foundUser.refresh_token = ''
    await foundUser.save();
    res.clearCookie('__session_rsh', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })
    return res.sendStatus(204)
};


export default { login, logout }