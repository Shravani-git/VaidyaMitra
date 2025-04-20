import User from '../models/UserScheme.js'
import Doctor from '../models/DoctorScheme.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{
        expiresIn:"15d",
    })
}

// export const register =async(req,res)=>{

//     const { email , password, name, role, photo, gender} = req.body
//     try{
//        let user =null
//        if(role==='patient'){
//         user=await User.findOne({email})
//        }
//        else if(role==='patient'){
//         user=await Doctor.findOne({email})
//        }
//        //check if user already exists

//        if(user){
//         return res.status(400).json({message:'User already exist'})
//        }

//        //hash password
//        const salt=await bcrypt.genSalt(10)
//        const hashPassword =await bcrypt.hash(password, salt)

//        if(role==='patient'){
//         user=new User({
//             name, 
//             email, 
//             password:hashPassword ,
//             photo,
//             gender,
//             role
//         })
//        }
//        if(role==='doctor'){
//         user=new Doctor({
//             name, 
//             email, 
//             password:hashPassword ,
//             photo,
//             gender,
//             role
//         })
//        }

//        await user.save()

//        res.status(200).json({success:true, message:"User successfully created"})
//     }catch(err){
//         res.status(500).json({success:false, message:"Internal server error, Try again"})
//     }
// }

export const register = async (req, res) => {
    try {
        const { email, password, name, role, photo, gender } = req.body;

        // Validate request body
        if (!email || !password || !name || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let user = null;

        // Check if user already exists
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        } else if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        await user.save();

        res.status(200).json({ success: true, message: "User successfully created" });

    } catch (err) {
        console.error(err);  // Log the actual error for debugging
        res.status(500).json({ success: false, message: "Internal server error, Try again" });
    }
};

// export const login =async(req,res)=>{
//     const {email, password}= req.body
    
//     try{
//         let user = null
//         const patient = await User.findOne({email})
//         const doctor = await Doctor.findOne({email})

//         if(patient){
//             user=patient
//         }
//         if(doctor){
//             user=doctor
//         }
//         //Check if user exists or not

//         if(!user){
//             return res.status(404).json({message:"User not found"});

//         }

//         //compare password
//         const isPasswordMatch=await bcrypt.compare(password,user.password)
//         if(!isPasswordMatch){
//             return res.status(400).json({message:"Invalid credentials"});
//         }

//         //get tolen
//         const token = generateToken(user)
//         const {password,role,appointments,...rest}=user._doc;

//         res.status(200).json({
//             status:true,
//             message:"Successfully login",
//             token,
//             data:{...rest},
//             role,
//         })

//     }catch(err){
//        res.status(500).json({status:false,message:"Failed to login"})
//     }
// }

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Email and password are required" });
        }

        let user = await User.findOne({ email }) || await Doctor.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user);
        if (!token) {
            return res.status(500).json({ status: false, message: "Failed to generate token" });
        }

        // Extract user data
        const { password: _, role, appointments, ...rest } = user.toObject(); // Use toObject() to avoid _doc issue

        res.status(200).json({
            status: true,
            message: "Successfully logged in",
            token,
            data: rest,
            role,
        });

    } catch (err) {
        console.error("Login Error:", err); // Log the actual error
        res.status(500).json({ status: false, message: "Failed to login" });
    }
};