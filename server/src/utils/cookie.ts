import { Request, Response } from "express";

const getCookie = (req: Request): string | undefined => {
  const token = req.cookies["sid"];
  if (token) {
    return (token);
  }
};

const setCookie = (req: Request, res: Response, token: string) => {
  const cookie = req.cookies["sid"];

  if (cookie !== token) {
    res.cookie("sid", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
  } else if (!cookie) {
    res.cookie("sid", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
  } else {
    return;
  }
};

export { getCookie, setCookie };
