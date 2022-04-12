import React, { createContext, useState } from "react";
import { User } from "../api/user";
import { IApikeyResonpose } from "../types/types";

interface IUserContext {
  //   user: [IUser | null, React.Dispatch<React.SetStateAction<IUser | null>>]; // usestate type
  //   logout: () => Promise<void>;
  //   login: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  //   register: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  //   me: () => Promise<IUserResponse | undefined>;
  apikey: () => Promise<IApikeyResonpose | undefined>;
  resetApiKey: (id: string) => Promise<IApikeyResonpose | undefined>;
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

  return (
    <UserContext.Provider value={{ apikey, resetApiKey }}>
      {children}
    </UserContext.Provider>
  );
};
