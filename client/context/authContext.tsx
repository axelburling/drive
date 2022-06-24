import React, { createContext, useState } from "react";
import { Auth } from "../api/auth";
import { IUser, IUserRequest, IUserResponse } from "../types/types";

interface IUserContext {
  user: [IUser | null, React.Dispatch<React.SetStateAction<IUser | null>>]; // usestate type
  loggingOut: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  logout: () => Promise<void>;
  login: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  register: (user: IUserRequest) => Promise<IUserResponse | undefined>;
  me: () => Promise<IUserResponse | undefined>;
}

export const AuthContext = createContext<IUserContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<null | IUser>(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const auth = new Auth();

  const logout = async () => {
    try {
      setLoading(true);
      await auth.logout();
      setUser(null);
      setLoading(false);
      setLoggingOut(true);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (
    user: IUserRequest
  ): Promise<IUserResponse | undefined> => {
    try {
      const response = await auth.register(user);
      setUser(response.user);
      setLoading(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (
    user: IUserRequest
  ): Promise<IUserResponse | undefined> => {
    try {
      const response = await auth.login(user);
      setUser(response.user);
      setLoading(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const me = async () => {
    try {
      const response = await auth.me();
      console.log(response.user);
      setUser(response.user);
      setLoading(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: [user, setUser],
        register,
        login,
        logout,
        me,
        loggingOut: [loggingOut, setLoggingOut],
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
