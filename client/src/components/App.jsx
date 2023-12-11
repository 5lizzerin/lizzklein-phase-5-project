import React, {useState, useEffect} from "react";
import { ChakraProvider, Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from "./Signup";
import Home from "./Home";
import MyCombos from "./MyCombos"
import Header from "./Header";
import CombosContainer from "./CombosContainer"


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
          <Header />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <Link to="/"></Link>
            <Link to="/allcombinations"></Link>
            <Link to="/mycombinations"></Link>
            <div style={{ marginRight: 'auto' }}>
              <Button colorScheme='teal' variant='ghost'>
                <Link to="/">Home</Link>
              </Button>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Button colorScheme='teal' variant='ghost' onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allcombinations" element={<CombosContainer />} />
            <Route path="/mycombinations" element={<MyCombos />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
