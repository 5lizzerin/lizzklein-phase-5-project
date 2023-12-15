import React from "react";
import { Button, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, useTheme} from '@chakra-ui/react';



function MovesDescriptionModal({isOpen, onClose, showMove}){
    const theme = useTheme();

    if (showMove == null)
        return 
    
    const showMoveArray = Object.values(showMove);

    return (
        <div>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} colorScheme="whiteAlpha">
            <ModalOverlay bg="rgba(255, 255, 255, 0.2)" />
            <ModalContent bg="white">
            <ModalHeader>{showMoveArray[3]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Text mb='1rem'>{showMoveArray[0]}</Text>
            <Image src={showMoveArray[2]}></Image>
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