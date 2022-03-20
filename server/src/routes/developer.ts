import Cryptr from "cryptr";
import { Router } from "express";
import isLoggedIn from "../middleware/login";
import { getCookie } from "../utils/cookie";
import { genSecret } from "../utils/crypto";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";

const secret = process.env.SECRET || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const router = Router();
const cryptr = new Cryptr(secret);

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const token = await getCookie(req);

    if (!token) {
      return res.status(401).json({
        error: "No token provided."
      });
    }

    const id = (await verifyAccessToken(token)) as string;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User does not exist."
      });
    }

    const clientId = cryptr.encrypt(user.id);
    const secret = genSecret();

    const key = await prisma.key.create({
      data: {
        clientId,
        clientSecret: secret,
        owner: {
          connect: {
            id
          }
        }
      }
    });

    console.log(key);
    return res.json({
      error: false,
      message: "Key generated",
      key
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/test", isLoggedIn, (req, res) => {
  return res.json({
    error: false,
    message: "Key generated",
    key: "test"
  });
});

export default router;
