import React, { createContext, useState } from "react";
import { FileClient } from "../api/file";
import { IPost, IPostResponse } from "../types/types";

interface IPostContext {
  posts: [IPost[] | null, React.Dispatch<React.SetStateAction<IPost[] | null>>]; // usestate type
  getFiles: () => Promise<IPostResponse>;
  upload: (file: File) => Promise<IPostResponse>;
  download: (id: string, filename: string) => Promise<string | undefined>;
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

  const download = async (
    id: string,
    filename: string
  ): Promise<string | undefined> => {
    try {
      const response = await file.downloadFile(id);
      const url = URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "unknown";

      const clickLink = () => {
        setTimeout(() => {
          URL.revokeObjectURL(url);
          link.removeEventListener("click", clickLink);
          link.remove();
        }, 150);
      };

      link.addEventListener("click", clickLink);

      link.click();
      return "Success";
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
        download,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
