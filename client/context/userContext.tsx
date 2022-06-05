import React, { createContext, useState } from "react";
import { User } from "../api/user";
import { IApikeyResonpose, IResponse } from "../types/types";

interface IUserContext {
  apikey: () => Promise<IApikeyResonpose | undefined>;
  resetApiKey: (id: string) => Promise<IApikeyResonpose | undefined>;
  uploadAvatar: (file: File) => Promise<IResponse | undefined>;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const user = new User();
  const [loading, setLoading] = useState(false);

  const apikey = async () => {
    try {
      const response = await user.apikey();
      setLoading(false);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const resetApiKey = async (id: string) => {
    try {
      const response = await user.resetKey(id);
      setLoading(false);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const response = await user.uploadAvatar(file);
      setLoading(false);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ apikey, resetApiKey, uploadAvatar }}>
      {children}
    </UserContext.Provider>
  );
};
