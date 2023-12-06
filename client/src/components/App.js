import React from "react";
import { Heading, ChakraProvider } from '@chakra-ui/react'


import Signup from "./Signup";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Heading>Practique</Heading>
        <Signup/>
      </ChakraProvider>
    </div>
  )
}

export default App;
