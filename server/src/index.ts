import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import morgan from "morgan";
import "reflect-metadata";
import { Server } from "socket.io";
import auth from "./routes/auth";
import cli from "./routes/cli";
import developer from "./routes/developer";
import feed from "./routes/feed";
import posts from "./routes/posts";
import users from "./routes/user";
import { genSecret } from "./utils/crypto";

config();

export const sockets = new Map<string, string>();

// create express app
const app = express();
const server = createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(
  cors({
    origin: (req) => {
      if (!req) {
        return process.env.FRONTEND_URL;
      }
      return req;
    },
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "File is too large"
  })
);

app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/feed", feed);
app.use("/api/users", users);
app.use("/api/developer", developer);
app.use("/api/cli", cli);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const token = genSecret().replace(/[^a-zA-Z0-9 ]/g, "");
  sockets.set(token, socket.id);

  socket.emit("token", { token });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.SERVER_PORT || 3000;

server.listen(port, () =>
  console.log(`Server is running on  http://localhost:${port}`)
);
