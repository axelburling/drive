import { Request, Response, Router } from "express";
import fs from "fs";
import Jimp from "jimp";
import path from "path";
import isLoggedIn from "../middleware/login";
import { getCookie } from "../utils/cookie";
import isImage from "../utils/is-image";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";

const router = Router();

router.post(
  "/avatarUpload",
  isLoggedIn,
  async (req: Request, res: Response) => {
    try {
      const token = await getCookie(req);
      const id = (await verifyAccessToken(token)) as string;
      console.log(req.files);

      if (!req.files || !req.files.avatar) {
        return res.json({
          error: true,
          message: "No file uploaded"
        });
      }

      const avatar = req.files.avatar;
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      });

      if (!user || !user.avatar) {
        if (!fs.existsSync(`./drive/${id}/meta`)) {
          fs.mkdirSync(`./drive/${id}/meta`);
        } else {
          fs.readdirSync(`./drive/${id}/meta`).map((file) => {
            fs.unlink(`./drive/${id}/meta/${file}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
        }
      }

      if (!Array.isArray(avatar)) {
        if (!isImage(avatar.name)) {
          return res.json({
            error: true,
            message: "File is not an image"
          });
        }
        await avatar.mv(
          `./drive/${id}/meta/temp-${avatar.md5}${path.extname(avatar.name)}`
        );

        await (
          await Jimp.read(
            `./drive/${id}/meta/temp-${avatar.md5}${path.extname(avatar.name)}`
          )
        )
          .resize(64, 64)
          .write(
            `./drive/${id}/meta/${avatar.md5}${path.extname(avatar.name)}`,
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );

        fs.unlinkSync(
          `./drive/${id}/meta/temp-${avatar.md5}${path.extname(avatar.name)}`
        );

        if (user) {
          const user = await prisma.user.update({
            where: {
              id
            },
            data: {
              avatar: `${req.protocol}://${req.hostname}:${
                process.env.SERVER_PORT
              }/api/users/avatar/${avatar.md5}${path.extname(avatar.name)}`
            }
          });
          return res.json({
            error: false,
            message: "Avatar uploaded",
            user
          });
        }
      } else {
        return res.json({
          error: true,
          message: "Cannot upload multiple files"
        });
      }

      console.log("do we get here?");

      const idk = await prisma.user.update({
        where: {
          id
        },
        data: {
          avatar: `${req.protocol}://${req.hostname}:${
            process.env.SERVER_PORT
          }/api/users/avatar/${avatar.md5}${path.extname(avatar.name)}`
        }
      });

      if (!idk) {
        return res.json({
          error: true,
          message: "Something went wrong"
        });
      }

      return res.json({
        error: false,
        message: "Avatar uploaded",
        user: idk
      });
    } catch (error) {
      console.error(error);
      return res.json({
        error: true,
        message: "Internal server error"
      });
    }
  }
);

router.get("/avatar/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const token = await getCookie(req);

    const uid = (await verifyAccessToken(token)) as string;

    const user = await prisma.user.findUnique({
      where: {
        id: uid
      }
    });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User not found"
      });
    }

    if (
      !fs.existsSync(path.join(__dirname, `../../drive/${user.id}/meta/${id}`))
    ) {
      return res.status(404).json({
        error: true,
        message: "Avatar not found"
      });
    }

    return res.sendFile(
      path.join(__dirname, `../../drive/${user.id}/meta/${id}`)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
});

export default router;
