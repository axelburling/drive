import { Router } from "express";
import isLoggedIn from "../middleware/login";
import { verifyAccessToken } from "../utils/jwt";
import prisma, { Post } from "../utils/prisma";

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
  try {

    // const token = await getCookie(req);

    const id = (await verifyAccessToken(req));
    // const posts = await Post.find({ take: 10 });
    let posts = await prisma.post.findMany({
      where: {
        ownerId: id
      }
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
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
});

router.get("/sharedPosts", isLoggedIn, async (req, res) => {
  try {
    const id = (await verifyAccessToken(req));

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      return res.json({
        error: true,
        message: "User does not exist."
      });
    }

    let posts: Post[] = user.sharedposts.map(post => {
      try {
        return JSON.parse(post)
      } catch (_) {
        console.warn('Not a valid json')
      }
    })

    posts = posts.filter(post => !!post)

    return res.status(200).json({
      error: false,
      message: 'retrived shared posts successfully',
      posts
    })

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
});

export default router;
