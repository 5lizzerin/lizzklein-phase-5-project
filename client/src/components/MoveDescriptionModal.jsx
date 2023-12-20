import React from "react";
import { Button, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, useTheme} from '@chakra-ui/react';

function MovesDescriptionModal({isOpen, onClose, showMove}){
    const theme = useTheme();

    if (showMove == null)
        return 
    
    return (
        <div>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} colorScheme="whiteAlpha">
            <ModalOverlay bg="rgba(255, 255, 255, 0.2)" />
            <ModalContent bg="white">
            <ModalHeader>{showMove.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Text mb='1rem'>{showMove.description}</Text>
            <Image src={showMove.image}></Image>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose} color={theme.colors.teal}>Close</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>
    </div>
    )
}

export default MovesDescriptionModal;