<<<<<<< HEAD
import type { IUserRequest, IUserResponse } from "../types/types";
import { IResponse } from "../types/types";
=======
import type { IUser, IUserRequest, IUserResponse } from "../types/types";
>>>>>>> 25379cf (starting to build frontend)
import { Client } from "./client";

export class Auth extends Client {
  constructor() {
    super();
  }

  public async register(data: IUserRequest): Promise<IUserResponse> {
    return this.makeRequest<IUserResponse>({
<<<<<<< HEAD
      method: "POST",
=======
      method: "post",
>>>>>>> 25379cf (starting to build frontend)
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
<<<<<<< HEAD
      method: "POST",
=======
      method: "post",
>>>>>>> 25379cf (starting to build frontend)
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
<<<<<<< HEAD
      method: "GET",
=======
      method: "get",
>>>>>>> 25379cf (starting to build frontend)
      route: "auth",
      action: "me",
      type: "json",
    });
  }

<<<<<<< HEAD
  public async logout(): Promise<IResponse> {
    return this.makeRequest<IResponse>({
      method: "POST",
      route: "auth",
      action: "logout",
=======
  public async logout(): Promise<IUser> {
    return this.makeRequest<IUser>({
      method: "post",
      route: "auth",
      action: "logout",
      type: "json",
>>>>>>> 25379cf (starting to build frontend)
    });
  }
}
