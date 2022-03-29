import React, { createContext, useState } from "react";
import { FileClient } from "../api/file";
import { IPost, IPostResponse } from "../types/types";

interface IPostContext {
  posts: [IPost[] | null, React.Dispatch<React.SetStateAction<IPost[] | null>>]; // usestate type
  getFiles: () => Promise<IPostResponse>;
  upload: (file: File) => Promise<IPostResponse>;
  //   login: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  //   register: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  //   me: () => Promise<IUserResponse | undefined>;
}

export const FileContext = createContext<IPostContext | null>(null);

export const FileProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [loading, setLoading] = useState(false);
  const file = new FileClient();

  const getFiles = async () => {
    try {
      const response = await file.getFiles();
      setPosts(response.posts);
      setLoading(false);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const upload = async (post: File) => {
    try {
      const response = await file.uploadFile(post);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FileContext.Provider
      value={{
        posts: [posts, setPosts],
        getFiles,
        upload,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
