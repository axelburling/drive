import { Router } from "express";
import isLoggedIn from "../middleware/login";
import { getCookie } from "../utils/cookie";
import { verifyAccessToken } from "../utils/jwt";
import prisma, { Post } from "../utils/prisma";

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
    let posts = await prisma.post.findMany({
      where: {
        ownerId: id
      },
      take: 15
    });
    posts = posts.sort((p1: Post, p2: Post) => {
      return p1.createdAt.getSeconds() - p2.createdAt.getSeconds();
    });

    return res.json({
      error: false,
      message: "Posts fetched",
      posts
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
});

export default router;
