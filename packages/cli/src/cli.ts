#!/usr/bin/env node

import { Command } from "commander";
import fetch, { Headers } from "cross-fetch";
import FormData from "form-data";
import * as fs from "fs";
import { prompt } from "inquirer";
import os from "os";
import path from "path";

export interface IApiKey {
  id: string;
  clientId: string;
  clientSecret: string;
  usage: number;
  createdAt: string;
  ownerId: string;
}

export interface IPost {
  id: string;
  url: string;
  createdAt: string;
  ownerId: string;
  viewers: string[];
  name?: string;
}

const program = new Command();

program
  .name("Adrive")
  .description("CLI to the adrive")
  .version(`v${require("../package.json").version}`);

program
  .command("login")
  .description("Login to the service")
  .action(async () => {
    const ans = await prompt<{ clientId: string; clientSecret: string }>([
      {
        type: "input",
        name: "email",
        message: "email",
      },
      {
        type: "input",
        name: "password",
        message: "password",
      },
    ]);
    const res = await (
      await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ans),
      })
    ).json();

    if (res.error) {
      console.log(res.message);
      return;
    }

    const apikeys: IApiKey[] = res.user.apikeys;

    if (!apikeys || apikeys.length === 0) {
      console.log("No apikeys found");
      return;
    }

    const a = await prompt<{ apikey: IApiKey }>([
      {
        choices: apikeys
          .sort((a, b) => b.usage - a.usage)
          .map((apikey) => {
            return {
              name: `${apikey.clientId.substring(0, 20)} (${
                apikey.usage
              } usage)`,
              value: {
                clientId: apikey.clientId,
                clientSecret: apikey.clientSecret,
              },
            };
          }),
        type: "list",
        name: "apikey",
        message: "apikey",
      },
    ]);

    if (fs.existsSync(`${os.homedir()}/adrive.txt`)) {
      fs.unlinkSync(`${os.homedir()}/adrive.txt`);
    }
    fs.writeFileSync(`${os.homedir()}/adrive.txt`, JSON.stringify(a), {
      encoding: "utf8",
    });

    // add chalk
    console.log("Login successful");
  });

program
  .command("upload")
  .description("Upload a file to the server")
  .argument("<path>", "file to upload")
  .option("-f", "Path to file")
  .option("--file", "Path to file")
  .action(async (path: string, options) => {
    if (fs.existsSync(`${os.homedir()}/adrive.txt`)) {
      const opt: { apikey: { clientId: string; clientSecret: string } } =
        JSON.parse(
          fs.readFileSync(`${os.homedir()}/adrive.txt`, {
            encoding: "utf8",
          })
        );
      if (!opt.apikey || !opt.apikey.clientId || !opt.apikey.clientSecret) {
        console.log(
          "Please login again, Do not touch the file in the home directory that is named adrive.txt"
        );
        return;
      }
      if (fs.existsSync(path)) {
        console.log(`Uploading ${path}`);
        const headers = new Headers();
        const form = new FormData();

        const fileName = path.split("/")[-1];

        form.append("files", fs.createReadStream(path), { filename: fileName });
        headers.append("clientId", opt.apikey.clientId);
        headers.append("clientSecret", opt.apikey.clientSecret);
        const res = await (
          await fetch("http://localhost:4000/api/developer/upload", {
            method: "POST",
            headers,
            body: form as unknown as ReadableStream,
          })
        ).json();
        if (res.error) {
          console.log(res.message);
          return;
        }
        console.log(`file uploaded successfully`);
      } else {
        console.log(`${path} does not exist`);
      }
    } else {
      console.log("Please login first");
    }
  });

program.command("posts").action(async () => {
  if (fs.existsSync(`${os.homedir()}/adrive.txt`)) {
    const opt: { apikey: { clientId: string; clientSecret: string } } =
      JSON.parse(
        fs.readFileSync(`${os.homedir()}/adrive.txt`, {
          encoding: "utf8",
        })
      );
    if (!opt.apikey || !opt.apikey.clientId || !opt.apikey.clientSecret) {
      console.log(
        "Please login again, Do not touch the file in the home directory that is named adrive.txt"
      );
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("clientId", opt.apikey.clientId);
    headers.append("clientSecret", opt.apikey.clientSecret);

    const { posts }: { posts: IPost[] } = await (
      await fetch("http://localhost:4000/api/developer/posts", {
        method: "GET",
        headers,
      })
    ).json();

    posts.map((post) => {
      console.log(
        `${post.name ? post.name : `test${path.extname(post.url)}`} ${post.id}`
      );
    });
  } else {
    console.log("Please login first");
  }
});

program
  .command("download")
  .description("Download a file from the server")
  .argument("<post id>", "file to download")
  .option("-id", "UUID of the post")
  .action(async (id: string, options) => {
    console.log(id);
  });

program.parse();
