// models/appointment.model.js
import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  
  patient: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
  },

  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  doctorName: { type: String, required: true },

  status: {
    type: String,
    enum: ["pending", "cancelled",  "scheduled"],
    default: "pending",
  },

  schedule: {
    date: { type: String, required: true },
    time: { type: String, required: true },
  },

  reason: { type: String, required: true },
  notes: { type: String },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
