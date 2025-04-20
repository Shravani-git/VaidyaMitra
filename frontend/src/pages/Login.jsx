import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg01 from "../assets/images/doctor01.png"; // Import your image
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading,setLoading]=useState(false);
  const  navigate=useNavigate()
  const {dispatch} =useContext(AuthContext)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
      event.preventDefault();
      setLoading(true);

      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        
        if (!res.ok) {
          throw new Error(result.message);
        }

        dispatch({
          type:'LOGIN_SUCCESS',
          payload:{
            user:result.data,
            role:result.role,
            token:result.token,
          }
        })

        // localStorage.setItem("userPhoto", result.data.photo);
        console.log(result,'login data')
  
        setLoading(false);
        toast.success(result.message);
        navigate("/home");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    };

  return (
    <section className="hero__section h-screen flex flex-col lg:flex-row justify-between items-center">
      {/* Image Section */}
      <div className="hidden lg:block w-1/2 h-full">
        <img
          src={heroImg01}
          className="w-full h-full object-contain"
          alt="Doctor"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex justify-center items-center h-full px-1 lg:px-0">
        <div className="w-full max-w-[570px] mx-auto md:p-10 p-6">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-5">
            Welcome!
          </h3>
          <p className="text__para text-textColor text-[22px] leading-6 mb-10">
            Schedule your Appointment
          </p>
          <form onSubmit={submitHandler} className="py-4 md:py-0">
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-3 border-b border-solid bg-inherit border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-3 border-b border-solid bg-inherit border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              />
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-2 py-3"
              >
                {loading ? <HashLoader size={25} color="#fff"/>:'Login'}
              </button>
            </div>
            <p className="mt-5 text-textColor text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primaryColor font-medium ml-1"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
