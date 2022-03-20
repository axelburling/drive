import Cryptr from "cryptr";
import { NextFunction, Request, Response } from "express";
import { getCookie } from "../utils/cookie";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";

const secret = process.env.SECRET || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const cryptr = new Cryptr(secret);

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const { clientid, clientsecret } = req.headers;
  console.log(clientid, clientsecret);

  if (clientid || clientsecret) {
    if (typeof clientid === "string" && typeof clientsecret === "string") {
      const id = cryptr.decrypt(clientid);

      const user = await prisma.user.findUnique({
        where: { id },
        include: { apikeys: true }
      });
      if (!user) {
        return res.status(401).json({
          error: true,
          message: "User does not exist."
        });
      }

      if (!(user.id === id)) {
        return res.status(401).json({
          error: true,
          message: "Invalid token."
        });
      }

      const key = user.apikeys.find((key) => {
        // console.log(key);
        if (key.clientSecret === clientsecret && key.clientId === clientid) {
          return true;
        }
        return false;
      });

      console.log(key);

      if (!key || key.clientSecret !== clientsecret) {
        return res.status(401).json({
          error: true,
          message: "Invalid input"
        });
      } else {
        await prisma.apiKey.update({
          where: {
            id: key.id
          },
          data: {
            usage: key.usage + 1
          }
        });
      }

      next();
    }
  } else {
    const token = await getCookie(req);
    if (!token) {
      return res.status(401).json({
        error: "No token provided."
      });
    }

    if (typeof token === "string") {
      const userID = await verifyAccessToken(token);
      if (!userID || typeof userID !== "string") {
        return res.status(401).json({
          error: "Invalid token."
        });
      }
      const user = await prisma.user.findUnique({ where: { id: userID } });

      if (!user) {
        return res.status(401).json({
          error: "User does not exist."
        });
      }
      next();
    }
  }
};

export default isLoggedIn;
