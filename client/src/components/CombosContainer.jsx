import React, { useState, useEffect } from "react";
import { Heading } from '@chakra-ui/react';
import Search from "./Search";
import AllCombos from "./AllCombos";

function CombosContainer() {
  const [combo, setCombo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      <Heading>All Combos</Heading>
      <Search setSearchTerm={setSearchTerm} />
      <AllCombos combo={combo} searchTerm={searchTerm} />
    </>
  );
}

export default CombosContainer;