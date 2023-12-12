import React from "react";
import { Box, Heading, Image, useTheme } from '@chakra-ui/react'



function Header(){

    const theme = useTheme()

    return (
        <Box display='flex' justifyContent='center' alignItems='center' height='10vh'>
            <Heading as='h1' size='4xl' colorScheme={theme.colors.pink}>Practique</Heading>
            <Box mt="2" height="100px" width="100px" borderRadius="sm">
                <Image src="https://img.freepik.com/premium-vector/pointe-shoes-ballet-shoes-pointe-shoes-vector-sketch-white-background_231873-3834.jpg" alt='Ballet shoes' />
            </Box>
        </Box>
      );
}

export default Header;