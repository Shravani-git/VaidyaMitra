
import express from "express"
import { updatedDoctor,deleteDoctor,getAllDoctor,getSingleDoctor, getDoctorProfile, getAppointmentsByDoctor } from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js'
const router=express.Router()

// nested route
router.use('/:doctorId/reviews',reviewRouter)

router.get('/:id',getSingleDoctor)
router.get('/',getAllDoctor)
router.delete('/:id',authenticate, restrict(["doctor"]),deleteDoctor)
router.put('/:id',authenticate, restrict(["doctor"]),updatedDoctor)
router.get('/profile/me',authenticate,restrict(['doctor']),getDoctorProfile)
router.get("/appointments/:id", authenticate, restrict(["doctor"]), getAppointmentsByDoctor);
export default router;