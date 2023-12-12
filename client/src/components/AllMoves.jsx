import React from "react";
import { Box, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import FavoriteButton from "./FavoriteButton";

function AllMoves({ move, searchTerm }) {

  const filteredMoves = (move || []).filter((move) =>
    move.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SimpleGrid 
      columns={{ base: 1, md: 2, lg: 3, xl: 5 }} 
      spacing={4}
    >

        {filteredMoves.map((move) => (
          <Box 
            key={move.id} 
            boxShadow="lg" 
            p="6" 
            rounded="md"
          >
          <Heading 
            fontSize="xl"
            >{move.name}
          </Heading>
          <Box 
            mt="2" 
            height="200px" 
            width="100%" 
            overflow="hidden" 
            borderRadius="lg"
          >
          <Image 
            src={move.image} 
            alt='plie' 
            objectFit="cover" 
            height="100%" 
            width="100%" 
            borderRadius="lg" 
          />
          {/* </Box>
          <FavoriteButton 
            move={move} 
            id={move.id}>
          </FavoriteButton>
          <Box 
            mt="4"> */}
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default AllMoves;