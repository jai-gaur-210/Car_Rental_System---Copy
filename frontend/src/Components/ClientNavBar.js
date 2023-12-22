import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext';

const ClientNavBar = () => {
    console.log(useAuth());
    const{user,setUser}=useAuth();
    const toast=useToast();
    const handleLogout=()=>{
        localStorage.removeItem('userInfo');
        setUser({});
        toast({
            title: "Logout Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
    }
    return (
        <>
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary navbarcolor" style={{padding:0}}> 
        <div style={{backgroundColor: '#f5e65f',padding: "8px"}} className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" style={{padding:'10px'}}>
            <Link to="/" className="navbar-brand" style={{ fontSize:'30px',fontWeight:'unset'}} >SwiftCars</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item" >
                <NavLink to="/" className="nav-link" aria-current="page" style={{color: "#0a5c5f",fontSize:'20px',fontWeight:'unset'}}>Home</NavLink>
              </li>
              <li className="nav-item" >
                <NavLink to="/MyBookings" className="nav-link" aria-current="page" style={{color: "#0a5c5f",fontSize:'20px',fontWeight:'unset'}}>My Bookings</NavLink>
              </li>

              {!user && <li className="nav-item">
                <NavLink to="/signup" className="nav-link" style={{color: "#0a5c5f",fontSize:'20px',fontWeight:'unset'}}>SignUp</NavLink>
              </li>}
              {!user && <li className="nav-item">
                <NavLink to="/login" className="nav-link" style={{color: "#0a5c5f",fontSize:'20px',fontWeight:'unset'}}>Login</NavLink>
              </li>}
              {user && <li className="nav-item dropdown ">
                <NavLink className="nav-link dropdown-toggle dropdesign"  style={{color: "#0a5c5f",fontSize:'20px',fontWeight:'unset'}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink onClick={handleLogout} className="dropdown-item" to="/login" style={{color: "#0a5c5f",fontSize:'20px',fontWeight:'unset'}} >Logout</NavLink>
                  </li>
                </ul>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      </>
    );

}

export default ClientNavBar
