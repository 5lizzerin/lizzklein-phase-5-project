import React, {useState} from "react";
import {ChakraProvider } from '@chakra-ui/react'
import Signup from "./Signup";
import Home from "./Home";
import Header from "./Header";

function App() {
  const [user, setUser] = useState(null)


  if (!user){
    return <Signup setUser={setUser} />
  }
  return (
    <div>
      <ChakraProvider>
        <p>in the site</p>
        <Header />
        <Home />
      </ChakraProvider>
    </div>
  )
}

export default App;
