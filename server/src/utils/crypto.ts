import { randomBytes } from "crypto";

const genSecret = ({ length = 45 }: { length?: number }) => {
  return randomBytes(length)
    .toString("base64")
    .replace("a", randomBytes(5).toString("base64"));
};

export { genSecret };
