import React from "react";
import { Box, Button, Flex, Heading, Input, Stack, useTheme } from '@chakra-ui/react';

function CreateNewCombo({onComboCreated}){
    const theme = useTheme();

    // function handleNewCombo(){
    //     console.log("I was clicked")
    //     onComboCreated("New Combo Data")
    // }

    async function handleNewCombo() {
        console.log("creating new combo")
        const combinationName = document.getElementById("combinationName").value;
        const imageURL = document.getElementById("imageURL").value;

        try {
            const response = await fetch("/allcombinations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: combinationName,
                    image: imageURL,
                }),
            });

            if (response.ok) {
                const newComboData = await response.json();
                onComboCreated(newComboData);
            } else {
                console.error("Failed to create a new combination");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(
        <>
        <Box backgroundColor={theme.colors.ivory} padding="10px" rounded="md" boxShadow="lg" margin="50px" width="650px" align="center">            
            <Heading 
                mb={4} 
                color={theme.colors.pink}
                >Create a new Combination
            </Heading>
            <Flex 
                justify="flex-end"
                direction="column">
            </Flex>
            
            <Stack spacing={1} align="center" >
                <Input id="combinationName" width="500px" placeholder="Combination Name:" mb={4} backgroundColor="white" />
                <Input id="imageURL" width="500px" placeholder="Add an image url:" mb={4} backgroundColor="white" />
                <Button width="200px" type="submit" ml={4} color="white" backgroundColor={theme.colors.teal} onClick={handleNewCombo}>Create a new combo</Button>
            </Stack>
        </Box>
        </>
    )

}

export default CreateNewCombo;