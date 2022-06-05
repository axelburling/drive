type Cash = {
  extensions: { [key: string]: string[] };
  languages: { [key: string]: string[] };
};

const ex = require("./ext.json");
const langs = require("./lang.json");

let cache: Cash = {
  extensions: ex,
  languages: langs,
};

export function extend(ext: string) {
  if (!cache.extensions) cache.extensions = ex;
  if (!cache.languages) cache.languages = langs;

  ext = normalize(ext);
  if (cache.languages[ext]) {
    return cache.languages[ext][0];
  }
}

function normalize(str: string) {
  if (str.charAt(0) === ".") {
    str = str.slice(1);
  }
  return str.toLowerCase();
}
