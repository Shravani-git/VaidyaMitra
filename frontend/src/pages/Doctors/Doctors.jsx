import DoctorCard from "../../componenets/Doctors/DoctorCard";
import { useEffect, useState } from "react";
import Testimonial from "../../componenets/Testimonial/Testimonial";
import { BASE_URL } from "../../utils/config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "./../../componenets/Loader/Loading";
import Error from "./../../componenets/Error/Error";
const Doctors = () => {
  const [query, setQuery] = useState("");
const [debouncedQuery, setDebouncedQuery] = useState("");
  const handleSearch = () => { 
    setQuery(query.trim());
    console.log('handle Search');
   }

   useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);
    return () => {
      clearTimeout(timeout);
    };
   },[query])
   const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors?query=${debouncedQuery}`);
  return (
    <>
    
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer "
              placeholder="Search doctor by name or specification"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
        {loading && <Loader />}
        {error && <Error />}
          {!loading && !error&& ( <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {doctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
          )}
        </div>

      </section>

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
    </>
  );
};

export default Doctors;
