import { Box, Image, Spinner, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import {
  materialOceanic,
  solarizedlight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FileContext } from "../context/fileContext";
import { extToType } from "../utils/file-type";

export default function FileViewer({ id }: { id: string }) {
  const { colorMode } = useColorMode();
  const {
    posts: [posts],
    getFiles,
  } = useContext(FileContext)!;
  const [content, setContent] = useState<string | null>("");
  if (!posts) {
    getFiles();
  }

  const post = posts?.find((post) => post.id === id);

  const ext = post?.url.slice(post?.url.lastIndexOf(".") + 1, post?.url.length);

  switch (extToType(ext)) {
    case "image":
      return (
        <Box
          h="calc(100vh - 70px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <Image h="60vh" w="60vw" src={post?.url} alt="preview" />
        </Box>
      );
    case "video":
      return (
        <Box
          h="calc(100vh - 70px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <video controls src={post?.url} />
        </Box>
      );
    case "text":
      (async () => {
        const res = await fetch(String(post?.url), {
          method: "GET",
          credentials: "include",
        });
        const data = await res.text();
        if (!/^[\u0000-\u007f]*$/.test(data)) {
          setContent("can't preview this file");
        } else {
          setContent(data);
        }
      })();

      const ext = post?.url.slice(
        post?.url.lastIndexOf(".") + 1,
        post?.url.length
      );

      return (
        <Box
          h="calc(100vh - 70px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <SyntaxHighLighter
            language={ext}
            style={colorMode === "dark" ? materialOceanic : solarizedlight}
            customStyle={{
              height: "calc(100vh - 70px)",
            }}
          >
            {content ? content : "Loading..."}
          </SyntaxHighLighter>
        </Box>
      );
    default:
      return (
        <Box
          h="calc(100vh - 70px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      );
  }
}
