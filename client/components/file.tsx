// const Post = ({ post }: { post: IPost }) => {
//   return <div>{JSON.stringify(post)}</div>;
// };
// export default Post;
import { Box } from "@chakra-ui/react";
import React from "react";
import { IPost } from "../types/types";
const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function Post({ post }: { post: IPost }) {
  console.log(post);
  return (
    <Box bg="black" height="80px" w="80px"></Box>
    // <Box
    //   bg="red"
    //   borderWidth="1px"
    //   borderColor="gray.200"
    //   borderRadius="md"
    //   maxW="4rem"
    //   w="4rem"
    //   maxH="4rem"
    //   h="4rem"
    // >
    //   <Stack spacing={4}>
    //     <Image src={IMAGE} />
    //     <Heading size="md">{post.name}</Heading>
    //     <Text>{post.createdAt}</Text>
    //   </Stack>
    // </Box>
  );
}
