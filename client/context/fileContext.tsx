import React, { createContext, useState } from "react";
import { FileClient } from "../api/file";
import { IPost, IPostResponse } from "../types/types";

interface IPostContext {
  posts: [IPost[] | null, React.Dispatch<React.SetStateAction<IPost[] | null>>]; // usestate type
  shared: IPost[] | null;
  ogPosts: IPost[] | null;
  getFiles: () => Promise<IPostResponse>;
  upload: (file: File) => Promise<IPostResponse>;
  getSharedFiles: () => Promise<IPostResponse | undefined>;
  //   login: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  //   register: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  //   me: () => Promise<IUserResponse | undefined>;
}

export const FileContext = createContext<IPostContext | null>(null);

export const FileProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [shared, setSharedPosts] = useState<null | IPost[]>(null);
  const [ogPosts, setOgPosts] = useState<null | IPost[]>(null);
  const [loading, setLoading] = useState(false);
  const file = new FileClient();

  const getFiles = async () => {
    try {
      const response = await file.getFiles();
      setPosts(response.posts);
      setOgPosts(response.posts);
      setLoading(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getSharedFiles = async () => {
    try {
      const res = await file.getSharedPosts();
      setSharedPosts(res.posts);
      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const upload = async (post: File) => {
    try {
      const response = await file.uploadFile(post);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FileContext.Provider
      value={{
        posts: [posts, setPosts],
        shared,
        ogPosts,
        getFiles,
        upload,
        getSharedFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
