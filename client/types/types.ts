export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  apikeys: IApiKey[];
  posts: IPost[];
}

export interface IPost {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  ownerId: string;
  viewers: string[];
}

export interface IApiKey {
  id: string;
  clientId: string;
  clientSecret: string;
  usage: number;
  createdAt: Date;
  ownerId: string;
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

export interface IPostResponse extends IResponse {
  post: IPost[];
}

export interface IApikeyResonpose extends IResponse {
  key: IApiKey;
}
