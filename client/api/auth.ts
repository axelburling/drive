import type { IUser, IUserRequest, IUserResponse } from "../types/types";
import { Client } from "./client";

export class Auth extends Client {
  constructor() {
    super();
  }

  public async register(data: IUserRequest): Promise<IUserResponse> {
    return this.makeRequest<IUserResponse>({
      method: "post",
      route: "auth",
      action: "register",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      type: "json",
    });
  }

  public async login(data: IUserRequest): Promise<IUserResponse> {
    return this.makeRequest<IUserResponse>({
      method: "post",
      route: "auth",
      action: "login",
      data: {
        email: data.email,
        password: data.password,
      },
      type: "json",
    });
  }

  public async me(): Promise<IUserResponse> {
    return this.makeRequest<IUserResponse>({
      method: "get",
      route: "auth",
      action: "me",
      type: "json",
    });
  }

  public async logout(): Promise<IUser> {
    return this.makeRequest<IUser>({
      method: "post",
      route: "auth",
      action: "logout",
      type: "json",
    });
  }
}
