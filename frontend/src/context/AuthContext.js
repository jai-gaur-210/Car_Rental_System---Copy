import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth=createContext();
const AuthContext = ({children}) => {
  const navigate=useNavigate();
    const[user,setUser]=useState({});
    axios.defaults.headers.common["authorization"] = user?.token;
    useEffect(() => {
        const fetchUserData = async () => {
          const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
          setUser(userInfo);
          console.log(user);
        };
        fetchUserData();
      }, [navigate]);
  return (
    <Auth.Provider value={{user,setUser}}>
      {children}
    </Auth.Provider>
  )
}
export const useAuth = () => {
    return useContext(Auth);
  };

export default AuthContext
