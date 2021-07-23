let nodemailer = require('nodemailer');

class User {

    async registerGet(req, res) {
        res.render('register')
    }

    async loginGet(req, res) {
        res.render('login')
    }

    async mainGet(req, res) {
        res.render('main')
    }

    async logout(req, res) {
        let user = res.locals.user
        req.logout();
        const asunto = `User Logout at ${Date.now()} / User: `
        const htmlBody =


        res.redirect('/user/login');
    }

    async mailing(subject, html) {
        function createMail(config) {
            const transporter = nodemailer.createTransport(config);
            return async function sendMail({ to, subject, html }) {
                const mail = { from: config.auth.user, to, subject, html };
                return await transporter.sendMail(mail)
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

        const sendMail = mailEthereal()
                
        const info = await sendMail({
          to: 'blaze.mccullough70@ethereal.email',
          subject: subject,
          html: html
        })


    }

}



module.exports = User;

