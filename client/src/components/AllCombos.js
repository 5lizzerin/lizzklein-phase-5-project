import React, {useEffect, useState} from "react";
import { Box, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';

function AllCombos(){

    const [combo, setCombo] = useState([])

    useEffect(() => {
        fetch("/allcombinations")
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((combo) => setCombo(combo))
          } else {
            console.log('error getting all combos')
          }
        })
      }, [])

    return(
        <>
            <Heading>All Combos</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {combo.map((combo) => (
                        <Box key={combo.id} boxShadow="lg" p="6" rounded="md">
                            <Heading fontSize="xl">{combo.name}</Heading>
                            <Image src={combo.image} alt='plie' borderRadius='lg'/>
                        <Box mt="4">
                {/* Additional details or actions */}
                    </Box>
                </Box>
                ))}
            </SimpleGrid>
      </>
    )
}

export default AllCombos;