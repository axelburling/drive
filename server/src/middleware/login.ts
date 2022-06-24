import Cryptr from "cryptr";
import { NextFunction, Request, Response } from "express";
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

    const userID = await verifyAccessToken(req);
    console.log(userID)
    if (!userID || typeof userID !== "string") {
      return res.status(401).json({
        error: "Invalid token type."
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
};

export default isLoggedIn;
