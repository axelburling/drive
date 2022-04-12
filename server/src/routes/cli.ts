import { Router } from "express";
import { io, sockets } from "../index";
import { ApiKey, Post, User } from "../utils/prisma";

interface IUser extends User {
  apikeys: ApiKey[];
  posts: Post[];
}

const router = Router();

router.post("/", (req, res) => {
  try {
    const { token, user }: { token: string; user: IUser } = req.body;
    console.log(sockets);
    const s = sockets.get(token);
    if (!s) {
      return res.status(400).json({
        error: true,
        message: "Token not found"
      });
    }
    const socket = io.sockets.sockets.get(s);
    if (!socket) {
      return res.status(400).json({
        error: true,
        message: "Invalid token"
      });
    }
    const success = socket.emit("info", { apikeys: user.apikeys });
    if (!success) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong"
      });
    }
    sockets.delete(token);
    return res.json({
      error: false,
      message: "success"
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
});

export default router;
