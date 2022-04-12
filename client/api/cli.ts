import { IResponse, IUser } from "../types/types";
import { Client } from "./client";

export class Cli extends Client {
  constructor() {
    super();
  }

  public async send({
    token,
    user,
  }: {
    token: string;
    user: IUser;
  }): Promise<IResponse> {
    return await this.makeRequest<IResponse>({
      method: "POST",
      route: "cli",
      data: {
        token,
        user,
      },
      type: "json",
    });
  }
}
