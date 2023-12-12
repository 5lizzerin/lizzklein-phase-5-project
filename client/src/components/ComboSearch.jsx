import React from "react";
import { Input } from '@chakra-ui/react';

function ComboSearch({ setSearchTerm }) {
  return (
    <Input
      placeholder='Search for a combination'
      size='md'
      variant='flushed'
      width="500px"
      padding="20px"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default ComboSearch;