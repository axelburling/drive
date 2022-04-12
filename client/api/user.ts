import { IApikeyResonpose } from "../types/types";
import { Client } from "./client";

export class User extends Client {
  constructor() {
    super();
  }

  public async apikey() {
    return this.makeRequest<IApikeyResonpose | undefined>({
      method: "GET",
      route: "developer",
      type: "json",
    });
  }

  public async resetKey(apiKeyID: string) {
    return this.makeRequest<IApikeyResonpose | undefined>({
      method: "POST",
      route: "developer",
      action: "reset",
      type: "json",
      data: {
        apikey: apiKeyID,
      },
    });
  }
}
