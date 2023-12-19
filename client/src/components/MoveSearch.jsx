import React from "react";
import { Input } from '@chakra-ui/react';

function MoveSearch({ setSearchTerm }) {
  return (
    <Input
      placeholder='Search for a specific move'
      size='md'
      variant='flushed'
      width="500px"
      padding="20px"
      onChange={(e) => (setSearchTerm(e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))}
    />
  );
}

export default MoveSearch;