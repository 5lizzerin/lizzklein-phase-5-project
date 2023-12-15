import React, {useState, useEffect} from "react";
import { Box, Heading, Image, SimpleGrid, theme } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CreateNewCombo from "./CreateNewCombo";

function MyCombos({removeCombination, user_id}){
  // console.log(user_id)

    const [myCombo, setMyCombo] = useState(null)
    const [combos, setCombos] = useState([])


    const getMyCombos= () => {
      fetch(`/users/${user_id}/allcombinations`)
      .then(r => r.json())
      .then(usersCombos => setMyCombo(usersCombos))
    }

    useEffect( getMyCombos , [])

    // my_combo = Combination.user_id
    // if my_combo == current user_id, setMyCombo(myCombo)
    // find the current logged in user's id, find the combinations that match that id. set the state to that user's combos


    // DELETE A COMBO
    const handleComboCreated = (newComboData) => {
      console.log("I was clicked")
        setMyCombo(newComboData);
        setCombos((prevCombos) => [...prevCombos, newComboData]);
    };

    const handleComboDeleted = (id) => {
      console.log("i was clicked!")
      fetch(`/allcombinations/${id}`, {
        method: "DELETE"
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete combination with id ${id}`);
        }
        return response;
      })
      .then(() => removeCombination(id))
    };

    const handleEditCombo = (id) => {
      console.log("i was clicked!")
    }


    return (
        <>
        <div>
          <Heading color={theme.colors.pink}>My Combos</Heading>
        </div>
          <CreateNewCombo onComboCreated={handleComboCreated} user_id = {user_id}></CreateNewCombo>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={4}>

            {combos.map((combo) => (

              <Box
                key={combo.Combination.id}
                boxShadow="lg"
                p="6"
                rounded="md"
                overflow="hidden"
              >
                <Heading 
                  fontSize="xl">
                    {combo.Combination.name}
                </Heading>

                <DeleteIcon 
                  onClick={() => handleComboDeleted(combo.Combination.id)}>
                </DeleteIcon>

                <EditIcon
                  onClick={() => handleEditCombo(combo.Combination.id)}>
                </EditIcon>

                <Box 
                  mt="2" 
                  height="200px" 
                  width="100%" 
                  overflow="hidden" 
                  borderRadius="lg"
                >

                  <Image
                    src={combo.Combination.image}
                    alt={combo.Combination.name}
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