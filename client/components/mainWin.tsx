import { Box, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { IPost } from "../types/types";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const MainWin = ({ posts }: { posts: IPost[] | null }) => {
  return (
    <Box h="calc(100vh - 70px)">
      {posts ? (
        <Grid templateColumns="repeat(4, 1fr)">
          {posts.map((post) => (
            <GridItem
              key={post.id}
              height="8rem"
              m="10px"
              w="8.3rem"
              border="1px"
              borderRadius="md"
            >
              <Stack spacing={4}>
                <Image borderTopRadius="md" src={IMAGE}></Image>
                <Text size="sm">{post.name}</Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <h1>Loading... </h1>
      )}
    </Box>
  );
};

export default MainWin;
