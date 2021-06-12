import express from 'express';
const sessionRoutes = express.Router();

function showSession(req) {
    console.log('------------ req.session -------------')
    console.log(req.session)
  
    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)
  
    console.log('----------- req.cookies ------------')
    console.log(req.cookies)
  
    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
  }

sessionRoutes.get('/', (req, res) => {
    res.render('log');
})

sessionRoutes.get('/login', (req, res) => {
    if (!req.query.name) {
        res.send('Error en el login')
    } else {
        showSession(req)
        req.session.name = req.query.name;
        
        res.render('login', { name: req.session.name })
    }
})

sessionRoutes.get('/logout', (req, res) => {
    showSession(req)
    req.session.destroy();
    let name = req.query.name
    res.render('logout', { name: name })
})

export default sessionRoutes;