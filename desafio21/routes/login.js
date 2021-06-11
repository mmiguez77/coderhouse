import express from 'express';
const sessionRoutes = express.Router();


sessionRoutes.get('/', (req, res) => {
    res.render('log');
})

sessionRoutes.get('/login', (req, res) => {
    if(!req.query.name){
        res.send('Error en el login')
    } else {
        let name = req.query.name
        req.session.name = req.query.name;
        
        res.render('login', {name: name})
    }
})

sessionRoutes.get('/logout', (req, res) => {
    req.session.destroy();
    let name = req.query.name
    res.render('logout', {name: name})
})

export default sessionRoutes;