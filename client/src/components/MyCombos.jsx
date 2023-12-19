import React, {useState, useEffect} from "react";
import { Box, Heading, Image, SimpleGrid, Text, useTheme } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CreateNewCombo from "./CreateNewCombo";
import EditMyComboModul from "./EditMyComboModal";


function MyCombos({user_id}){
  const [myCombos, setMyCombos] = useState([]);

  // OLD STATE
  // const { isOpen, onOpen, onClose } = useDisclosure()

  // NEW STATE
  const [isOpenArray, setIsOpenArray] = useState([]);

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
    }, [user_id]);


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

    // OLD HANDLE EDIT COMBO
    // function handleEditCombo(id){
    //   onOpen(id);
    // }



    // NEW HANDLE EDIT COMBO
    const handleEditCombo = (index) => {
      // Set the specific modal state to true
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
    // NEW CODE FOR FIXING IS OPEN ARRAYS
    useEffect(() => {
      // Initialize the isOpenArray based on the number of combos
      setIsOpenArray(myCombos.map(() => false));
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

                  // OLD EDIT ICON STUFF
                  // onClick={() => handleEditCombo(myCombo.id)}
                  // id={myCombo.id}
                  onClick={() => handleEditCombo(index)}
                >
                  {/* {console.log(myCombo.id)} */}
                </EditIcon>

                <EditMyComboModul 
                  isOpen={isOpenArray[index]} 
                  // Use the specific modal state
                  onClose={() => setIsOpenArray((prev) => [...prev.slice(0, index), false, ...prev.slice(index + 1)])}
                  id={myCombo.id}
                  onCombinationNamePatch={onCombinationNamePatch} 
                  // OLD EDIT MY COMBO STUFF
                  // isOpen={isOpen} 
                  // onClose={onClose}
                  // id={myCombo.id}
                  // onCombinationNamePatch={onCombinationNamePatch}
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