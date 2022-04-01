import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import ProtectedRoute from "../components/protectedRoute";
import { UserContext } from "../context/userContext";

const Developer = () => {
  const { apikey } = useContext(UserContext)!;
  return (
    <ProtectedRoute>
      <h1>Developer</h1>
      <Button colorScheme="blue" onClick={apikey}>
        Get API Key
      </Button>
    </ProtectedRoute>
  );
};

export default Developer;
