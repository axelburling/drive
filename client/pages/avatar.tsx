import { Box, Button, Image, useToast } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const {
    user: [user],
    logout,
  } = useContext(AuthContext)!;
  const { uploadAvatar } = useContext(UserContext)!;
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<any>(null);
  const toast = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      } else {
        toast({
          title: "Error",
          description: "Could not read file",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  const upload = async () => {
    if (!file) return;
    const res = await uploadAvatar(file);
    if (res && res.error) {
      toast({
        title: "Error",
        description: res.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Success",
      description: "Avatar uploaded successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const cancelUpload = () => {
    setPreview("");
    setFile(null);
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <Box marginTop="2vh">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Button
            variant="solid"
            colorScheme="whatsapp"
            onClick={() => {
              ref.current?.click();
            }}
          >
            <input
              type="file"
              name="file"
              id=""
              multiple={true}
              onChange={onChange}
              hidden={true}
              ref={(e) => {
                ref.current = e;
              }}
            />
            <>File Upload</>
          </Button>
          <Box marginTop="2vh">
            {preview && <Image h="100%" w="100%" src={preview} alt="preview" />}
          </Box>
        </Box>
        {file && preview ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="2vh"
          >
            <Button
              display="inline-block"
              variant="solid"
              colorScheme="red"
              onClick={cancelUpload}
              marginRight="2vw"
            >
              Cancel
            </Button>
            <Button
              display="inline-block"
              variant="solid"
              colorScheme="whatsapp"
              onClick={upload}
            >
              Save
            </Button>
          </Box>
        ) : null}
      </Box>
    </ProtectedRoute>
  );
};

export default Profile;
