/** @type {import('next').NextConfig} */
// require('dotenv').config({ path: ./.env.local });
import dotenv from 'dotenv';
dotenv.config({ path: `./.env.local` });
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        port:''
      }
    ]
  },
    env: {
        // Reference a variable that was defined in the .env.* file and make it available at Build Time
        MONGODB_URL: process.env.MONGODB_URL,
      },
};

export default nextConfig;