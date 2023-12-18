import React, {useState, useEffect} from "react";
import { Box, Heading, Image, SimpleGrid, Text, useTheme, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CreateNewCombo from "./CreateNewCombo";
import EditMyComboModul from "./EditMyComboModal";

function MyCombos({user_id}){
  const [myCombos, setMyCombos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const theme = useTheme();

    useEffect(() => {
      fetch(`/users/${user_id}/allcombinations`)
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((myCombos) => setMyCombos(myCombos));
          } else {
            // console.log('error getting all combos');
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

    function handleEditCombo(){
      onOpen();
    }

    function onCombinationNamePatch(updatedCombo){
      setMyCombos((myCombos) => {
        return myCombos.map((combo) => {
          if(combo.id === updatedCombo.id) {
            return updatedCombo
          } else {
            return combo
          }
        })
      })
    }

    return (
        <>
        <div>
          <Heading
            textAlign="center" 
            color={theme.colors.honeysuckle}
            >My Combinations
          </Heading>
          <Text
            textAlign="center" 
            color={theme.colors.honeysuckle} 
            mb={8}
            >Add, edit, or archive your own combinations. These will also appear in All Combinations once they're created.
        </Text>
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
                  margin="10px" 
                  onClick={() => handleComboDeleted(myCombo.id)}>
                </DeleteIcon>

                <EditIcon
                  onClick={() => handleEditCombo(myCombo.id)}
                  id={myCombo.id}
                >
                </EditIcon>
                <EditMyComboModul 
                  isOpen={isOpen} 
                  onClose={onClose}
                  id={myCombo.id}
                  onCombinationNamePatch={onCombinationNamePatch} 
                />

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