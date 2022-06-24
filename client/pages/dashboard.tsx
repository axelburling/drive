import { useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import MainWin from "../components/mainWin";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import { FileContext } from "../context/fileContext";

const Dashboard = () => {
  const drop = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const {
    getFiles,
    upload,
    posts: [posts, setPosts],
    ogPosts,
  } = useContext(FileContext)!;

  useEffect(() => {
    (async () => {
      await getFiles();
    })();
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

  useEffect(() => {
    drop.current?.addEventListener("dragover", onDragOver);
    drop.current?.addEventListener("drop", onDrop);
    return () => {
      drop.current?.removeEventListener("dragover", onDragOver);
      drop.current?.removeEventListener("drop", onDrop);
    };
  }, []);

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("drag", e);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drop", e.dataTransfer?.files);
    const results = Array.from(e.dataTransfer?.files!).map(
      async (file: File) => {
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
      }
    );
    toast({
      title: `${results.length} Files Uploaded`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const onSearch = (q: string) => {
    if (!q) {
      setPosts(ogPosts);
    } else {
      setPosts(
        posts?.filter(
          (post) => post.name.indexOf(q) > -1 || post.url.indexOf(q) > -1
        ) as any
      );
    }
  };

  return (
    <div ref={drop}>
      <ProtectedRoute>
        <Navbar onSearch={onSearch} fileChange={fileChange} />
        <MainWin posts={posts} />
        {/* <SideBar fileChange={fileChange} /> */}
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
