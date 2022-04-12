import Cryptr from "cryptr";
import { Router } from "express";
import path from "path";
import isLoggedIn from "../middleware/login";
import { getCookie } from "../utils/cookie";
import { genSecret } from "../utils/crypto";
import { getHeaders } from "../utils/headers";
import { verifyAccessToken } from "../utils/jwt";
import prisma, { Post } from "../utils/prisma";

const secret = process.env.SECRET || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const cryptr = new Cryptr(secret);
const router = Router();

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

    const key = await prisma.apiKey.create({
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

router.post("/reset", isLoggedIn, async (req, res) => {
  try {
    const token = await getCookie(req);
    const id = (await verifyAccessToken(token)) as string;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User does not exist."
      });
    }

    const { apikey } = req.body;
    // prisma.apiKey.create({
    //   data: {
    //     clientId: apikey.clientId,
    //     clientSecret: apikey.clientSecret,
    //     owner: {
    //       connect: {
    //         id
    //       }
    //     }
    //   }
    // });
    const key = await prisma.apiKey.findFirst({
      where: {
        id: apikey,
        ownerId: id
      }
    });

    if (!key) {
      return res.status(401).json({
        error: true,
        message: "Invalid key."
      });
    }

    const newSecret = genSecret();

    const newkey = await prisma.apiKey.update({
      where: {
        id: key.id
      },
      data: {
        clientSecret: newSecret
      }
    });

    return res.json({
      error: false,
      message: "Key reset",
      key: newkey
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
});

router.get("/test", isLoggedIn, (req, res) => {
  return res.json({
    error: false,
    message: "Key generated",
    key: "test"
  });
});

router.post("/upload", isLoggedIn, async (req, res) => {
  try {
    const { clientid, clientsecret } = await getHeaders(req);

    if (
      !clientid ||
      !clientsecret ||
      typeof clientid !== "string" ||
      typeof clientsecret !== "string"
    ) {
      return res.json({
        error: "No token provided."
      });
    }

    const id = cryptr.decrypt(clientid);

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User does not exist."
      });
    }

    if (!req.files) {
      return res.json({
        error: true,
        message: "No file uploaded"
      });
    }

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
      console.log(posts);
      return res.json({
        error: false,
        message: "Files uploaded",
        posts
      });
    } else if (typeof req.files.files === "object") {
      const { files } = req.files;
      await files.mv(`./drive/${id}/${files.md5}${path.extname(files.name)}`);

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
      console.log("test");
      console.log(post);
      return res.json({
        error: false,
        message: "Files uploaded",
        posts: post
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({ message: "Internal server error", error: true });
  }
});

router.get("/user", isLoggedIn, async (req, res) => {
  try {
    const { clientid, clientsecret } = await getHeaders(req);

    if (
      !clientid ||
      !clientsecret ||
      typeof clientid !== "string" ||
      typeof clientsecret !== "string"
    ) {
      return res.json({
        error: "No token provided."
      });
    }

    const id = cryptr.decrypt(clientid);

    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true, apikeys: true }
    });

    if (!user) {
      return res.json({
        error: true,
        message: "User does not exist."
      });
    }

    return res.json({
      error: false,
      message: "User found",
      user
    });
  } catch (error) {
    console.log("error", error);
    return res.json({ message: "Internal server error", error: true });
  }
});

router.get("/download/:id", isLoggedIn, async (req, res) => {
  try {
    const { clientid, clientsecret } = await getHeaders(req);
    const { id } = req.params;

    if (
      !clientid ||
      !clientsecret ||
      typeof clientid !== "string" ||
      typeof clientsecret !== "string"
    ) {
      return res.json({
        error: "No token provided."
      });
    }

    const userId = cryptr.decrypt(clientid);

    const [user, post] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId }
      }),
      prisma.post.findUnique({
        where: { id: id }
      })
    ]);

    if (!user) {
      return res.json({
        error: true,
        message: "User does not exist."
      });
    }

    if (!post) {
      return res.json({
        error: true,
        message: "Post does not exist."
      });
    }

    if (post.ownerId !== user.id || post.viewers.includes(user.id)) {
      return res.status(401).json({
        error: true,
        message: "You do not have permission to download this file."
      });
    }

    res.setHeader("fileending", post.url.split(".")[1]);

    return res
      .status(200)
      .sendFile(
        path.join(
          __dirname,
          `../../drive/${post.ownerId}/${post.url.split("/")[6]}`
        )
      );
  } catch (error) {
    console.log("error", error);
    return res.json({ message: "Internal server error", error: true });
  }
});

router.get("/posts", isLoggedIn, async (req, res) => {
  const { clientid, clientsecret } = await getHeaders(req);

  if (
    !clientid ||
    !clientsecret ||
    typeof clientid !== "string" ||
    typeof clientsecret !== "string"
  ) {
    return res.json({
      error: "No token provided."
    });
  }

  const id = cryptr.decrypt(clientid);

  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true }
  });

  if (!user) {
    return res.json({
      error: true,
      message: "User does not exist."
    });
  }

  return res.json({
    error: false,
    message: "Posts found",
    posts: user.posts
  });
});

export default router;
