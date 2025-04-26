// routes/appointment.js
import express from "express";
import { createAppointment, getAppointmentsByUser , getAppointmentsByDoctor, scheduleAppointment, cancelAppointment} from "../Controllers/appointmentController.js";
import { authenticate } from "../auth/verifyToken.js";
const router = express.Router();

router.get("/user/:userId",authenticate, getAppointmentsByUser);
// Route using the controller
router.get("/doctor/:doctorId",authenticate, getAppointmentsByDoctor);


router.put("/schedule/:appointmentId", scheduleAppointment);
router.put("/cancel/:appointmentId", cancelAppointment);

router.post("/create",authenticate ,createAppointment);
export default router;

