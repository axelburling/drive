import type { NextPage } from "next";
<<<<<<< HEAD
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

=======

const Home: NextPage = () => {
>>>>>>> 25379cf (starting to build frontend)
  return (
    // <Routes>
    //   <Route path="/" element={<Login />} />
    // </Routes>
    <h1>hello</h1>
  );
};

export default Home;
