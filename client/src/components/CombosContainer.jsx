import React, { useState, useEffect } from "react";
import { Box, Divider, Heading, Text, useTheme } from '@chakra-ui/react';
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
      <Box 
        textAlign="center">
        <Heading 
          color={theme.colors.honeysuckle} 
          mb={4}
          >All Combinations
        </Heading>
        <Text 
          color={theme.colors.honeysuckle} 
          mb={8}
          >Click on a combination to see the moves within it
        </Text>
        <ComboSearch 
          setSearchTerm={setSearchTerm} 
        />
        <Divider></Divider>
        <AllCombos 
          combo={combo} 
          searchTerm={searchTerm} 
        />
      </Box>
    </>
  );
}

export default CombosContainer;