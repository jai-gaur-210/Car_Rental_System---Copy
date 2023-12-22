import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    finalRef,
    initialRef, FormControl,
    FormLabel,
    Input,
    Textarea
} from '@chakra-ui/react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react';
const Update = (props) => {
    const [VechileModel, setVechileModel] = useState('');
    const [VechileNo, setVechileNo] = useState('');
    const [Capacity, setCapacity] = useState(0);
    const [price, setprice] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    useEffect(() => {
        setVechileModel(props.VechileModel);
        setVechileNo(props.VechileNo);
        setCapacity(props.Capacity);
        setprice(props.price);
    }, [])
    const handleSubmit = async () => {
        try {
            console.log("hello");
            if (!VechileModel|| !VechileNo || !Capacity || !price) {
                toast({
                    title: 'Inadequate Data.',
                    description: "Please fill all section.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                return;
            }
            const res = await axios.put(`http://localhost:8000/api/rent/update/${props.id}`, { VechileModel,VechileNo,Capacity,price });
            toast({
                title: 'Anime Updated.',
                description: "We've Updated your Anime for you.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            props.retrieve();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme='yellow'>Update</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rent New Car</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>VechileModel</FormLabel>
                            <Input placeholder='VechileModel' type='text' value={VechileModel} onChange={(e) => setVechileModel(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>VechileNo</FormLabel>
                            <Input placeholder='VechileNo' type='text' value={VechileNo} onChange={(e) => setVechileNo(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Capacity</FormLabel>
                            <Input
                                type='number'
                                value={Capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                placeholder='Capacity '
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                type='number'
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                                placeholder='Price '
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Update
