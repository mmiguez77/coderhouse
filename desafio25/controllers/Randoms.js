import { fork } from 'child_process';

export default class Random {

    getRandom(req, res) {
        res.render('random');

    }

    async getNumber(req, res) {
        let param = await req.query.number;
        //console.log(param);
        try {
            const child = fork('../desafio25/helpers/n.js');
            child.send('number', parseInt(param) );
            child.on('message', data => res.send(data));
            child.exit();
        } catch (error) {
            console.log(error);
        }
    }



}