import Appointment from "../models/AppointmentSchema.js";
import User from "../models/UserScheme.js";
import Doctor from "../models/DoctorScheme.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
export const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      date,
      time,
      doctorId,
      doctorName,
      reason,
      notes,
    } = req.body;

    const userId = req.userId; 

    if (!patientId || !patientName || !date || !time || !doctorId || !doctorName || !reason || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const isSlotTaken = doctor.bookedSlots?.some(
      (slot) => slot.date === date && slot.time === time
    );

    if (isSlotTaken) {
      return res.status(409).json({ error: "This slot is already booked" });
    }

    const newAppointment = new Appointment({
      appointmentId: uuidv4(),
      patient: { _id: patientId, name: patientName },
      doctorId,
      doctorName,
      schedule: { date, time },
      reason,
      notes,
      userId, 
    });

    await newAppointment.save();

    await User.findByIdAndUpdate(userId, {
      $push: { appointments: newAppointment._id },
    });

    await Doctor.findByIdAndUpdate(doctorId, {
      $push: {
        appointments: newAppointment._id,
        bookedSlots: { date, time, status: "pending" },
      },
    });

    res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ userId });

    res.status(200).json({ success: true, data:appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const appointments = await Appointment.find({ doctorId })
      .populate("userId", "name email") // Populate user who booked it
      .sort({ "schedule.date": 1, "schedule.time": 1 }); // Optional: sort by date/time

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const scheduleAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({ success: false, message: "Appointment is not pending" });
    }

    appointment.status = "scheduled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated to scheduled",
      data: appointment,
    });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({ success: false, message: "Only pending appointments can be canceled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated to canceled",
      data: appointment,
    });
  } catch (err) {
    console.error("Error canceling appointment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
