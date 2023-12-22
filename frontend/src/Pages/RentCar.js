import { Box, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import RentCarModal from '../Components/RentCarModal'
import RentCard from '../Components/RentCard'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
const RentCar = () => {
  const [rent, setRent] = useState([]);
  const toast = useToast();
  const{user}=useAuth();
  const retrieve = async () => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/rent/Rented/${user._id}`);
        setRent(data);
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
    retrieve();
}, [])
const handleDelete=async(id)=>{
  try {
      const { data } = await axios.delete(`http://localhost:8000/api/rent/delete/${id}`);
      retrieve();
      toast({
          title: 'Rented Car Deleted.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
  } catch (error) {
      console.log(error);
  }
}
  return (
    <Box>
      <NavBar />
      <Box boxShadow='dark-lg' width={'12%'} margin={'auto'} marginTop={'1%'} p='6' rounded='md' bg='white' display={'flex'} flexDirection={'row'}>
        <RentCarModal retrieve={retrieve} />
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'} width={'90%'} marginTop={'20px'} alignItems={'center'} margin={'auto'}>
        {rent?.map((d) => {
          return <RentCard retrieve={retrieve} key={d._id} id={d._id} VechileModel={d.VechileModel} VechileNo={d.VechileNo} Capacity={d.Capacity} price={d.price} delete={() => handleDelete(d._id)} />
        })}
      </Box>
    </Box>
  )
}

export default RentCar
