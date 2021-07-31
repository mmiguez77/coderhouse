import dotenv from 'dotenv'
dotenv.config()

export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
export const PORT = process.env.PORT;


export default PORT;