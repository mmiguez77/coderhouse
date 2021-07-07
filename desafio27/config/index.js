import dotenv from 'dotenv';
dotenv.config()

export default {
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    PORT: process.env.PORT 
}