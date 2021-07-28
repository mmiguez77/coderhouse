import dotenv from 'dotenv'
dotenv.config()

export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const PORT = process.env.PORT;
export const CEL_PHONE_NUMBER = process.env.CEL_PHONE_NUMBER;

export default PORT;