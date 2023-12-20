import React, {useState} from "react";
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useTheme} from '@chakra-ui/react';



function EditMyComboModul({isOpen, onClose, id, onCombinationNamePatch}){
    const theme = useTheme();
    const [newCombinationName, setNewCombinationName] = useState("");

    function handleUpdatedCombo(e) {
        fetch(`/allcombinations/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newCombinationName,
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(updatedCombo => {
            onCombinationNamePatch(updatedCombo)
        })
        onClose();
    }

    return (
        <div>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} colorScheme="whiteAlpha">
                <ModalOverlay bg="rgba(255, 255, 255, 0.2)" />
                <ModalContent bg="white">
                    <ModalHeader>Edit combination</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Edit your combination name"
                            value={newCombinationName}
                            onChange={(e) => setNewCombinationName(e.target.value)}
                        ></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={handleUpdatedCombo} 
                            bg={theme.colors.teal}
                            margin="10px"
                            id={id}
                            >Save
                        </Button>
                        <Button onClick={onClose} color={theme.colors.teal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditMyComboModul;