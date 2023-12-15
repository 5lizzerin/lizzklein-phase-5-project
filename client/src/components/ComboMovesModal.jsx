import React from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, useTheme} from '@chakra-ui/react';



function ComboMovesModal({isOpen, onClose, showCombo}){
    const theme = useTheme();

    if (showCombo == null)
        return 
    console.log(showCombo) 

    return (
        <div>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} colorScheme="whiteAlpha">
            <ModalOverlay bg="rgba(255, 255, 255, 0.2)" />
            <ModalContent bg="white">
            <ModalHeader>This combination looks like this:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Text fontWeight='bold' mb='1rem'>{showCombo.combination_moves.map((move, index, array) => (
                <React.Fragment key={index}>
                    {move.move.name}
                    {index !== array.length - 1 && <br />}
                </React.Fragment>
                    ))}
            </Text>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose} color={theme.colors.teal}>Close</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>
    </div>
    )
}

export default ComboMovesModal;