import React, { useContext, useEffect } from "react";
import MainWin from "../components/mainWin";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import SideBar from "../components/SideBar";
import { AuthContext } from "../context/authContext";
import { FileContext } from "../context/fileContext";

const Dashboard = () => {
  const {
    getFiles,
    upload,
    posts: [posts],
  } = useContext(FileContext)!;
  const {
    user: [user],
  } = useContext(AuthContext)!;

  // (async () => {
  //   const res = await getFiles();
  //   console.log(res);
  // })();

  useEffect(() => {
    getFiles();
  }, []);

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.files);
    Array.from(e.target.files!).forEach(async (file: File) => {
      const res = await upload(file);
      console.log(res);
    });
  };

  console.log(user);

  return (
    <div>
      <ProtectedRoute>
        <Navbar user={user} />
        <MainWin posts={posts} />
        <SideBar fileChange={fileChange} />
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
