import React from "react";
import herosection from "../assets/images/herosection.png";
import faqImg from "../assets/images/faqImg.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import videoIcon from "../assets/images/video-icon.png";
import featureImg from "../assets/images/featureimg.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import About from "../componenets/About/About";
import ServiceList from "../componenets/Services/ServiceList";
import DoctorList from "../componenets/Doctors/DoctorList";
import FaqList from "../componenets/Faq/FaqList";
import Testimonial from "../componenets/Testimonial/Testimonial";

// import { BsRightArrow } from "react-icons/bs";
const Home = () => {
  return (
    <>
      {/* ---Hero Section--- */}
      <section className="hero__section pt-[60px]  2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* --Hero Content--- */}
            <div>
              <div className="lg:w-[570px] ">
                <h1 className="text-[34px] leading-[46px] text-headingColor font-[600] md:text-[60px] md:leading-[70px]">
                  Empowering Health, Embracing Life Together.
                </h1>
                <p className="text__para">
                  At VaidyaMitra, we simplifies healthcare access by allowing
                  patients to easily book, reschedule, or cancel appointments
                  with their preferred doctors, ensuring timely medical
                  attention and efficient management of healthcare needs. Join
                  us in nurturing well-being and vitality.
                </p>
                <button className="btn bg-primaryColor text-[16px] py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Request an Appointment
                </button>
              </div>
              {/* ---Hero Counter--- */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14]"></span>
                  <p className="text__para">Clinic Locations</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>
            {/* --Hero Content--- */}

            <div >
              <img
                src={herosection}
                alt=""
                className="md:w-[600px] mr-[30px] w-[490px] mb-[30px] pr-5"
              />
            </div>
            {/* <div className="flex gap-[30px] justify-end">
              <div>
                <img src={heroImg01} className="w-full " alt="" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImg02} className="w-full mb-[30px]" alt="" />
                <img src={heroImg03} className="w-full " alt="" />
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* ---Hero Section end--- */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center text-[44px] leading-[54px] font-[700] text-headingColor">
              Providing the best medical services
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <div className="grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center ">
                <img src={icon01} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-headingColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health system offers
                  unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <FaArrowRight className="group-hover:text-white w-6 h-5" />
                  {/* <BsArrowRight /> */}
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center ">
                <img src={icon02} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-headingColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health system offers
                  unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <FaArrowRight className="group-hover:text-white w-6 h-5" />
                  {/* <BsArrowRight /> */}
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center ">
                <img src={icon03} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-headingColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health system offers
                  unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <FaArrowRight className="group-hover:text-white w-6 h-5" />
                  {/* <BsArrowRight /> */}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      {/* ---Service Section--- */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor">
              Our Medical Services
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. One health system offers unmatched,
              expert health care.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      {/* ---Service Section End--- */}
      {/* ---Feature Section--- */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* ---Feature Content--- */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get Virtual Treatment <br /> Anytime.
              </h2>
              <ul className="pl-4">
                <li className="text__para">
                  1. Schedule the appointment directly.
                </li>
                <li className="text__para">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text__para">
                  3. View our physicians who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>
            {/* ---Feature Image--- */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="" />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      {" "}
                      Tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      {" "}
                      10:00 AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[10px] lg:px-[6px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full ">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor ">
                    Wayne Collins
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ---Feature Section End--- */}
      {/* ---Our great Doctors--- */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor">
              Our Great Doctors
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. One health system offers unmatched,
              expert health care.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>

      {/* ---Our great Doctors ends--- */}

      {/* ---FAQ Section--- */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most asked questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ---FAQ Section end--- */}
      {/* ---Testimonial Section--- */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor">
              What our patients say
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. One health system offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>

      {/* ---Testimonial Section end--- */}
    </>
  );
};

export default Home;
