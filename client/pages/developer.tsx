import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/protectedRoute";
import { AuthContext } from "../context/authContext";
// import { UserContext } from "../context/userContext";

const Developer = () => {
  // const { apikey } = useContext(UserContext)!;
  const {
    user: [user],
    logout,
  } = useContext(AuthContext)!;
  // console.log(document.cookie);
  return (
    <ProtectedRoute>
      <Navbar user={user} logout={logout} />
      {/* <h1>Developer</h1>
      <Button colorScheme="blue" onClick={apikey}>
        Get API Key
      </Button> */}
      <Text textAlign="center">Credentials</Text>
      {!user?.apikeys || user?.apikeys.length === 0 ? (
        <div>
          <h1>Wow such empty</h1>
        </div>
      ) : (
        <div>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Client ID</Th>
                  <Th>Client Secret</Th>
                  <Th isNumeric>Usage</Th>
                  <Th>Created At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user?.apikeys
                  .sort((a, b) => b.usage - a.usage)
                  .map((apikey) => (
                    <>
                      <Tr key={apikey.id}>
                        <Td
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(apikey.clientId);
                          }}
                        >
                          {apikey.clientId.substring(0, 20)}...
                        </Td>
                        <Td
                          onClick={async (e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(apikey.clientSecret);
                          }}
                        >
                          {apikey.clientSecret.substring(0, 20)}...
                        </Td>
                        <Td isNumeric>{apikey.usage}</Td>
                        <Td>{apikey.createdAt}</Td>
                      </Tr>
                    </>
                  ))}
                {/* <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr> */}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Developer;
