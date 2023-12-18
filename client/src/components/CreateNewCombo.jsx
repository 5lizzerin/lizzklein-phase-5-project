import React, {useState} from "react";
import { Box, Button, Flex, Heading, Input, Stack, useTheme } from '@chakra-ui/react';

function CreateNewCombo({onComboCreated, user_id}){
    const theme = useTheme();
    const [combinationName, setCombinationName] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [move1, setMove1] = useState("")

    async function handleNewCombo() {
        const combinationName = document.getElementById("combinationName").value;
        const imageURL = document.getElementById("imageURL").value;

        try {
            const response = await fetch(`/users/${user_id}/allcombinations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: combinationName,
                    image: imageURL,
                    user_id: user_id
                }),
            });

            if (response.ok) {
                const newComboData = await response.json();
                onComboCreated(newComboData);
                setCombinationName("");
                setImageURL("");
            } else {
                console.error("Failed to create a new combination");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(
        <>
        <Box 
            backgroundColor={theme.colors.ivory} 
            padding="10px" 
            rounded="md" 
            boxShadow="lg" 
            margin="50px" 
            width="650px" 
            align="center"
        >            
            <Heading 
                mb={4} 
                color={theme.colors.pink}
                >Create a new Combination
            </Heading>
            <Flex 
                justify="flex-end"
                direction="column">
            </Flex>
            
            <Stack 
                spacing={1} 
                align="center" 
            >
                <Input 
                    placeholder="Combination Name (you can change this later)"
                    id="combinationName"
                    value={combinationName}
                    onChange={(e) => setCombinationName(e.target.value)} 
                    width="500px" 
                    mb={4} 
                    backgroundColor="white" 
                />
                <Input 
                    id="imageURL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)} 
                    width="500px" 
                    placeholder="Give your combination an image to remember it by" 
                    mb={4} 
                    backgroundColor="white" 
                />
                {/* <Input
                    id="move1"
                    value={move1}
                    onChange={(e) => setMove1(e.target.value)}
                    width="500px"
                    placeholder="Add the first move"
                    mb={4}
                    backgroundColor="white"
                /> */}
                <Button 
                    width="200px" 
                    type="submit" 
                    ml={4} 
                    color="white" 
                    backgroundColor={theme.colors.teal} 
                    onClick={handleNewCombo}
                    >Create a new combo
                </Button>
            </Stack>
        </Box>
        </>
    )

}

export default CreateNewCombo;