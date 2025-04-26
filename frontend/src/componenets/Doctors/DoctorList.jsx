import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../utils/config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../Loader/Loading";
import Error from "../Error/Error";
const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[55px] lg:mt-[30px]">
          {doctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};


export default DoctorList;
