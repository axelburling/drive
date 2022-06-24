import { useRouter } from "next/router";
import FileViewer from "../../components/fileViewer";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/protectedRoute";

const File = () => {
  const { query } = useRouter();
  return (
    <ProtectedRoute>
      <Navbar />
      <FileViewer id={query.id as string} />
    </ProtectedRoute>
  );
};

export default File;
