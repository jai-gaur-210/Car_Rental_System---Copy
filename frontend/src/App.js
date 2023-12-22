import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom'
import Login from './Pages/Login.js';
import Signup from './Pages/Signup.js';
import RentCar from './Pages/RentCar.js';
import BookCar from './Pages/BookCar.js';
import MyBooking from './Pages/MyBooking.js';
import Booked from './Pages/Booked.js';
import { useAuth } from './context/AuthContext.js';
function App() {
  const{user}=useAuth();
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/rentCar' element={(user && user?.agency)?<RentCar/>:<Navigate to="/" />}/>
      <Route path='/MyBookings' element={(user && !user?.agency)?<MyBooking/>:<Navigate to="/rentCar" />}/>
      <Route path='/Booked' element={(user && user?.agency)?<Booked/>:<Navigate to="/" />}/>
      <Route path='/' element={<BookCar/>}/>
    </Routes>
  );
}

export default App;
