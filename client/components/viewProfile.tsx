import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../types/types";

interface Props {
  user: IUser | null;
}

const ViewProfile: React.FC<Props> = ({ user }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="2vh"
    >
      <Image
        display="inline-block"
        src={user?.avatar}
        borderRadius="50%"
        alt="avatar"
      />
      <Text
        marginLeft="2vw"
        size="lg"
        fontSize="lg"
        fontWeight="bold"
        display="inline-block"
      >
        {user?.name}
      </Text>
    </Box>
  );
};

export default ViewProfile;
