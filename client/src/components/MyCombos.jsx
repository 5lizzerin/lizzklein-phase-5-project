import React, {useState, useEffect} from "react";
import { Box, Heading, Image, SimpleGrid, theme } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CreateNewCombo from "./CreateNewCombo";

function MyCombos({user_id}){
  const [myCombos, setMyCombos] = useState([])

    useEffect(() => {
      fetch(`/users/${user_id}/allcombinations`)
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((myCombos) => setMyCombos(myCombos));
          } else {
            console.log('error getting all combos');
          }
        });
    }, []);


    const handleComboCreated = (newComboData) => {
        setMyCombos((myCombos) => [...myCombos, newComboData.Combination]);
    };


    function handleComboDeleted(id){
      fetch(`/allcombinations/${id}`, {
        method: "DELETE",
      })
      .then(() => {
        setMyCombos((myCombos) => myCombos.filter((oneCombo) => oneCombo.id !== id));
      })
    }

    return (
        <>
        <div>
          <Heading color={theme.colors.pink}>My Combos</Heading>
        </div>
          <CreateNewCombo 
            onComboCreated={handleComboCreated} 
            user_id = {user_id}>
          </CreateNewCombo>

          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3, xl: 5 }} 
            spacing={4}
          >
            
            {myCombos.map((myCombo) => (
              
              <Box
                key={myCombo.id}
                boxShadow="lg"
                p="6"
                rounded="md"
                overflow="hidden"
              >
                <Heading 
                  fontSize="xl">
                  {myCombo.name}
                </Heading>

                <DeleteIcon 
                  onClick={() => handleComboDeleted(myCombo.id)}>
                </DeleteIcon>

                {/* <EditIcon
                  onClick={() => handleEditCombo(combo.Combination.id)}>
                </EditIcon> */}

                <Box 
                  mt="2" 
                  height="200px" 
                  width="100%" 
                  overflow="hidden" 
                  borderRadius="lg"
                >

                  <Image
                    src={myCombo.image}
                    alt={myCombo.name}
                    objectFit="cover"
                    height="100%"
                    width="100%"
                    borderRadius="lg"
                  />

                </Box>
              </Box>
              ))}
          </SimpleGrid>
        </>
      );
}

export default MyCombos;