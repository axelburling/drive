import { Box, Input } from "@chakra-ui/react";
import React from "react";

interface SearchbarProps {
  onChange: (q: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onChange }) => {
  return (
    <Box>
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your Adrive files"
      />
    </Box>
  );
};

export default Searchbar;
