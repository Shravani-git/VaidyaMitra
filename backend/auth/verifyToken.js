import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorScheme.js'
import User from '../models/UserScheme.js'

export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;
  
    if (!authToken || !authToken.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
  
    try {
      const token = authToken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
  
      // Attach decoded user info to request
      req.userId = decoded.id;
      console.log("Decoded token:", decoded);
      req.userRole = decoded.role; // NOTE: Changed this to avoid confusion later
      console.log("req.userId:", req.userId);

      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token is expired' }); // Fix: jon → json
      }
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };

  export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;
    const role = req.userRole;
  
    let user = null;
  
    try {
      if (role === "patient") {
        user = await User.findById(userId);
      } else if (role === "doctor") {
        user = await Doctor.findById(userId);
      }
  
      if (!user || !roles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this route"
        });
      }
  
      req.user = user; // Optional: attach full user for use in route handler
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error during role check" });
    }
  };





  