
import express from "express"
import { updatedUser,deleteUser,getAllUser,getSingleUser,getUserProfile} from "../Controllers/userConroller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router=express.Router()
// router.get("/:userId/appointments", getUserAppointments);
router.get('/:id',authenticate, restrict(["patient"]),getSingleUser)
router.get('/',authenticate, restrict(["admin"]),getAllUser)
router.delete('/:id',authenticate, restrict(["patient"]),deleteUser)
router.put('/:id',authenticate, restrict(["patient"]),updatedUser)
router.get('/profile/me',authenticate, restrict(["patient"]),getUserProfile)
console.log("✅user.js routes loaded");
// router.get("/appointments", authenticate, restrict(["patient"]), getUserAppointments);
export default router;