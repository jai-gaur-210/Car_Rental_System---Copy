import express from 'express'
import { createRent, deleteRent, retrieveBooked, retrieveMyBooking, retrieveNotBooked, retrieveRent, retrieveRented, updateRent } from '../Controller/rentCrudController.js';
import { requireSignin } from '../Middleware/authMiddleware.js';
const router=express.Router();

//Routes
router.post('/create',requireSignin,createRent);
router.put('/update/:id',requireSignin,updateRent);
router.delete('/delete/:id',requireSignin,deleteRent);
router.get('/All',retrieveRent);
router.get('/NotBooked',retrieveNotBooked);
router.get('/MyBooking/:id',requireSignin,retrieveMyBooking);
router.get('/Booked/:id',requireSignin,retrieveBooked);
router.get('/Rented/:id',requireSignin,retrieveRented);
export default router;