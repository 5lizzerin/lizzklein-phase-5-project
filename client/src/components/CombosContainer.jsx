import React, { useState, useEffect } from "react";
import { Box, Heading, useTheme } from '@chakra-ui/react';
import ComboSearch from "./ComboSearch";
import AllCombos from "./AllCombos";

function CombosContainer() {
  const [combo, setCombo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetch("/allcombinations")
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((combo) => setCombo(combo));
        } else {
          console.log('error getting all combos');
        }
      });
  }, []);

  return (
    <>
      <Box textAlign="center">
        <Heading color={theme.colors.honeysuckle} mb={4}>All Combinations</Heading>
        <ComboSearch setSearchTerm={setSearchTerm} />
        <AllCombos combo={combo} searchTerm={searchTerm} />
      </Box>
    </>
  );
}

export default CombosContainer;