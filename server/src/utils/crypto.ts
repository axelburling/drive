import { randomBytes } from "crypto";

const genSecret = () => {
  return randomBytes(45)
    .toString("base64")
    .replace("a", randomBytes(5).toString("base64"));
};

export { genSecret };
