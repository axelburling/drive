export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  posts: IPost[];
  apikeys: IApiKey[];
}

export interface IPost {
  id: string;
  url: string;
  createdAt: string;
  ownerId: string;
  viewers: string[];
}

export interface IApiKey {
  id: string;
  clientId: string;
  clientSecret: string;
  usage: number;
  createdAt: string;
  ownerId: string;
}
