#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs";
import { prompt } from "inquirer";
import os from "os";

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
        name: "clientId",
        message: "Client Id",
      },
      {
        type: "input",
        name: "clientSecret",
        message: "Client Secret",
      },
    ]);
    if (fs.existsSync(`${os.homedir()}/adrive.txt`)) {
      fs.unlinkSync(`${os.homedir()}/adrive.txt`);
    }
    fs.writeFileSync(`${os.homedir()}/adrive.txt`, JSON.stringify(ans), {
      encoding: "utf8",
    });
    console.log(ans);
  });

program
  .command("upload")
  .description("Upload a file to the server")
  .argument("<path>", "file to upload")
  .option("-f", "Path to file")
  .option("--file", "Path to file")
  .action((path, options) => {
    if (fs.existsSync(`${os.homedir()}/adrive.txt`)) {
      const ans = JSON.parse(
        fs.readFileSync(`${os.homedir()}/adrive.txt`, {
          encoding: "utf8",
        })
      );
      console.log(ans);
      if (fs.existsSync(path)) {
        console.log(`Uploading ${path}`);
      } else {
        console.log(`${path} does not exist`);
      }
    } else {
      console.log("Please login first");
    }
  });

program.parse();
