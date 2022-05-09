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
    // const posts = await Post.find({ take: 10 });
    let posts = await prisma.post.findMany({
      where: {
        ownerId: id
      }
    });
    posts = posts.sort((p1: Post, p2: Post) => {
      return p1.updatedAt.getSeconds() - p2.updatedAt.getSeconds();
    });

    return res.json({
      error: false,
      message: "Posts fetched",
      posts
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
