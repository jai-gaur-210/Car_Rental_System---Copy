import { Box, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import RentCarModal from '../Components/RentCarModal'
import RentCard from '../Components/RentCard'
import axios from 'axios'
import ClientNavBar from '../Components/ClientNavBar'
import ClientRentCard from '../Components/ClientRentCard'
import { useAuth } from '../context/AuthContext'
import MyBookingCard from '../Components/MyBookingCard'
import AgencyBookedCard from '../Components/AgencyBookedCard'
const Booked = () => {
  const[rent,setRent]=useState([]);
  const{user,setUser}=useAuth();
  const retrieve = async () => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/rent/Booked/${user._id}`);
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
      <NavBar />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'} width={'90%'} marginTop={'20px'} alignItems={'center'} margin={'auto'}>
        {rent?.map((d) => {
          return <AgencyBookedCard  key={d._id} id={d._id} VechileModel={d.VechileModel} VechileNo={d.VechileNo} Capacity={d.Capacity} price={d.price} StartDate={d.StartDate} Days={d.Days} rentedBy={d.rentedBy} />
        })}
      </Box>
    </Box>
  )
}

export default Booked
