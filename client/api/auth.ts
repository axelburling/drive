import type { IUser, IUserRequest, IUserResponse } from "../types/types";
import { Client } from "./client";

export class Auth extends Client {
  constructor() {
    super();
  }

  public async register(data: IUserRequest): Promise<IUserResponse> {
    return this.makeRequest<IUserResponse>({
      method: "POST",
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
      method: "POST",
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
      method: "GET",
      route: "auth",
      action: "me",
      type: "json",
    });
  }

  public async logout(): Promise<IUser> {
    return this.makeRequest<IUser>({
      method: "POST",
      route: "auth",
      action: "logout",
      type: "json",
    });
  }
}
