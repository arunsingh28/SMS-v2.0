import mailgun from 'mailgun-js'

// declare env variabls
declare var process: {
    env: {
        MAILGUN_API_KEY: string,
        MAILGUN_DOMAIN: string
    }
}


// init mailgun-js
const mail = new mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

console.log(process.env.MAILGUN_API_KEY, process.env.MAILGUN_DOMAIN)

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