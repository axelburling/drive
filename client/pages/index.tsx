import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const Home: NextPage = () => {
  const { me } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    me().then((res) => {
      if (res && !res.error) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });
  }, []);

  return (
    // <Routes>
    //   <Route path="/" element={<Login />} />
    // </Routes>
    <Box></Box>
  );
};

export default Home;
