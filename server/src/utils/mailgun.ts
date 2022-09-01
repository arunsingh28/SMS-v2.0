import mailgun from 'mailgun-js'
import env from '../../config/envConfig'


// init mailgun-js
const mail = new mailgun({
    apiKey: env.MAILGUN_API_KEY,
    domain: env.MAILGUN_DOMAIN
})


// creating message
const mailGun = async (to: string, subject: string, body: string) => {
    const data = {
        from: 'arunsingh28aug.as@gmail.com',
        to,
        subject,
        text: body
    }
    mail.messages().send(data, (err, data) => {
        if (err) throw err;
        console.log(data)
    })
}




export default mailGun