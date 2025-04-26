

import User from '../models/UserScheme.js'
import Appointment from '../models/AppointmentSchema.js'
import Booking from '../models/BookingScheme.js'
import Doctor from '../models/DoctorScheme.js'
export const updatedUser =async(req,res)=>{
    const id =req.params.id
    try{
       const updatedUser =await User.findByIdAndUpdate(id,{$set:req.body},{new:true})

       res.status(200).json({success:true,message:"Successfully updated",data:updatedUser})
    }
    catch(err){
        res.status(500).json({success:false,message:"Failed to update"})
    }
}


export const deleteUser =async(req,res)=>{
    const id =req.params.id
    try{
       await User.findByIdAndDelete(id)

       res.status(200).json({success:true,message:"Successfully deleted"})
    }
    catch(err){
        res.status(500).json({success:false,message:"Failed to delete"})
    }
}


export const getSingleUser =async(req,res)=>{
    const id =req.params.id
    try{
       const user =await User.findById(id).select("-password");

       res.status(200).json({success:true,message:"User found",data:user})
    }
    catch(err){
        res.status(404).json({success:false,message:"No user found"})
    }
}


// export const getAllUser =async(req,res)=>{
    
//     try{
//        const users =await User.find({})

//        res.status(200).json({success:true,message:"Users found",data:user})
//     }
//     catch(err){
//         res.status(404).json({success:false,message:"Not found"})
//     }
// }

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
      const user = await User.findById(userId); // Capital U!
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const { password, ...rest } = user._doc;
      res.status(200).json({ success: true, message: 'profile info', data: { ...rest } });
    } catch (err) {
      console.error("Error in getUserProfile:", err.message); // add this for better debugging
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };

  
  // export const getUserAppointments = async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  
  //     const user = await User.findById(userId).populate("appointments");
  
  //     if (!user) {
  //       return res.status(404).json({ success: false, message: "User not found" });
  //     }
  
  //     res.status(200).json({ success: true, appointments: user.appointments });
  //   } catch (err) {
  //     console.error("Error fetching user appointments:", err);
  //     res.status(500).json({ success: false, message: "Server error" });
  //   }
  // };

  