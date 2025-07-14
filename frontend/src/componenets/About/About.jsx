import React from "react";
import aboutImg from "../../assets/images/aboutimg.jpg";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* ---About Image--- */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] order-2 z-10 lg:order-1">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* ---About content--- */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor">
              Proud to be one of the nations best
            </h2>
            <p className="text__para">
              Dr. Mitchell, a highly experienced physician at XYZ Hospital,
              offers personalized and expert care through VaidyaMitra, the
              doctor appointment web application. Patients can easily schedule
              consultations, access medical advice, and receive timely
              healthcare services online.
            </p>
            <p className="text__para mt-[30px]">
              With over a decade of medical experience, Dr. John Doe is known
              for his compassionate approach and commitment to patient
              well-being. Through VaidyaMitra, he ensures seamless
              communication, enabling patients to book appointments, manage
              health records, and receive follow-up care, all from the
              convenience of their homes.
            </p>
            <Link to="/">
              <button className="bg-primaryColor text-[16px] py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
