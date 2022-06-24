import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";

const Developer = () => {
  const toast = useToast();
  const { apikey, resetApiKey } = useContext(UserContext)!;
  const {
    user: [user],
    logout,
  } = useContext(AuthContext)!;

  const apikeyCreate = async () => {
    const res = await apikey();
    if (!res?.error) {
      toast({
        title: "Success",
        description: "API Key Created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <Box
        marginTop={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        marginBottom={4}
      >
        <Text textAlign="center">Credentials</Text>
        <Button
          variant="solid"
          colorScheme="green"
          size="sm"
          marginLeft="40vw"
          onClick={apikeyCreate}
        >
          New Api Key
        </Button>
      </Box>
      {!user?.apikeys || user?.apikeys.length === 0 ? (
        <div>
          <h1>Wow such empty</h1>
        </div>
      ) : (
        <div>
          <TableContainer zIndex={-10}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Client ID</Th>
                  <Th>Client Secret</Th>
                  <Th isNumeric>Usage</Th>
                  <Th>Created At</Th>
                  {/* <Th>Danger</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {user?.apikeys
                  .sort((a, b) => b.usage - a.usage)
                  .map((apikey) => (
                    <Tr key={apikey.id}>
                      <Td
                        fontSize={"xs"}
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(apikey.clientId);
                        }}
                      >
                        {apikey.clientId.substring(0, 20)}...
                      </Td>
                      <Td
                        fontSize={"xs"}
                        onClick={async (e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(apikey.clientSecret);
                        }}
                      >
                        {"*"
                          .repeat(apikey.clientSecret.length)
                          .substring(0, 20)}
                        ...
                      </Td>
                      <Td isNumeric>{apikey.usage}</Td>
                      <Td>{apikey.createdAt}</Td>
                      {/* <Td>
                        <Button
                          variant="solid"
                          colorScheme="red"
                          size="sm"
                          onClick={() => {
                            resetApiKey(apikey.id);
                          }}
                        >
                          Reset Secret
                        </Button>
                      </Td> */}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Developer;
