import React, {useState} from "react";
import { Box, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import CreateNewCombo from "./CreateNewCombo";

function MyCombos(){

    const [myCombo, setMyCombo] = useState(null)
    const [combos, setCombos] = useState([])

    

    const handleComboCreated = (newComboData) => {
        setMyCombo(newComboData);
        setCombos((prevCombos) => [...prevCombos, newComboData]);
    };

    return (
        <>
          <Heading>My Combos</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={4}>
            {combos.map((combo) => (
              <Box
                key={combo.Combination.id}
                boxShadow="lg"
                p="6"
                rounded="md"
                overflow="hidden"
              >
                <Heading fontSize="xl">{combo.Combination.name}</Heading>
                <Box mt="2" height="200px" width="100%" overflow="hidden" borderRadius="lg">
                  <Image
                    src={combo.Combination.image}
                    alt={combo.Combination.name}
                    objectFit="cover"
                    height="100%"
                    width="100%"
                    borderRadius="lg"
                  />
                </Box>
                {/* You can add additional components or styles as needed */}
              </Box>
            ))}
          </SimpleGrid>
          <CreateNewCombo onComboCreated={handleComboCreated}></CreateNewCombo>
        </>
      );
}

export default MyCombos;