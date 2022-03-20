import jwt from "jsonwebtoken";

const test_key =
  "500d810ac0a90ed49c16029f8b5925a4c38c758502321b225e4f8aac1c9934d09410ed79587b4fb000ea8be681866307f46948eca1bfb3f644e8a1af74198d9b";

const createAccessToken = (userID: string) => {
  return jwt.sign({ userID }, test_key, {
    expiresIn: "25d"
  });
};

const createRefreshToken = (userID: string) => {
  return jwt.sign({ userID }, test_key, {
    expiresIn: "30min"
  });
};

const verifyAccessToken = (
  token: string
): Promise<string | jwt.JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, test_key, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        if (!decoded) {
          reject("Invalid token");
        } else if (typeof decoded === "string") {
          resolve(decoded);
        } else {
          resolve(decoded.userID);
        }
      }
    });
  });
};

export { createAccessToken, createRefreshToken, verifyAccessToken };
