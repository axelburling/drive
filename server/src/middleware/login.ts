<<<<<<< HEAD
import Cryptr from "cryptr";
import { NextFunction, Request, Response } from "express";
import { getCookie } from "../utils/cookie";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";

const secret = process.env.SECRET || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const cryptr = new Cryptr(secret);

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const { clientid, clientsecret } = req.headers;

  if (clientid || clientsecret) {
    if (typeof clientid === "string" && typeof clientsecret === "string") {
      const id = cryptr.decrypt(clientid);

      const user = await prisma.user.findUnique({ where: { id } });
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

      const key = await prisma.apiKey.findFirst({
        where: {
          clientId: clientid
        }
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - This is a string
      if (!key || key.clientSecret !== clientsecret) {
        return res.status(401).json({
          error: true,
          message: "Invalid token."
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
=======
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { getCookie } from "../utils/cookie";
import { verifyAccessToken } from "../utils/jwt";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req);
  const token = await getCookie(req);
  console.log(token);
  if (!token) {
    return res.status(401).json({
      error: "No token provided."
    });
  }

  if (typeof token === "string") {
    const userID = await verifyAccessToken(token);
    console.log(userID);
    if (!userID || typeof userID !== "string") {
      return res.status(401).json({
        error: "Invalid token."
      });
    }
    const user = await User.findOne({ id: userID });

    if (!user) {
      return res.status(401).json({
        error: "User does not exist."
      });
    }

    console.log(user);
    next();
>>>>>>> 060e48e (initial commit)
  }
};

export default isLoggedIn;
