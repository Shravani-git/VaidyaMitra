
import express from "express"
import { updatedUser,deleteUser,getAllUser,getSingleUser,getUserProfile,getMyAppointments } from "../Controllers/userConroller.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router=express.Router()

router.get('/:id',authenticate, restrict(["patient"]),getSingleUser)
router.get('/',authenticate, restrict(["admin"]),getAllUser)
router.delete('/:id',authenticate, restrict(["patient"]),deleteUser)
router.put('/:id',authenticate, restrict(["patient"]),updatedUser)
router.get('/profile/me',authenticate, restrict(["patient"]),getUserProfile)
router.get('appointments/my-appointments',authenticate, restrict(["patient"]),getMyAppointments)

export default router;