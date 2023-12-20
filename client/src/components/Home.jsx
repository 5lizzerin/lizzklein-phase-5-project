import React from "react"
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, useTheme, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Home(){

    const theme = useTheme();
    const navigate = useNavigate();

    function handleAllCombosButton(){
    navigate('/allcombinations')
    }

    function handleMyCombosButton(){
    navigate('/mycombinations')
    }

    function handleAllMovesButton(){
        navigate('/allmoves')
    }


    return (
        <>
            <Box
                height="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg={theme.colors.ivory}
                >
            <Heading 
                color={theme.colors.honeysuckle}
                margin="30px"
                >Welcome! We're glad you're here to dance.
            </Heading>

            <Flex 
                direction='row' 
                justify='space-between' 
                alignContent='center'
            >

                <Card 
                    maxW='sm' 
                    margin="30px" 
                    boxShadow="lg">
                    <CardBody>
                        <Image
                            src='https://www.thelewisfoundation.org/wp-content/uploads/2018/01/On-pointe-1200x800.jpg'
                            alt='Ballet dancer'
                            borderRadius='lg'
                            boxSize="400px"
                            objectFit="cover"
                        />
                        <Stack 
                            mt='6' 
                            spacing='3'>
                            <Heading 
                                size='md' 
                                color={theme.colors.teal} 
                                >All Combinations
                            </Heading>
                            <Text>
                                Browse our database of all ballet combinations as inspiration for your next class!
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup 
                            spacing='2'>
                        <Button 
                            variant='solid' 
                            backgroundColor={theme.colors.teal} 
                            color={theme.colors.ivory} 
                            onClick={handleAllCombosButton}
                            >Browse Now
                        </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>

                <Card 
                    maxW='sm' 
                    margin="30px" 
                    boxShadow="lg">
                    <CardBody>
                        <Image
                            src='https://hips.hearstapps.com/elleuk.cdnds.net/16/35/4000x2661/gallery-1472643677-gettyimages-501836938.jpg?resize=640:*'
                            alt='Ballet dancer'
                            borderRadius='lg'
                            boxSize="400px"
                            objectFit="cover"
                        />
                        <Stack 
                            mt='6' 
                            spacing='3'
                        >
                        <Heading 
                            size='md' 
                            color={theme.colors.teal}
                            >My Combinations
                        </Heading>
                        <Text>
                            View combinations you've saved and created, as well as edit existing combinations to prepare for your next class.
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup 
                        spacing='2'>
                        <Button 
                            variant='solid' 
                            backgroundColor={theme.colors.teal} 
                            color={theme.colors.ivory} 
                            onClick={handleMyCombosButton}
                            >Take me to My Combinations
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>

            <Card 
                maxW='sm' 
                margin="30px" 
                boxShadow="lg">
                <CardBody>
                    <Image
                        src='https://hips.hearstapps.com/hmg-prod/images/gettyimages-174735550-1485733066.jpg?crop=0.892xw:1.00xh;0.0546xw,0&resize=1200:*'
                        alt='Ballet dancers'
                        borderRadius='lg'
                        boxSize="400px"
                        objectFit="cover"
                    />
                    <Stack 
                        mt='6' 
                        spacing='3'>
                        <Heading 
                            size='md' 
                            color={theme.colors.teal} 
                            >All Moves
                        </Heading>
                        <Text>
                            Brush up on your ballet terminology with our move dictionary.
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup 
                        spacing='2'>
                    <Button 
                        variant='solid' 
                        backgroundColor={theme.colors.teal} 
                        color={theme.colors.ivory} 
                        onClick={handleAllMovesButton}
                        >See All Moves
                    </Button>
                    </ButtonGroup>
                </CardFooter>
                </Card>
        </Flex>
        </Box>
        </>
    )
}

export default Home;