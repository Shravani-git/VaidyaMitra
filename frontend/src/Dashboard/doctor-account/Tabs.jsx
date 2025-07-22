import {useContext} from 'react'
import {BiMenu} from 'react-icons/bi'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Tabs = ({tab,setTab}) => {

    const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    localStorage.removeItem('userPhoto');
  };

  return (
    <div>
  {/* <span className="flex lg:hidden">
    <BiMenu  className="w-6 h-6 cursor-pointer" />
  </span> */}

  <div className=" flex flex-col p-[30px] bg-white shadow-md items-center h-max rounded-md">
    <div className=" flex flex-row lg:flex-col p-[30px] bg-white items-center h-max">
    <button
    onClick={()=>setTab('overview')}
      className={`${
        tab === "overview"
          ? "bg-indigo-100 text-primaryColor"
          : "bg-transparent text-headingColor"
      } w-full btn mt-0 rounded-md`}
    >
      Overview
    </button>

    <button
    onClick={()=>setTab('appointments')}
      className={`${
        tab === "appointments"
          ? "bg-indigo-100 text-primaryColor"
          : "bg-transparent text-headingColor"
      } w-full btn mt-0 rounded-md`}
    >
      Appointments
    </button>

    <button
    onClick={()=>setTab('settings')}
      className={`${
        tab === "settings"
          ? "bg-indigo-100 text-primaryColor"
          : "bg-transparent text-headingColor"
      } w-full btn mt-0 rounded-md`}
    >
      Profile
    </button>
</div>
    <div className="md:mt-[100px] w-full hidden md:flex flex-col gap-4">
              <button
                onClick={handleLogOut}
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Logout
              </button>
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete account
              </button>
            </div>
          
  </div>
</div>

  )
}

export default Tabs