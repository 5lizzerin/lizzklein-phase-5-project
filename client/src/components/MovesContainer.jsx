import React, { useState, useEffect } from "react";
import { Box, Divider, Heading, Text, useTheme } from '@chakra-ui/react';
// import Search from "./ComboSearch";
import AllMoves from "./AllMoves"
import MoveSearch from "./MoveSearch";

function MovesContainer() {
  const [move, setMove] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetch("/allmoves")
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((move) => setMove(move));
        } else {
          console.log('error getting all moves');
        }
      });
  }, []);

  return (
    <>
      <Box textAlign="center">
        <Heading color={theme.colors.honeysuckle} mb={4}>All Moves</Heading>
        <Text color={theme.colors.honeysuckle} mb={8}>Click on a move to see its description</Text>
        <MoveSearch setSearchTerm={setSearchTerm} />
        <Divider></Divider>
        <AllMoves move={move} searchTerm={searchTerm} />
      </Box>
    </>
  );
}

export default MovesContainer;