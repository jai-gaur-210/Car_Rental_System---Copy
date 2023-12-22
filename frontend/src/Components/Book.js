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
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Book = (props) => {
    const [StartDate, setStartDate] = useState('');
    const [Days, setDays] = useState(0);
    const{user,setUser}=useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const navigate=useNavigate();
    const handleSubmit = async () => {
        if(!user){
            toast({
                title: 'Inadequate Access.',
                description: "Please Login to Rent Car.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            navigate('/login');
        }
        if(user?.agency){
            toast({
                title: 'Inadequate Access.',
                description: "Cannot Rent Car With agency Account.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            return;
        }
        try {
            console.log("hello");
            if (!StartDate|| !Days) {
                toast({
                    title: 'Inadequate Data.',
                    description: "Please fill all section.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                return;
            }
            const res = await axios.put(`http://localhost:8000/api/rent/update/${props.id}`, { StartDate,Days,rentedBy:user._id });
            toast({
                title: 'Booked Successfully',
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
            <Button onClick={onOpen} variant='solid' colorScheme='yellow'>Book</Button>
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
                            <FormLabel>Start Date</FormLabel>
                            <Input  type='Date' value={StartDate} onChange={(e) => setStartDate(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Days</FormLabel>
                            <Input placeholder='Days' type='number' value={Days} onChange={(e) => setDays(e.target.value)} />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Book
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Book
