import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../utils/config";
import DoctorCard from "../../componenets/Doctors/DoctorCard";
import Loading from "../../componenets/Loader/Loading";
import Error from "../../componenets/Error/Error";
import { doctors } from "../../assets/data/doctors";
import { HiChatAlt2 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cancelAppointment } from "../../hooks/cancelAppointment";
import { toast } from "react-toastify";
import { Link } from "lucide-react";
const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "scheduled":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const MyBookings = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { dispatch } = useContext(AuthContext);
  const { userRole } = useParams();
  const { user } = useContext(AuthContext);
  console.log("user._id:", user?._id);
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(
    `${BASE_URL}/appointments/user/${user._id}?refresh=${refreshTrigger}`
  );

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      toast.success("Appointment canceled successfully!");
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      toast.error("Failed to cancel: " + err.message);
    }
  };
  const navigate = useNavigate();
  const handleNewAppointment = () => {
    navigate("/doctors");
  };
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {loading && <Loading />}
      {error && <Error errMessage={error} />}

      {!loading && !error && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Appointments
            </h2>
            
                  <button onClick={handleNewAppointment} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Book New Appointment
                  </button>
                
          </div>

          {appointments.length === 0 ? (
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No appointments found
              </h3>
              <p className="mt-1 text-gray-500">
                You don't have any scheduled appointments yet.
              </p>
              <div className="mt-6">
              <button onClick={handleNewAppointment} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Book New Appointment
                  </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-gray-600">
                        Appointment ID: {appointment.appointmentId}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{appointment.schedule.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{appointment.schedule.time}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Reason</p>
                    <p className="text-gray-700">{appointment.reason}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-gray-700">{appointment.notes}</p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    {/* <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm font-medium">
                      Reschedule
                    </button> */}
                    {appointment.status !== "cancelled" &&
                      appointment.status !== "scheduled" && (
                        <button
                          onClick={() => handleCancel(appointment._id)}
                          className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
