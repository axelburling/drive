import { IPostResponse } from "../types/types";
import { Client } from "./client";

export class FileClient extends Client {
  constructor() {
    super();
  }

  public async getFiles(): Promise<any> {
    const res = await this.makeRequest<IPostResponse>({
      method: "GET",
      route: "feed",
    });
    return res;
  }

  public async getSharedPosts(): Promise<IPostResponse> {
    const res = await this.makeRequest<IPostResponse>({
      method: 'GET',
      route: 'feed',
      action: 'sharedPosts'
    })

    return res;
  }


  public async uploadFile(file: File): Promise<any> {
    const FD = new FormData();
    FD.append("files", file);
    const res = await this.makeRequest<IPostResponse>({
      method: "POST",
      route: "posts",
      action: "upload",
      data: FD,
      type: "formData",
    });
    return res;
  }
}
