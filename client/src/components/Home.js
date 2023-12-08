import React from "react"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';




function Home(){

    const navigate = useNavigate();

    function handleAllCombosButton(){
    navigate('/allcombinations')
    }

    function handleMyCombosButton(){
    navigate('/mycombinations')
    }


    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Heading>Welcome!</Heading>
            <Flex direction='row' justify='space-between' alignContent='center'>
                <Card maxW='sm'>
                <CardBody>
                    <Image
                    src='https://www.thelewisfoundation.org/wp-content/uploads/2018/01/On-pointe-1200x800.jpg'
                    alt='Ballet dancer'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>All Combinations</Heading>
                    <Text>
                        Browse our database of all ballet combinations as inspiration for your next class!
                    </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='teal' onClick={handleAllCombosButton}>Browse Now</Button>
                    </ButtonGroup>
                </CardFooter>
                </Card>

                <Card maxW='sm'>
                <CardBody>
                    <Image
                    src='https://hips.hearstapps.com/elleuk.cdnds.net/16/35/4000x2661/gallery-1472643677-gettyimages-501836938.jpg?resize=640:*'
                    alt='Ballet dancer'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>My Combinations</Heading>
                    <Text>
                        View combinations you've saved and created, as well as edit existing combinations to prepare for your next class.
                    </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='teal' onClick={handleMyCombosButton}>Take me to My Combinations</Button>
                    </ButtonGroup>
                </CardFooter>
                </Card>
            </Flex>
        </div>
    )
}

export default Home;