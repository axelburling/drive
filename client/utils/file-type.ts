import { IPost } from "../types/types";
import { extend } from "./extend-ext";

const fileTypes = {
  unknown: require("../assets/unknown.png").default.src,
};

function isImage(extension: string) {
  return [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "ico",
    "psd",
    "ai",
  ].includes(extension);
}

function isVideo(extension: string) {
  return [
    "mp4",
    "m4v",
    "mov",
    "avi",
    "wmv",
    "mpg",
    "flv",
    "3gp",
    "mkv",
    "webm",
  ].includes(extension);
}

const postToImage = (post: IPost): any => {
  try {
    const { url } = post;
    const ext = url.slice(url.lastIndexOf(".") + 1, url.length);
    if (isImage(ext)) {
      return "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/image.svg";
    } else if (isVideo(ext)) {
      return "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/video.svg";
    } else if (
      ext.endsWith("script") ||
      ext.endsWith("js") ||
      ext.endsWith("ts")
    ) {
      return `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${extend(
        ext
      )}.svg`;
    } else if (ext.endsWith("sx")) {
      return "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/react.svg";
    } else if (ext) {
      return `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${ext}.svg`;
    } else {
      return fileTypes.unknown;
    }
  } catch (error) {
    console.log(error);
  }
};

export { postToImage };
