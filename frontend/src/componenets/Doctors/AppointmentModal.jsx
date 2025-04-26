import React from "react";
import { X } from "lucide-react";

const AppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        {/* Title Bar */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">Appointment Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Section */}
        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <Detail label="Appointment ID" value={appointment.appointmentId} />
          <Detail label="Patient" value={appointment.patient.name} />
          <Detail label="Doctor" value={appointment.doctorName} />
          <Detail label="Status" value={appointment.status} />
          <Detail label="Date" value={appointment.schedule.date} />
          <Detail label="Time" value={appointment.schedule.time} />
          <Detail label="Reason" value={appointment.reason} />
          {appointment.notes && <Detail label="Notes" value={appointment.notes} />}
        </div>

      </div>
    </div>
  );
};

// Small reusable component for better structure
const Detail = ({ label, value }) => (
  <p>
    <span className="font-medium">{label}:</span> {value}
  </p>
);

export default AppointmentModal;
