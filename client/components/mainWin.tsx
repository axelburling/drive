import {
  Box,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IPost } from "../types/types";
import { postToImage } from "../utils/file-type";

// const IMAGE =
// "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const MainWin = ({ posts }: { posts: IPost[] | null }) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  return (
    <Box h="calc(100vh - 70px)">
      {posts ? (
        <TableContainer
          marginTop="2vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <Table variant="simple" size="md" maxW="80vw" borderWidth="1px">
            <TableCaption>Files brought to you by Adrive</TableCaption>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Name</Th>
                <Th>Created At</Th>
                <Th>Size</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((post: IPost) => {
                const img = postToImage(post);
                const date = new Date(post.createdAt);
                return (
                  <Tr
                    _hover={{
                      backgroundColor:
                        colorMode === "light" ? "blackAlpha.500" : "gray.700",
                    }}
                    key={post.id}
                    onClick={async () => {
                      console.log(post.id);
                      const suc = await router.push({
                        pathname: "/file/[id]",
                        query: { id: post.id },
                        href: `/file/${post.id}`,
                      });
                      console.log(suc);
                    }}
                  >
                    <Td>
                      <Image src={img} alt="post_type" h="4rem" w="4rem" />
                    </Td>
                    <Td>{post.name}</Td>
                    <Td>{`${post.createdAt.slice(
                      0,
                      10
                    )} ${date.getHours()}:${date.getMinutes()}`}</Td>
                    <Td>{post.size}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <h1>Loading... </h1>
      )}
    </Box>
  );
};

export default MainWin;
