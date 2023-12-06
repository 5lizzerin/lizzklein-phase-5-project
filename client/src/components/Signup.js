import React, {useState} from "react";
import { Button, ChakraProvider, FormControl, FormHelperText, Heading, Input, InputRightElement, InputGroup, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from "yup";

function Signup(){

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const signupSchema = yup.object().shape({
        username: yup.string().min(5, "Too short").max(50, "Too long").required("This field is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
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
            console.log(values)
        }
    })

return (
  <ChakraProvider>
    <Heading align="center">Sign-Up</Heading>
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={5} align="center">
        <FormControl align="center">
          <Input
            variant="outline"
            placeholder="Username"
            width="300px"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
          />
        </FormControl>
        <FormControl align="center">
          <Input
            variant="outline"
            placeholder="Email"
            width="300px"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
          <FormHelperText>We'll never share your email</FormHelperText>
        </FormControl>
        <FormControl align="center">
          {/* <InputGroup justifyContent="center" mx="auto"> */}
            <Input
              variant="outline"
              placeholder="Password"
              width="300px"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type={show ? 'text' : 'password'}
            />
            {/* <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement> */}
          {/* </InputGroup> */}
        </FormControl>
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Stack>
    </form>
  </ChakraProvider>
);
}

export default Signup;