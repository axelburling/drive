import { Router } from "express";
import { io, redis } from "../index";
import { ApiKey, Post, User } from "../utils/prisma";

interface IUser extends User {
  apikeys: ApiKey[];
  posts: Post[];
}
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { token, user }: { token: string; user: IUser } = req.body;
    if (!token || !user) {
      return res.status(400).send("No token or user");
    }
    const s = await redis["get"](token, (err, id) => {
      if (err) {
        return res.status(500).json(err.message);
      }
      if (!id) {
        return res.status(401).json("Invalid token");
      }
      return id;
    });
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
        message: "Something went wrong when sending the data to the client"
      });
    }
    const isDeleted = await redis["del"](token);
    if (!isDeleted || isDeleted === 0) {
      return res.status(500).json({
        error: true,
        message: "Could not terminate socket"
      });
    }
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
