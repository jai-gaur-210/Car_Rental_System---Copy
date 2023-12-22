import React, { useState } from 'react'
import { Checkbox, Input, VStack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, InputGroup, Button, InputRightElement, useToast, Box, Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setconfirmPassword] = useState('');
    const [show, setShow] = useState('');
    const [show1, setShow1] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { user, setUser } = useAuth();
    const handleSubmit = async () => {
        setLoading(true);
        if (!name || !email || !pass || !confirmPass) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (pass != confirmPass) {
            toast({
                title: "Password does not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:8000/api/auth/signup', { name, email, password: pass, agency: isChecked });
            toast({
                title: "Registration Successfull",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            setUser(data);
            if (data?.agency) {
                navigate('/rentCar');
            } else {
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Something went Wrong",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }
    const handleClick = () => setShow(!show)
    const handleClick1 = () => setShow1(!show1)
    return (
        <Box display={'flex'} height={'100vh'} justifyContent={'center'} alignItems={'center'} bgGradient="linear(to-b, #FFFF99, #baa94c)">
            <Box width={'30%'} marginTop={'2%'} boxShadow='dark-lg' p='6' rounded='md' bg='white'>
                <VStack spacing={'4'}>
                    <FormControl id='first-name' isRequired>
                        <FormLabel>
                            Name :
                        </FormLabel>
                        <Input type='text' placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl id='email' isRequired>
                        <FormLabel>Email address :</FormLabel>
                        <Input type='email' placeholder='Enter your Name' onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id='password' isRequired>
                        <FormLabel>Password :</FormLabel>
                        <InputGroup size='md' >
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id='confirm-password' isRequired>
                        <FormLabel>Confirm Password :</FormLabel>
                        <InputGroup size='md' >
                            <Input
                                pr='4.5rem'
                                type={show1 ? 'text' : 'password'}
                                placeholder='Enter password'
                                onChange={(e) => setconfirmPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick1}>
                                    {show1 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Checkbox colorScheme='green' isChecked={isChecked} onChange={(e) => setIsChecked(!isChecked)}>
                        Signup as Rental Agency
                    </Checkbox>
                    <Button colorScheme='yellow' size='md' onClick={handleSubmit} isLoading={loading}>
                        Sign Up
                    </Button>
                    <Text>-----or Aready have an account !!----</Text>
                    <Button colorScheme='yellow' size='md' onClick={() => {
                        navigate('/')
                    }}>
                        Login
                    </Button>
                </VStack>
            </Box>
        </Box>

    )
}

export default Signup
