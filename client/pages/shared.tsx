import { useContext, useEffect } from "react";
import MainWin from "../components/mainWin";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import { FileContext } from "../context/fileContext";

const Shared = () => {
  const { getSharedFiles, shared } = useContext(FileContext)!;

  useEffect(() => {
    (async () => {
      const files = await getSharedFiles();
      console.log(files);
    })();
  }, []);

  return (
    <ProtectedRoute>
      <Navbar />
      <MainWin posts={shared} />
    </ProtectedRoute>
  );
};

export default Shared;
