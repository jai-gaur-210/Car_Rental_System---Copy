import carModel from "../Models/carModel.js";
export const createRent=async(req,res)=>{
    try {
        const {VechileModel,VechileNo,Capacity,price,owner}=req.body;
        const data=await carModel.create({VechileModel,VechileNo,Capacity,price,owner});
        res.status(201).send({
            message:"Rent Added Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateRent=async(req,res)=>{
    try {
        const data=req.body;
        const id=req.params.id;
        const rent=await carModel.findByIdAndUpdate(id,data,{new:true});
        res.status(201).send({
            message:"Data updated successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteRent=async(req,res)=>{
    try {
        const id=req.params.id;
        await carModel.findByIdAndDelete({_id:id});
        res.status(201).send({
            message:"Anime Data deleted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const retrieveRent=async(req,res)=>{
    try {
        const data=await carModel.find({});
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
}

export const retrieveNotBooked=async(req,res)=>{
    try {
        const data=await carModel.find({
            rentedBy: {
              $exists: false
            }
          });
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
}

export const retrieveMyBooking=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await carModel.find({
            rentedBy: id
          }).populate("owner","name");
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
}

export const retrieveBooked=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await carModel.find({
            owner: id,
            rentedBy:{
                $exists: true
              }
          }).populate("rentedBy","name");
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
}

export const retrieveRented=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await carModel.find({
            owner: id,
        }).populate("rentedBy","name");
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
}