import twilio from 'twilio';

const acctSid = 'AC4b274ff5fa7677d9cc588c84315fbb12'
const authToken = 'eb44d78b089676ee73ea6d3f00ca2a2f'
const twilioClient = twilio(acctSid, authToken)

/* -------------------- SMS ---------------------- */
export async function twilioSms(body) {
    try {
        await twilioClient.messages.create({ 
            from: '+12695808122', 
            body: body,  
            to: '+5411' /*escribir el número, ej +5411cel*/
        })
            .then((message) => console.log(message.sid));
    }
    catch (error) {
        console.log(error)
    }
}

/* -------------------- WAPP ---------------------- */
export async function twilioWapp(body) {
    try {
        await twilioClient.messages.create({
            from: 'whatsapp:+14155238886',
            body: body || 'Este es un whatsapp desde twilio',
            to: 'whatsapp:+54911'/*escribir el número, ej +54911cel*/
        })
            .then((message) => console.log(message.sid));
    }
    catch (error) {
        console.log(error)
    }
}
