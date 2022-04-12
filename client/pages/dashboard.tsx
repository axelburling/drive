import { useToast } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import MainWin from "../components/mainWin";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import { AuthContext } from "../context/authContext";
import { FileContext } from "../context/fileContext";

const Dashboard = () => {
  const toast = useToast();
  const {
    getFiles,
    upload,
    posts: [posts],
  } = useContext(FileContext)!;
  const {
    user: [user],
    logout,
  } = useContext(AuthContext)!;

  useEffect(() => {
    getFiles();
  }, []);

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.files);
    const results = Array.from(e.target.files!).map(async (file: File) => {
      const res = await upload(file);
      console.log(res);
      if (res.error) {
        toast({
          title: "Error",
          description: res.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      return res;
    });
    toast({
      title: `${results.length} Files Uploaded`,
      description: "Files uploaded successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div>
      <ProtectedRoute>
        <Navbar user={user} fileChange={fileChange} logout={logout} />
        <MainWin posts={posts} />
        {/* <SideBar fileChange={fileChange} /> */}
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
