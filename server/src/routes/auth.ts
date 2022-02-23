import { compare, genSalt, hash } from "bcryptjs";
import { Router } from "express";
import * as fs from "fs";
import * as yup from "yup";
<<<<<<< HEAD
import { getCookie, setCookie } from "../utils/cookie";
import { createAccessToken, verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";
=======
import { User } from "../entity/User";
import { createAccessToken } from "../utils/jwt";
>>>>>>> 060e48e (initial commit)

const router = Router();

const registerSchema = yup.object().shape({
<<<<<<< HEAD
  n: yup.string().min(3).max(255).required(),
  p: yup.string().min(3).max(255).required(),
  e: yup.string().min(3).max(255).email().required()
});

const loginSchema = yup.object().shape({
  e: yup.string().email().max(255).required(),
  p: yup.string().min(6).max(255).required()
=======
  name: yup.string().min(3).max(255).required(),
  password: yup.string().min(3).max(255).required(),
  email: yup.string().min(3).max(255).email().required()
});

const loginSchema = yup.object().shape({
  email: yup.string().email().max(255).required(),
  password: yup.string().min(6).max(255).required()
>>>>>>> 060e48e (initial commit)
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

<<<<<<< HEAD
    const { n, e, p } = registerSchema.validateSync(
      { n: name, e: email, p: password },
=======
    registerSchema.validateSync(
      { name, email, password },
>>>>>>> 060e48e (initial commit)
      { abortEarly: false }
    );

    const [userByEmail, userByName] = await Promise.all([
<<<<<<< HEAD
      // User.findOne({ email: email }),
      prisma.user.findFirst({ where: { email: e } }),
      prisma.user.findFirst({ where: { name: n } })
      // User.findOne({ name: name })
=======
      User.findOne({ email: email }),
      User.findOne({ name: name })
>>>>>>> 060e48e (initial commit)
    ]);

    if (userByEmail || userByName) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const salt = await genSalt(Math.floor(Math.random() * 5) + 10);

<<<<<<< HEAD
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
=======
    const hashedPassword = await hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    }).save();

    fs.mkdir(`./drive/${user.id}`, null, (err) => {
      if (err) {
        console.log(err);
>>>>>>> 060e48e (initial commit)
      }
    });

    const token = createAccessToken(user.id);

<<<<<<< HEAD
    setCookie(req, res, token);

=======
    res.setHeader("x-access-token", token);

    console.log(user);
    console.log(token);
>>>>>>> 060e48e (initial commit)
    return res
      .json({
        error: false,
        message: "User created",
        user,
        token
      })
      .status(200);
  } catch (error) {
<<<<<<< HEAD
    console.error(error);
=======
    console.log(error);
>>>>>>> 060e48e (initial commit)
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
    const { email, password } = req.body;
<<<<<<< HEAD
    const { e, p } = loginSchema.validateSync(
      {
        e: email,
        p: password
=======
    loginSchema.validateSync(
      {
        email,
        password
>>>>>>> 060e48e (initial commit)
      },
      { abortEarly: false }
    );

<<<<<<< HEAD
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
=======
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .json({ message: "user does not exist", error: true })
        .status(401);
    }
    if (await compare(password, user.password)) {
      const token = createAccessToken(user.id);

      res.setHeader("x-access-token", token);

      return res.json({ message: "user logged in", error: false, user, token });
    } else {
      return res.sendStatus(401);
>>>>>>> 060e48e (initial commit)
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

<<<<<<< HEAD
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

=======
>>>>>>> 060e48e (initial commit)
export default router;
