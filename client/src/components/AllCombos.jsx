import React, {useState} from "react";
import { Box, Heading, Image, SimpleGrid, useDisclosure} from '@chakra-ui/react';
// import FavoriteButton from "./FavoriteButton";
import ComboMovesModal from "./ComboMovesModal";

function AllCombos({ combo, searchTerm }) {

  const [showCombo, setShowCombo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filteredCombos = (combo || []).filter((combo) =>
    combo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowComboMoves = (event) => {
    const id = event.target.id
    console.log(id)
    fetch(`/allcombinationmoves/${id}`)
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then(setShowCombo)
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
            id = {combo.id} 
            alt='plie' 
            objectFit="cover" 
            height="100%" 
            width="100%" 
            borderRadius="lg"
            onClose={onClose}
            onClick={handleShowComboMoves} 
          />
          <ComboMovesModal isOpen={isOpen} onClose={onClose} showCombo={showCombo}></ComboMovesModal>
          </Box>
          {/* <FavoriteButton 
            combo={combo} 
            id={combo.id}>
          </FavoriteButton> */}
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