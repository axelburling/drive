import { IPost } from "../types/types";

const fileTypes = {
  jpg: "",
  jpeg: "",
  png: "",
  ts: "",
  gif: "",
  svg: "",
  bmp: "",
  tiff: "",
  webp: "",
  ico: "",
  mp4: "",
  mp3: "",
  wav: "",
  json: "",
  js: "",
  jsx: "",
  css: "",
  html: "",
  tsx: "",
  md: "",
  yml: "",
  yaml: "",
  xml: "",
};

const postToImage = (post: IPost) => {
  const { url } = post;
  const ext = url.split(".")[1];
  if (ext) {
    console.log(
      Object.keys(fileTypes).find((key) => {
        if (key === ext) {
          return true;
        }
      })
    );
  }
};

postToImage({
  id: "1",
  url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  name: "google",
  createdAt: "2020-01-01",
  ownerId: "1",
  viewers: ["1", "2"],
});

export { postToImage, fileTypes };
