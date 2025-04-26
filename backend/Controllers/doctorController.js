
import Appointment from "../models/AppointmentSchema.js";
import Doctor from "../models/DoctorScheme.js";
import Booking from "../models/BookingScheme.js";
export const updatedDoctor =async(req,res)=>{
    const id =req.params.id
    try{
       const updatedDoctor =await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true})

       res.status(200).json({success:true,message:"Successfully updated",data:updatedDoctor})
    }
    catch(err){
        res.status(500).json({success:false,message:"Failed to update"})
    }
}


export const deleteDoctor =async(req,res)=>{
    const id =req.params.id
    try{
       await Doctor.findByIdAndDelete(id)

       res.status(200).json({success:true,message:"Successfully deleted"})
    }
    catch(err){
        res.status(500).json({success:false,message:"Failed to delete"})
    }
}


export const getSingleDoctor =async(req,res)=>{
    const id =req.params.id
    try{
       const doctor =await Doctor.findById(id).populate('reviews').select("-password");

       res.status(200).json({success:true,message:"Doctor found",data:doctor})
    }
    catch(err){
        res.status(404).json({success:false,message:"No Doctor found"})
    }
}


// export const getAllDoctor =async(req,res)=>{
    
//     try{
//        const Doctors =await Doctor.find({})

//        res.status(200).json({success:true,message:"Doctors found",data:Doctor})
//     }
//     catch(err){
//         res.status(404).json({success:false,message:"Not found"})
//     }
// }

export const getAllDoctor = async (req, res) => {


    try {

        const {query} =req.query
        let doctors;

        if(query){
            doctors=await Doctor.find({isApproved:'approved',$or:[{name:{$regex:query,$options:'i'}},{specialization:{$regex:query,$options:'i'}}]}).select("-password");
        }
        else{
            doctors = await Doctor.find({isApproved:'approved'}).select("-password");

        }

        res.status(200).json({ success: true, message: "Doctors found", data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getDoctorProfile =async(req,res)=>{

    const doctorId =req.userId
    try{
       const doctor =await Doctor.findById(doctorId)
   
       if(!doctor){
           return res.status(404).json({success:false,message:'Doctor not found'})
       }
       const{password, ...rest}=doctor._doc
       const appointments = await Booking.find({doctor:doctorId})
       res.status(200).json({success:true,message:'profile info',data:{...rest,appointments}})
   
    }
    catch(err){
       res.status(500).json({success:false,message:'Something went wrong'})
    }
   
}


// GET /api/appointments/doctor
// export const getDoctorAppointments = async (req, res) => {
//     try {
//       const appointments = await Appointment.find({ doctorId: req.userId })
//         .populate("userId", "name email") // to show patient details
//         .sort({ "schedule.date": -1 });
  
//       res.status(200).json({
//         success: true,
//         message: "Doctor appointments fetched",
//         data: appointments,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Server error while fetching doctor appointments",
//       });
//     }
//   };
  
// GET /appointments/doctor/:doctorId
export const getAppointmentsByDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      const appointments = await Appointment.find({ doctorId });
  
      res.status(200).json({ success: true, data: appointments });
    } catch (err) {
      console.error("Error fetching appointments for doctor:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  