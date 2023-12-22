import React, { useState } from 'react'
import { Input, VStack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, InputGroup, Button, InputRightElement, useToast, Box,Text
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate, useNavigation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [show, setShow] = useState('');
    const [loading, setLoading] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate=useNavigate();
    const toast=useToast()
    const{user,setUser}=useAuth();
    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !pass) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        // console.log(email, password);
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/auth/login",
            { email, password:pass }
          );
    
          // console.log(JSON.stringify(data));
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setUser(data);
          setLoading(false);
          if(data?.agency){
            navigate('/rentCar');
          }else{
            navigate('/')
          }
        } catch (error) {
          console.log(error);
          toast({
            title: "Error Occured!",
            description: "Something went wrong while login",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      };
    return (
        <Box display={'flex'} height={'100vh'} justifyContent={'center'} alignItems={'center'} bgGradient="linear(to-b, #FFFF99, #baa94c)">
            <Box width={'30%'} marginTop={'3%'} boxShadow='dark-lg' p='6' rounded='md' bg='white'>
                <VStack spacing={'4'}>
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
                    <Button colorScheme='yellow' size='md' onClick={handleSubmit} isLoading={loading}>
                        Login
                    </Button>
                    <Text>-----or Do not have an account !!----</Text>
                    <Button colorScheme='yellow' size='md' onClick={()=>{
                        navigate('/signup')
                    }}>
                        Sign Up
                    </Button>
                </VStack>
            </Box>
        </Box>

    )
}

export default Login
