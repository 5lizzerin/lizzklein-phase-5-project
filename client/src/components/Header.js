import React from "react";
import { Heading } from '@chakra-ui/react'


function Header(){

    return (
        <div display='flex' justifyContent='center' alignItems='flex-start' h='100vh'>
        <Heading as='h1' size='4xl'>Practique</Heading>
        </div>
    )
}

export default Header;