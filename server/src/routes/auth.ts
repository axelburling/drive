import { compare, genSalt, hash } from "bcryptjs";
import { Router } from "express";
import * as fs from "fs";
import * as yup from "yup";
import { getCookie, setCookie } from "../utils/cookie";
import { createAccessToken, verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";

const router = Router();

// const verifiers = new Map<string, string>();

const registerSchema = yup.object().shape({
  n: yup.string().min(3).max(255).required(),
  p: yup.string().min(3).max(255).required(),
  e: yup.string().min(3).max(255).email().required()
});

const loginSchema = yup.object().shape({
  e: yup.string().email().max(255).required(),
  p: yup.string().min(6).max(255).required()
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { n, e, p } = registerSchema.validateSync(
      { n: name, e: email, p: password },
      { abortEarly: false }
    );

    const [userByEmail, userByName] = await Promise.all([
      // User.findOne({ email: email }),
      prisma.user.findFirst({ where: { email: e } }),
      prisma.user.findFirst({ where: { name: n } })
      // User.findOne({ name: name })
    ]);

    if (userByEmail || userByName) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const salt = await genSalt(Math.floor(Math.random() * 5) + 10);

    const hashedPassword = await hash(p, salt);

    const user = await prisma.user.create({
      data: {
        name: n,
        email: e,
        password: hashedPassword
      }
    });

    fs.mkdir(`./drive/${user.id}`, null, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const token = createAccessToken(user.id);

    setCookie(req, res, token);

    // const special = genSecret({ length: 70 }).replace(/[^a-zA-Z0-9 ]/g, "");

    // verifiers.set(special, token);

    // const mail = await sendMail({
    //   to: user.email,
    //   subject: "Verify your email",
    //   encoding: "utf-8",
    //   text: "Verify your email",
    //   html: `<a href="${process.env.FRONTEND_URL}/verify/${special}">Verify your email</a>`
    // });

    // console.log(mail);

    // if (mail.rejected.length > 0) {
    //   console.log(mail.rejected);
    //   await prisma.user.delete({ where: { id: user.id } });
    //   return res.status(500).json({
    //     error: true,
    //     message: "Failed to send email account deleted"
    //   });
    // }

    return res
      .json({
        error: false,
        message: "User created",
        user,
        token
      })
      .status(200);
  } catch (error) {
    console.error(error);
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ message: error.message, error: true });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
    const { e, p } = loginSchema.validateSync(
      {
        e: email,
        p: password
      },
      { abortEarly: false }
    );

    const user = await prisma.user.findFirst({
      where: { email: e },
      include: { posts: false, apikeys: true }
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong password or email", error: true });
    }
    if (await compare(p, user.password)) {
      const token = createAccessToken(user.id);

      setCookie(req, res, token);

      return res.json({ message: "user logged in", error: false, user, token });
    } else {
      return res
        .status(401)
        .json({ message: "Wrong password or email", error: true });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ message: error.errors, error: true });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
});

router.get("/verify/:id", async (req, res) => {
  return res.json("test");
});

router.get("/me", async (req, res) => {
  try {
    const token = await getCookie(req);

    if (!token) {
      return res.status(401).json({
        error: "No token provided."
      });
    }

    if (typeof token !== "string") {
      return res.status(401).json({
        error: "Invalid token."
      });
    }

    const id = (await verifyAccessToken(token)) as string;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true, apikeys: true }
    });
    if (!user) {
      return res.status(400).json({
        error: "No user found with the provided id"
      });
    }

    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);

    return res.json({
      error: false,
      message: "User found",
      user
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("sid");
  return res.json({
    error: false,
    message: "Logged out"
  });
});

export default router;
