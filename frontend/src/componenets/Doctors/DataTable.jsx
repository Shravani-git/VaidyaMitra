import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../utils/config";
import Loader from "../Loader/Loading";
import Error from "../Error/Error";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { scheduleAppointment } from "./../../hooks/scheduleAppointment";
import { cancelAppointment } from "./../../hooks/cancelAppointment";
import { toast } from "react-toastify";
import StatCard from "./StatCard";
import AppointmentModal from "./AppointmentModal";
import { CalendarDays, Clock, XCircle, CheckCircle2 } from "lucide-react";
// DataTable Component
const DataTable = ({ columns, data, doctorId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const pageSize = 5;
  const pageCount = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const nextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(
    `${BASE_URL}/appointments/doctor/${doctorId}?refresh=${refreshTrigger}`
  );

  console.log("Fetched appointments:", appointments);
  const handleSchedule = async (appointmentId) => {
    try {
      await scheduleAppointment(appointmentId);
      toast.success("Appointment scheduled successfully!");
      setRefreshTrigger((prev) => prev + 1); // Triggers re-fetch
    } catch (err) {
      toast.error("Failed to schedule: " + err.message);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      toast.success("Appointment canceled successfully!");
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      toast.error("Failed to cancel: " + err.message);
    }
  };
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "pending"
  ).length;
  const canceledAppointments = appointments.filter(
    (appt) => appt.status === "cancelled"
  ).length;
  const scheduledAppointments = appointments.filter(
    (appt) => appt.status === "scheduled"
  ).length;
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="w-full p-4">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard
            type="appointments"
            count={totalAppointments}
            label="Scheduled appointments"
            icon={CalendarDays}
          />
          <StatCard
            type="pending"
            count={pendingAppointments}
            label="Pending appointments"
            icon={Clock}
          />
          <StatCard
            type="scheduled"
            count={scheduledAppointments}
            label="Scheduled appointments"
            icon={CheckCircle2}
          />
          <StatCard
            type="cancelled"
            count={canceledAppointments}
            label="Cancelled appointments"
            icon={XCircle}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-medium">Patient Name</th>
                <th className="p-3 text-left font-medium">Time Slot</th>
                <th className="p-3 text-left font-medium">Date</th>
                <th className="p-3 text-center font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && !error && <Loader />}
              {error && !loading && <Error errMessage={error} />}
              {!error &&
                !loading &&
                appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td
                      className="p-3 text-sm text-blue-600 cursor-pointer"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      {appointment?.patient?.name}
                    </td>
                    <td className="p-3 text-sm">
                      {appointment?.schedule?.time}
                    </td>
                    <td className="p-3 text-sm">
                      {appointment?.schedule?.date}
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          appointment.status === "scheduled"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment?.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSchedule(appointment._id)}
                          disabled={appointment.status !== "pending"}
                          className={`px-2 py-1 rounded-full text-sm ${
                            appointment.status !== "pending"
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => handleCancel(appointment._id)}
                          disabled={appointment.status !== "pending"}
                          className={`px-2 py-1 rounded-full text-sm ${
                            appointment.status !== "pending"
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-gray-200 p-4">
        <button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={currentPage === 0}
        >
          <span className="transform rotate-180">
            <ArrowLeft size={20} />
          </span>
        </button>
        <button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage >= pageCount - 1}
        >
          <ArrowRight size={20} />
        </button>
      </div>
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default DataTable;
