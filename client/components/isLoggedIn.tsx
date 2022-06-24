import { Box } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const IsLoggedIn = ({ children }: { children: any }) => {
  const { me } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    me().then((res) => {
      if (res && !res.error) {
        router.push("/dashboard");
      }
    });
  }, []);

  return <Box>{children}</Box>;
};

export default IsLoggedIn;
