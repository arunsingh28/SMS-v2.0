export default function forgotPassword(name: string, otp: number, profile: string) {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:20px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Forgot password OTP</a>
      </div>
      <p style="font-size:1.1em">Hi, ${name}</p><br>
      <img width="100px" height="100px" src="${profile}" alt="${name+' profile img'}"/>
      <p>This is your forgot password OTP. Kindly do not share your OTP with anyone.<br>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <br>
      If you did not start this process, please contact Mailgun Support immediately at help@sms.com.
      <br><br>Thanks, SMS Team
      </p>
      <p style="font-size:0.9em;">Regards,<br />SMS support</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#454545;font-size:0.8em;line-height:1;font-weight:300">
        <p>SMS</p>
        <p>Law gate Kiran PG</p>
        <p>India</p>
      </div>
    </div>
  </div>`
}