import { fork } from 'child_process';

export default class Random {

    getRandom(req, res) {
        res.render('random');

    }

    getNumber(req, res) {
        let param = req.query.number;
        //console.log(param);
        try {
            const child = fork('../desafio25/helpers/n.js');
            child.send({number: parseInt(param)} );
            
            child.on('message', data => res.send(data));
            setTimeout( () => { child.disconnect() }, 0 );
        } catch (error) {
            console.log(error);
        }
    }



}