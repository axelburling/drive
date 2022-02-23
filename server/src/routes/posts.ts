<<<<<<< HEAD
import Cryptr from "cryptr";
import { Router } from "express";
import fs from "fs";
import * as path from "path";
import isLoggedIn from "../middleware/login";
import { getCookie } from "../utils/cookie";
import { getHeaders } from "../utils/headers";
import { verifyAccessToken } from "../utils/jwt";
import prisma, { Post } from "../utils/prisma";

const router = Router();

const secret = process.env.SECRET || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const cryptr = new Cryptr(secret);

router.post("/upload", isLoggedIn, async (req, res) => {
  try {
    let id: string;
    const { clientid, clientsecret } = getHeaders(req);
    const token = await getCookie(req);

    if (
      !token &&
      !clientid &&
      !clientsecret &&
      clientid.length === 0 &&
      clientsecret.length === 0 &&
      typeof token !== "string"
    ) {
      console.log("No token provided.");
      return res.json({
=======
import { Router } from "express";
import * as path from "path";
import { Post } from "../entity/Post";
import isLoggedIn from "../middleware/login";
import { verifyAccessToken } from "../utils/jwt";

const router = Router();

router.post("/upload", isLoggedIn, async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({
>>>>>>> 060e48e (initial commit)
        error: "No token provided."
      });
    }

<<<<<<< HEAD
    if (clientid) {
      id = cryptr.decrypt(clientid);
      console.log(id);
    } else {
      id = (await verifyAccessToken(token)) as string;
    }
=======
    if (typeof token !== "string") {
      return res.status(401).json({
        error: "Invalid token."
      });
    }
    const id = (await verifyAccessToken(token)) as string;
>>>>>>> 060e48e (initial commit)

    if (!req.files) {
      return res.json({
        error: true,
        message: "No file uploaded"
      });
    }

<<<<<<< HEAD
    console.log(req.files);
    if (Array.isArray(req.files.files)) {
      const posts: Post[] = [];
      req.files.files.map(async (file) => {
        await file.mv(`./drive/${id}/${file.md5}${path.extname(file.name)}`);
        const post = await prisma.post.create({
          data: {
            url: `${req.protocol}://${req.hostname}:${
              process.env.SERVER_PORT
            }/api/posts/drive/${file.md5}${path.extname(file.name)}`,
            name: file.name,
            owner: {
              connect: {
                id
              }
            }
          }
        });
        posts.push(post);
      });
      return res.status(200).json({
=======
    console.log(req.files.files);

    if (Array.isArray(req.files.files)) {
      const posts: Post[] = [];
      req.files.files.map(async (file) => {
        const post = await Post.create({
          ownerId: id,
          url: `${req.protocol}://${req.hostname}:${
            process.env.SERVER_PORT
          }/drive/${id}/${file.md5}${path.extname(file.name)}`,
          createdAt: Date.now().toString()
        }).save();
        posts.push(post);
      });
      console.log(posts);
      return res.json({
>>>>>>> 060e48e (initial commit)
        error: false,
        message: "Files uploaded",
        posts
      });
    } else if (typeof req.files.files === "object") {
<<<<<<< HEAD
      const { files } = req.files;
      await files.mv(`./drive/${id}/${files.md5}${path.extname(files.name)}`);
      console.log("get here");
      const post = await prisma.post.create({
        data: {
          url: `${req.protocol}://${req.hostname}:${
            process.env.SERVER_PORT
          }/api/posts/drive/${files.md5}${path.extname(files.name)}`,
          name: files.name,
          owner: {
            connect: {
              id
            }
          }
        }
      });
      return res.status(200).json({
=======
      const file = req.files.files;
      const post = await Post.create({
        ownerId: id,
        url: `${req.protocol}://${req.hostname}:${
          process.env.SERVER_PORT
        }/drive/${id}/${file.md5}${path.extname(file.name)}`,
        createdAt: Date.now().toString()
      }).save();
      console.log(post);
      return res.json({
>>>>>>> 060e48e (initial commit)
        error: false,
        message: "Files uploaded",
        posts: post
      });
    }
  } catch (error) {
<<<<<<< HEAD
    console.log("error", error);
=======
>>>>>>> 060e48e (initial commit)
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
});

<<<<<<< HEAD
router.get("/drive/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const token = await getCookie(req);
=======
router.get("/file/:id", isLoggedIn, async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
>>>>>>> 060e48e (initial commit)

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
    const userID = (await verifyAccessToken(token)) as string;
<<<<<<< HEAD
=======
    const id = req.params.id;
>>>>>>> 060e48e (initial commit)

    if (!id) {
      return res
        .status(400)
        .json({ message: "No file id provided", error: true });
    }

<<<<<<< HEAD
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      return res.status(404).json({ message: "No posts found", error: true });
    }

    if (post.viewers) {
      if (post.ownerId === userID || post.viewers.includes(userID)) {
        return res.sendFile(path.join(`../../drive/${post.ownerId}/${id}`));
      } else {
        return res.status(403).json({
          message: "You are not authorized to view this file",
          error: true
        });
      }
    } else {
      if (post.ownerId === userID) {
        return res.sendFile(
          path.join(__dirname, `../../drive/${userID}/${id}`)
        );
      } else {
        return res.status(403).json({
          message: "You are not authorized to view this file.",
          error: true
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/addViewer/:id", isLoggedIn, async (req, res) => {
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

    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "No post id provided", error: true });
    }

    const { viewer } = req.body;

    if (!viewer) {
      return res
        .status(400)
        .json({ message: "No viewer provided", error: true });
    }

    const [post, user, isUser] = await Promise.all([
      prisma.post.findUnique({
        where: {
          id: req.params.id
        }
      }),
      prisma.user.findUnique({
        where: {
          id
        }
      }),
      prisma.user.findUnique({
        where: {
          id: viewer
        }
      })
    ]);

    if (!post) {
      return res
        .status(400)
        .json({ message: "No post found with the provided id", error: true });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with your user id", error: true });
    }

    if (!isUser) {
      return res
        .status(400)
        .json({ message: "No user found with the provided id", error: true });
    }

    if (post.ownerId !== user.id) {
      return res
        .status(400)
        .json({ message: "You are not the owner of this post", error: true });
    }

    if (!post.viewers) {
      const p = await prisma.post.update({
        where: { id: post.id },
        data: {
          viewers: {
            push: isUser.id
          }
        }
      });
      return res.status(200).json({
        user,
        message: "user added to followers",
        error: false,
        post: p
      });
    } else {
      if (post.viewers.includes(id)) {
        return res
          .status(400)
          .json({ message: "You have already viewed this post", error: true });
      } else {
        const p = await prisma.post.update({
          where: { id: post.id },
          data: { viewers: { push: isUser.id } }
        });

        return res.status(200).json({
          user,
          message: "user added to followers",
          error: false,
          post: p
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/addFolder", async (req, res) => {
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

    if (!req.body.name) {
      return res
        .status(400)
        .json({ message: "No folder name provided", error: true });
    }

    const pathToDir = path.join(
      __dirname,
      `../../drive/${id}/${req.body.name}`
    );

    fs.mkdir(pathToDir, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Folder already exists", error: true });
      }
      return res.status(200).json({
        message: "Folder created",
        error: false
      });
    });
=======
    return res.sendFile(path.join(__dirname, `../../drive/${userID}/${id}`));
>>>>>>> 060e48e (initial commit)
  } catch (error) {
    console.log(error);
  }
});

export default router;
