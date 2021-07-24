const nodemailer = require('nodemailer');

async function main(subjet, html) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: 'blaze.mccullough70@ethereal.email',
      pass: 'mhb7HJm8pBB8qxgdKc'
    },
    tls: {
        rejectUnauthorized: false
    }
  });
 
  let info = await transporter.sendMail({
    from: 'blaze.mccullough70@ethereal.email', 
    to: "blaze.mccullough70@ethereal.email", 
    subject: subjet, 
    text: "Hello world?", 
    html: html,
  });
}

main().catch(console.error);


// ------- 
// // twilio

// const accountSid = 'AAAAAAAAAAAAAAAAA';
// const authToken = '999999999999999999';

// const twilio = require('twilio');

// const client = twilio(accountSid, authToken);

// const enviarSMS = (mensaje) => { 
//   let rta = client.messages.create({
//           body: mensaje, 
//           from: '+12566009360',
//           to: '+54111234567'
//   })
//   return rta;   
// }
