import twilio from 'twilio'
import configEnv from '../../config/envConfig'

const accountSid = configEnv.T_ACCOUNTSID
const authToken = configEnv.T_AUTH_TOKEN

const client = twilio(accountSid, authToken)
const sms = () => {
    client.messages.create({
        body: 'or kisi ho mini tumari yaad aa rahi hai vapas aa jao na',
        from: '+16512996119',
        to: '+917983613144'
    }).then((res) => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })

}

export default sms