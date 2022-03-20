export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IPost {
  id: string;
  url: string;
  createdAt: string;
  ownerId: string;
  viewers: string[];
}

export interface IUserRequest {
  email: string;
  password: string;
  name?: string;
}

export interface IResponse {
  error: boolean;
  message: string;
}

export interface IUserResponse extends IResponse {
  user: IUser;
  token: string;
}
