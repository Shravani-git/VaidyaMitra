import convertTime from "../../utils/convertTime";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../utils/config";
import { AuthContext } from "./../../context/AuthContext.jsx";
import { useContext } from "react";
import {
  getDayFromDate,
  generate30MinSlots,
  convertTo24HourFormat,
} from "../../utils/getDay";
const SidePanel = ({ doctorId, name, ticketPrice, timeSlots, bookedSlots }) => {
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const handleBookAppointment = async () => {
    setShowPopup(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentData = {
      patientId: user._id,
      patientName: user.name,
      date: selectedDate,
      time: selectedTimeSlot?.time || "",
      doctorId: doctorId,
      doctorName: name || "",
      reason,
      notes,
    };

    try {
      const res = await fetch(`${BASE_URL}/appointments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      toast.success("Appointment booked successfully!");
      console.log(data);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const bookedSlotsMap = (bookedSlots || []).reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot.time);
    return acc;
  }, {});

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md ">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          Rs {ticketPrice}
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slot:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item?.day.charAt(0).toUpperCase() + item.day.slice(1) ||
                  "Daily"}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleBookAppointment}
        className="btn px-2 w-full rounded-md"
      >
        Book Appointment
      </button>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-gray-50 max-w-3xl w-full mx-auto rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-screen">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            <h1 className="text-2xl font-bold text-center text-blue-700 mb-3">
              Book Your Appointment
            </h1>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-1">
                    Get your appointment booked with {name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-1">
                    Ticket Price: ₹{ticketPrice}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Please select your preferred date and time.
                  </p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>

                {/* Time Slot Selection */}
                {selectedDate &&
                  (() => {
                    const selectedDay =
                      getDayFromDate(selectedDate).toLowerCase();
                    const slotForDay = timeSlots.find(
                      (slot) => slot.day.toLowerCase() === selectedDay
                    );

                    if (!slotForDay)
                      return <p>No slots available for selected date</p>;

                    const start = convertTo24HourFormat(
                      slotForDay.startingTime
                    );
                    const end = convertTo24HourFormat(slotForDay.endingTime);

                    const generatedSlots = generate30MinSlots(start, end);
                    
                    return (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {generatedSlots.length === 0 ? (
                          <p>No available slots</p>
                        ) : (
                          generatedSlots.map((slot, index) => {
                            const isBooked =
                              bookedSlotsMap[selectedDate] &&
                              bookedSlotsMap[selectedDate].includes(slot.time);
                          
                            return (
                              <button
                                key={index}
                                type="button"
                                disabled={isBooked}
                                onClick={() => {
                                  if (isBooked) {
                                    toast.error("This time slot is already booked.");
                                  } else {
                                    setSelectedTimeSlot(slot);
                                  }
                                }}
                                className={`py-2 px-3 rounded-md text-center transition ${
                                  isBooked
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : selectedTimeSlot?.time === slot.time
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                                }`}
                              >
                                {convertTime(slot.time)} 
                              </button>
                            );
                          })
                        )}
                      </div>
                    );
                  })()}

                {/* Reason */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Reason for Appointment
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Brief reason for your visit"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Additional Comments or Notes
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information for the doctor..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition font-medium"
                  disabled={!selectedDate || !selectedTimeSlot}
                >
                  Confirm Appointment
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="mb-6 text-green-500">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">
                  Appointment Confirmed!
                </h2>
                <p className="text-gray-600 mb-2">
                  Your appointment with Dr. {name} has been scheduled for:
                </p>
                <p className="font-semibold mb-4">
                  {selectedDate} at {selectedTimeSlot?.time}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
