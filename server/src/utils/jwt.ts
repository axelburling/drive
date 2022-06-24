import { Request } from 'express';
import * as fs from 'fs';
import jwt from "jsonwebtoken";
import { getCookie } from './cookie';

const privateKey = fs.readFileSync('./keypair.pem').toString('utf8')
export const publicKey = fs.readFileSync('publickey.crt').toString('utf8')


const createAccessToken = (user: { id: string; name: string }) => {
  const token = jwt.sign({ user }, privateKey, {
    expiresIn: "25d",
    algorithm: "RS512"
  });
  return `Bearer ${token}`
};

const createRefreshToken = (userID: string) => {
  return jwt.sign({ userID }, privateKey, {
    expiresIn: "30min",
    algorithm: "RS512"
  });
};

const verifyAccessToken = (
  req: Request
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cookie = getCookie(req)
    if (cookie) {
      jwt.verify(cookie.slice(7, cookie.length) || '', publicKey, (err, decoded) => {
        if (err) {
          console.error(err)
          reject(err);
        } else {
          if (!decoded || typeof decoded === 'string' || typeof decoded.user.id !== 'string') {
            reject("Invalid token");
          } else {
            resolve(decoded.user.id as string);
          }
        }
      });
    } else {
      reject("No authorization header was provided")
    }
  });
};

export { createAccessToken, createRefreshToken, verifyAccessToken };
