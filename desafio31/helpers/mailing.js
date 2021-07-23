const nodemailer = require ('nodemailer');

function createMail(config) {

  const transporter = nodemailer.createTransport(config);

  return async function sendMail({ to, subject, text, html }) {
    const mailOptions = { from: config.auth.user, to, subject, text, html };
    return await transporter.sendMail(mailOptions)
  }
}

function mailEthereal() {
  return createMail({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'blaze.mccullough70@ethereal.email',
        pass: 'mhb7HJm8pBB8qxgdKc'
    }
  })
}

module.exports = mailEthereal


// const sendMail = mailEthereal()

// const fakeAccount = 'blaze.mccullough70@ethereal.email'
// const subject = process.argv[2] || 'sin asunto'
// const html = process.argv[3] || 'nada para decir'

// const info = await sendMail({
//   to: fakeAccount,
//   subject: subject,
//   html: html
// })

// console.log(info)