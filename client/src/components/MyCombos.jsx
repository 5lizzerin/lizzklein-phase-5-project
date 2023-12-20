import React, {useState, useEffect} from "react";
import { Box, Heading, Image, SimpleGrid, Text, useTheme } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CreateNewCombo from "./CreateNewCombo";
import EditMyComboModul from "./EditMyComboModal";


function MyCombos({user_id}){
  const [myCombos, setMyCombos] = useState([]);
  const [isOpenArray, setIsOpenArray] = useState([]);
  const theme = useTheme();

    useEffect(() => {
      fetch(`/users/${user_id}/allcombinations`)
        .then((resp) => {
          if (resp.ok) {
              resp.json().then((myCombos) => setMyCombos(myCombos));
          } else {
            console.log('error getting all combos');
          }
        });
    }, [user_id]);

    const handleComboCreated = (newComboData) => {
        setMyCombos((myCombos) => (myCombos === null ? [newComboData.Combination]:[...myCombos, newComboData.Combination]));
    };

    function handleComboDeleted(id){
      fetch(`/allcombinations/${id}`, {
        method: "DELETE",
      })
      .then(() => {
        setMyCombos((myCombos) => myCombos.filter((oneCombo) => oneCombo.id !== id));
      })
    }

    const handleEditCombo = (index) => {
      const updatedIsOpenArray = [...isOpenArray];
      updatedIsOpenArray[index] = true;
      setIsOpenArray(updatedIsOpenArray);
    };

    function onCombinationNamePatch(updatedCombo){
      console.log(updatedCombo)
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
    useEffect(() => {
      setIsOpenArray( myCombos === null ? [] : myCombos.map(() => false));
    }, [myCombos]);

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

      {myCombos === null ? (
        <Text 
          textAlign="center" 
          color={theme.colors.honeysuckle}
          mt={10} 
          mb={10}
          fontSize={25}
          fontStyle="italic"
          >The stage is empty! Create a new combination above to get started.
        </Text>

      ) : myCombos.length === 0 ? (
        <Text
          textAlign="center" 
          color={theme.colors.honeysuckle}
          mt={10} 
          mb={10}
          fontSize={25}
          fontStyle="italic"
          >The stage is empty! Create a new combination above to get started.
      </Text>
      ) : (
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3, xl: 5 }} 
            spacing={4}
          >
            
            {myCombos.map((myCombo, index) => (
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
                  onClick={() => handleEditCombo(index)}>
                </EditIcon>

                <EditMyComboModul 
                  isOpen={isOpenArray[index]} 
                  onClose={() => setIsOpenArray((prev) => [...prev.slice(0, index), false, ...prev.slice(index + 1)])}
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
          )}
        </>
      );
}

export default MyCombos;