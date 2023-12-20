import React, {useState} from "react";
import { Box, Heading, Image, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import MovesDescriptionModal from "./MoveDescriptionModal";


function AllMoves({ move, searchTerm }) {
  const [showMove, setShowMoves] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filteredMoves = (move || []).filter((move) => 
    move.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMoveDescription = (event) => {
    fetch(`/allmoves/${event.target.id}`)
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then(setShowMoves)
                    } else {
                        console.log('error getting all combination moves');
                    }
                });
    onOpen();
  }

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
            id={move.id} 
            alt='plie' 
            objectFit="cover" 
            height="100%" 
            width="100%" 
            borderRadius="lg"
            onClick={handleShowMoveDescription}
            onClose={onClose} 
          />
          <MovesDescriptionModal 
            isOpen={isOpen} 
            onClose={onClose} 
            showMove={showMove}>
          </MovesDescriptionModal>
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