let nodemailer = require('nodemailer');

class User {


    async registerGet(req, res) {
        res.render('register')
    }

    async loginGet(req, res) {
        res.render('login')
    }

    async mainGet(req, res) {
        const userInfo = []
        try {
            let photo = await req.user.photos[0].value;
            let userName = await req.user.displayName;
            let time = Date();
            userInfo.push(await userName, photo);

            let subjet = `User Login at ${time} / User: ${userInfo[0]} `
            let html =
                `<p>The user ${userInfo[0]} has logged in</p>
                 <img src="${userInfo[1]}" alt="userImg" />`

            async function mail(subjet, html) {
                let testAccount = await nodemailer.createTestAccount();

                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    //service: 'gmail',
                    auth: {
                        user: 'blaze.mccullough70@ethereal.email', //'mail de gmail'
                        pass: 'mhb7HJm8pBB8qxgdKc'// 'pass de gmail'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let info = await transporter.sendMail({
                    from: 'blaze.mccullough70@ethereal.email',
                    to: "blaze.mccullough70@ethereal.email",
                    subject: await subjet,
                    text: "",
                    html: await html,
                });
            }


            mail(subjet, html)

            res.render('main')

        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res) {
        const userInfo = []
        try {
            let photo = await req.user.photos[0].value;
            let userName = await req.user.displayName;
            let time = Date();
            userInfo.push(await userName, photo);
            let subjet = `User Logout at ${time} / User: ${userInfo[0]} `
            let html =
                `<p>The user ${userInfo[0]} has logged out</p >
                 <img src="${userInfo[1]}" alt="userImg" />`

            async function mail(subjet, html) {
                let testAccount = await nodemailer.createTestAccount();

                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    //service: 'gmail',
                    secure: false,
                    auth: {
                        user: 'blaze.mccullough70@ethereal.email', //'mail de gmail'
                        pass: 'mhb7HJm8pBB8qxgdKc' // 'pass de gmail'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let info = await transporter.sendMail({
                    from: 'blaze.mccullough70@ethereal.email',
                    to: "blaze.mccullough70@ethereal.email",
                    subject: await subjet,
                    text: "",
                    html: await html,
                });
            }
            mail(subjet, html)

            req.logout();
            res.redirect('/user/login');
        } catch (error) {
            console.log(error);
        }
    }




}

module.exports = User;

