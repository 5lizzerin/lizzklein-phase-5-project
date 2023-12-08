import React, {useState, useEffect} from "react";
import { ChakraProvider, Heading, Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from "./Signup";
import Home from "./Home";
import AllCombos from "./AllCombos";
import MyCombos from "./MyCombos"


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/authorized')
    .then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user))
      } else {
        console.log('error')
      }
    })
  }, [])

  function handleLogout(){
    fetch('/logout', {
        method: 'DELETE'
    }).then((resp) => {
        if (resp.ok) {
            setUser(null)
        }
    })
}

  if (!user){
    return <Signup setUser={setUser} />
  }
  return (
    <ChakraProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Heading as='h1' size='4xl' textAlign='center' p='4'>Practique</Heading>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <Link to="/"></Link>
            <Link to="/allcombos"></Link>
            <Link to="/mycombos"></Link>
            <div style={{ marginLeft: 'auto' }}>
              <Button colorScheme='teal' variant='ghost' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allcombos" element={<AllCombos />} />
            <Route path="/mycombos" element={<MyCombos />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
