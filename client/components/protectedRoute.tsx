import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { me } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    me().then((res) => {
      console.log(res);
      if (res && !res.error) {
        router.push(router.route ? router.route : "/dashboard");
      } else {
        router.push("/login");
      }
    });
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
