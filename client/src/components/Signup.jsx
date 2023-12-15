import React, {useState} from "react";
import { Button, ChakraProvider, Flex, FormControl, FormHelperText, Heading, Input, InputRightElement, InputGroup, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from "yup";

function Signup({setUser}){

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [signup, setSignup] = useState(true)

    function toggleSignup() {
      setSignup((currentSignup) => !currentSignup )
    }

    const signupSchema = yup.object().shape({
        username: yup.string().min(5, "Too short").max(50, "Too long").required("This field is required"),
        email: yup.string().email("Invalid email"),
        password: yup.string().min(5, "Too short").max(50, "Too long").required("This field is required"),
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
          const endpoint = signup ? '/users' : '/login'
            console.log("i was clicked")
            fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify(values)
            }).then((resp) => {
                if (resp.ok){
                    resp.json().then(({user}) => {
                        setUser(user)
                        //navigate into site
                    })
                } else {
                    console.log("errors? handle them")
                }
            })
        }
    })

return (
  <ChakraProvider>
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      style={{ marginTop: '20px' }}
    >

      <Heading>
        {signup ? 'Already have an account?' : ''}
      </Heading>

      <Button 
        onClick={toggleSignup} 
        size='md'
        height='48px'
        width='200px' 
        colorScheme='teal'>
          {signup ? 'Login' : 'Sign-Up'}
      </Button>

      <div style={{ marginTop: '50px'}}></div>
        <Heading 
          as='h4' 
          size='md'>
            {signup ? 'Or...' : ''}
        </Heading>

      {signup && <Heading align="center">Sign-Up!</Heading>}
      {signup && <Heading align="center">We'd love to dance with you.</Heading>}
    

    <form onSubmit={formik.handleSubmit} >
      <Stack 
        spacing={5} 
        align="center"
      >

        <FormControl 
          align="center"
        >
          <Input
            variant="outline"
            placeholder="Username"
            width="300px"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
          />
          
        </FormControl>

        {signup && <FormControl align="center">
          <Input
            variant="outline"
            placeholder="Email"
            width="300px"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
          <FormHelperText>We'll never share your email</FormHelperText>
        </FormControl>}

        <FormControl align="center">
          <InputGroup justifyContent="center" mx="auto">
            <Input
              variant="outline"
              placeholder="Password"
              width="300px"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type={show ? 'text' : 'password'}
            />

            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" color="teal">Submit</Button>
      </Stack>
    </form>
    </Flex>
  </ChakraProvider>
);
}

export default Signup;