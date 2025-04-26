const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  // Helper function to format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Helper function to format time
  const formatTime = (time) => {
    return time ? time : "N/A";
  };
  
  // AppointmentCard Component
  const AppointmentCard = ({appointmentId, appointment }) => {
    const formattedDate = formatDate(appointment.schedule.date);
    const formattedTime = formatTime(appointment.schedule.time);
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-gray-900">
              Dr. {appointment.doctorName}
            </h3>
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
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{formattedTime}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm font-medium">
            Reschedule
          </button>
          {appointment.status !== "cancelled" && (
            <button className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm font-medium">
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  };
  