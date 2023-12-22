import { Box, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import RentCarModal from '../Components/RentCarModal'
import RentCard from '../Components/RentCard'
import axios from 'axios'
import ClientNavBar from '../Components/ClientNavBar'
import ClientRentCard from '../Components/ClientRentCard'
const BookCar = () => {
  const[rent,setRent]=useState([]);
  const retrieve = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/api/rent/NotBooked');
        setRent(data);
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
    retrieve();
}, [])
  return (
    <Box>
      <ClientNavBar />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'} width={'90%'} marginTop={'20px'} alignItems={'center'} margin={'auto'}>
        {rent?.map((d) => {
          return <ClientRentCard retrieve={retrieve} key={d._id} id={d._id} VechileModel={d.VechileModel} VechileNo={d.VechileNo} Capacity={d.Capacity} price={d.price} />
        })}
      </Box>
    </Box>
  )
}

export default BookCar
