import React, { useState } from "react";
import Loader from "../../componenets/Loader/Loading";
import Error from "../../componenets/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../utils/config";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import starIcon from "../../assets/images/Star.png";
import Tabs from "./Tabs";
import Profile from "./Profile";
import Appointments from "./Appointments";
const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );




  const [tab, setTab] = useState("overview");
  return (
    <section>
      <div className="max-w-[1170px]  px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error errMessage={error} />}
        {!error && !loading && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-500 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 9.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We'ill review
                    manually and approve within 3 days.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px] mb-10">
                        <img src={data?.photo} alt="" className="w-full " />
                      </figure>

                      <div>
                        <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="Rating Star" />
                            {data.averageRating}
                          </span>

                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>

                        <p className="text-[15px] lg:max-w-[390px] leading-6">
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && <Appointments doctorData={data}/>}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
