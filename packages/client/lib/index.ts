import { fetch as f, Headers as H } from "cross-fetch";
import Form from "form-data";
import * as fs from "fs";
import { isNode } from "../utils/is-node";
import { IUser } from "./types";

export class Client {
  private baseUrl = "http://localhost:4000/api/developer";
  private clientId: string;
  private clientSecret: string;
  protected fetch = isNode() ? f : window.fetch;
  protected Headers = isNode() ? H : window.Headers;

  constructor({
    clientId,
    clientSecret,
  }: {
    clientId: string;
    clientSecret: string;
  }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  protected async makeRequest<T>({
    method,
    body,
    action,
    params,
    isJson = true,
  }: {
    method: "POST" | "GET";
    action: string;
    params?: string;
    body?: any;
    isJson?: boolean;
  }): Promise<T> {
    if (isJson) {
      params = params ? `/${params}` : "";
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("clientId", this.clientId);
      headers.append("clientSecret", this.clientSecret);
      const res = await (
        await this.fetch(`${this.baseUrl}/${action}${params}`, {
          method,
          headers: headers,
          body: body,
        })
      ).json();
      console.log(res);
      return res;
    } else {
      const headers = new this.Headers();
      headers.append("clientId", this.clientId);
      headers.append("clientSecret", this.clientSecret);
      const res = await (
        await fetch(`${this.baseUrl}/${action}`, {
          method,
          headers: headers,
          body: body,
        })
      ).json();
      return res;
    }
  }

  public async uploadFile({ file }: { file: File | string }): Promise<void> {
    if (isNode() && typeof file === "string") {
      const f = fs.createReadStream(file);

      const form = new Form();
      form.append("files", f as any, { filename: "favicon" });

      const res = await this.makeRequest({
        method: "POST",
        body: form,
        action: "upload",
        isJson: false,
      });
      console.log(res);
      // return res;
    } else {
      const form = new window.FormData();
      form.append("files", file);

      const res = await this.makeRequest({
        method: "POST",
        body: form,
        action: "upload",
        isJson: false,
      });
      console.log(res);
    }
  }

  public async getUser(): Promise<IUser> {
    const res = await this.makeRequest<IUser>({
      method: "GET",
      action: "user",
    });
    return res;
  }

  public async downloadFile(postId: string): Promise<string> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("clientId", this.clientId);
    headers.append("clientSecret", this.clientSecret);
    const res = await fetch(`${this.baseUrl}/download/${postId}`, {
      method: "GET",
      headers: headers,
      // credentials: "include",
    });

    if (!res.headers.has("fileending")) {
      throw new Error("File ending not found");
    }

    const fileEnding = res.headers.get("fileending");

    const fileName = `${postId}.${fileEnding}`;

    const blob = await res.blob();

    if (isNode()) {
      fs.appendFile(fileName, Buffer.from(await blob.arrayBuffer()), (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link.remove();
    }
    return "File downloaded";
  }
}
