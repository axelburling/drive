import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { IUser } from "../types/types";

const ProtectedRoute = ({
  setUser,
  children,
}: {
  setUser?: (user: IUser | undefined) => any;
  children: React.ReactNode;
}) => {
  // const [user, setU] = useState<IUser>();
  const { me } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    me().then((res) => {
      if (res && !res.error && res.user) {
        // setU(res.user);
        if (setUser) setUser(res.user);
        // setUser(user);
        router.push(router.route ? router.route : "/dashboard");
      } else {
        router.push("/login");
      }
    });
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
