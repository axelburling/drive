import type { IUserRequest, IUserResponse } from "../types/types";
import { IResponse } from "../types/types";
import { makeRequest } from "./client";

export class Auth {
  public async register(data: IUserRequest): Promise<IUserResponse> {
    return makeRequest<IUserResponse>({
      method: "POST",
      route: "auth",
      action: "register",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      type: "Json",
    });
  }

  public async login(data: IUserRequest): Promise<IUserResponse> {
    return makeRequest<IUserResponse>({
      method: "POST",
      route: "auth",
      action: "login",
      data: {
        email: data.email,
        password: data.password,
      },
      type: "Json",
    });
  }

  public async me(): Promise<IUserResponse> {
    return makeRequest<IUserResponse>({
      method: "GET",
      route: "auth",
      action: "me",
      type: "Json",
    });
  }

  public async logout(): Promise<IResponse> {
    return makeRequest<IResponse>({
      method: "POST",
      route: "auth",
      action: "logout",
    });
  }
}
