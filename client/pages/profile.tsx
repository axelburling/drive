import React, { useState } from "react";
import ProtectedRoute from "../components/protectedRoute";
import { IUser } from "../types/types";

const Profile = () => {
  const [user, setUser] = useState<IUser>();
  return (
    <ProtectedRoute
      setUser={(user) => {
        setUser(user);
      }}
    >
      <h1>{JSON.stringify(user)}</h1>
    </ProtectedRoute>
  );
};

export default Profile;
