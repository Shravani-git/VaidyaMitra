import { useEffect, useRef , useContext} from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import userImg from "../../assets/images/default-profile.png";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
   const{user, token, role}=useContext(AuthContext)
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center h-20 " ref={headerRef}>
      <div className="container mx-5 max-w-full">
        <div className="flex items-center justify-between">
          {/*---Logo---*/}
          <div>
            <img src={logo} alt="" />
          </div>
          {/* ---menu--- */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* ---Nav Right--- */}
          <div className="flex items-center gap-4">

            {
              token && user ?
              <div className="pt-4">
  <Link
    className="flex flex-col items-center justify-center p-2 h-[100px]" // increased height
    to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}
  >
    <figure className="w-[50px] h-[50px] rounded-full overflow-hidden">
      <img
        src={user?.photo ? user.photo : userImg}
        className="w-full h-full object-cover"
        alt="profile"
      />
    </figure>
   
  </Link>
</div>
 :
             <Link to="/login">
             <button className="bg-primaryColor text-[16px] py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
               Login
             </button>
           </Link>
            }
            

            

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
