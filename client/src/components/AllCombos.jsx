import React from "react";
import { Box, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import FavoriteButton from "./FavoriteButton";

function AllCombos({ combo, searchTerm }) {

  const filteredCombos = (combo || []).filter((combo) =>
    combo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SimpleGrid 
      columns={{ base: 1, md: 2, lg: 3, xl: 5 }} 
      spacing={4}
    >

        {filteredCombos.map((combo) => (
          <Box 
            key={combo.id} 
            boxShadow="lg" 
            p="6" 
            rounded="md"
          >
          <Heading 
            fontSize="xl"
            >{combo.name}
          </Heading>
          <Box 
            mt="2" 
            height="200px" 
            width="100%" 
            overflow="hidden" 
            borderRadius="lg"
          >
          <Image 
            src={combo.image} 
            alt='plie' 
            objectFit="cover" 
            height="100%" 
            width="100%" 
            borderRadius="lg" 
          />
          </Box>
          <FavoriteButton 
            combo={combo} 
            id={combo.id}>
          </FavoriteButton>
          <Box 
            mt="4">
            {/* add in type of combo here later? */}
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default AllCombos;