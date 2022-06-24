import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: any }) => {
  const {
    me,
    loggingOut: [loggingOut, setLoggingOut],
  } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    console.log(loggingOut);
    if (loggingOut) {
      setLoggingOut(true);
      router.push("/login");
    } else {
      me().then((res) => {
        if (res && res.error) {
          router.push("/login");
        }
      });
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
