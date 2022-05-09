import { useToast } from "@chakra-ui/react";
import React from "react";
// import MainWin from "../../../client/components/mainWin";
// import Navbar from "../../../client/components/Navbar";
import ProtectedRoute from "../../../client/components/protectedRoute";
// import { AuthContext } from "../../../client/context/authContext";
// import { FileContext } from "../../../client/context/fileContext";

const Dashboard = () => {
  const toast = useToast();
  // const {
  //   getFiles,
  //   upload,
  //   posts: [posts],
  // } = useContext(FileContext)!;
  // const {
  //   user: [user],
  //   logout,
  // } = useContext(AuthContext)!;

  // useEffect(() => {
  //   getFiles();
  // }, []);

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.files);
    const results = Array.from(e.target.files!).map(async (file: File) => {
      // const res = await upload(file);
      // if (res.error) {
      //   toast({
      //     title: "Error",
      //     description: res.message,
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      //   return;
      // }
      // return res;
    });

    // const nw = await getFiles();
    // console.log(nw);
    toast({
      title: `${results.length} Files Uploaded`,
      description: "Files uploaded successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // console.log(logout);

  return (
    <div>
      <ProtectedRoute>
        {/* <Navbar user={user} fileChange={fileChange} logout={logout} /> */}
        {/* <MainWin posts={posts} /> */}
        {/* <SideBar fileChange={fileChange} /> */}
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
