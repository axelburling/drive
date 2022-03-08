export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
<<<<<<< HEAD
  apikeys: IApiKey[];
  posts: IPost[] | null;
=======
>>>>>>> 25379cf (starting to build frontend)
}

export interface IPost {
  id: string;
  url: string;
<<<<<<< HEAD
  name: string;
=======
>>>>>>> 25379cf (starting to build frontend)
  createdAt: string;
  ownerId: string;
  viewers: string[];
}

<<<<<<< HEAD
export interface IApiKey {
  id: string;
  clientId: string;
  clientSecret: string;
  usage: number;
  createdAt: Date;
  ownerId: string;
}

=======
>>>>>>> 25379cf (starting to build frontend)
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
<<<<<<< HEAD

export interface IPostResponse extends IResponse {
  post: IPost[];
}

export interface IApikeyResonpose extends IResponse {
  key: IApiKey;
}
=======
>>>>>>> 25379cf (starting to build frontend)
