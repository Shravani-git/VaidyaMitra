import { useState } from 'react';
import { BASE_URL } from "../../utils/config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "./../../componenets/Loader/Loading";
import Error from "./../../componenets/Error/Error";


const dummyTimeSlots = [
  { id: 1, time: "9:00 - 9:30 AM", available: true },
  { id: 2, time: "9:30 - 10:00 AM", available: false },
  { id: 3, time: "10:00 - 10:30 AM", available: true },
  { id: 4, time: "10:30 - 11:00 AM", available: true },
  { id: 5, time: "11:00 - 11:30 AM", available: false },
  { id: 6, time: "11:30 - 12:00 PM", available: true },
  { id: 7, time: "1:00 - 1:30 PM", available: true },
  { id: 8, time: "1:30 - 2:00 PM", available: false },
  { id: 9, time: "2:00 - 2:30 PM", available: true },
  { id: 10, time: "2:30 - 3:00 PM", available: true },
  { id: 11, time: "3:00 - 3:30 PM", available: false },
  { id: 12, time: "3:30 - 4:00 PM", available: true },
];

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const { data, loading, error } = useGetProfile(
  //   `${BASE_URL}/doctors/profile/me`
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    const appointmentData = {
      doctorId: selectedDoctor.id,
      date: selectedDate,
      timeSlotId: selectedTimeSlot.id,
      reason,
      notes
    };
    
    console.log("Appointment data:", appointmentData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setSelectedDoctor(dummyDoctors[0]);
    setSelectedDate("");
    setSelectedTimeSlot(null);
    setReason("");
    setNotes("");
    setIsSubmitted(false);
  };

  // Format today's date as YYYY-MM-DD for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Book Your Appointment</h1>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">
                Get your appointment booked with Dr. {}
              </h2>
              <p className="text-gray-600 text-sm mb-2">Please select your preferred date and time.</p>
            </div>
            
            {/* Date Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            
            {/* Time Slots */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dummyTimeSlots.map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`
                      py-2 px-3 rounded-md text-center transition
                      ${slot.available 
                        ? selectedTimeSlot && selectedTimeSlot.id === slot.id
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      }
                    `}
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              {selectedTimeSlot && (
                <p className="mt-2 text-sm text-blue-600">
                  Selected: {selectedTimeSlot.time}
                </p>
              )}
            </div>
            
            {/* Reason */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Reason for Appointment</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Brief reason for your visit"
                required
              />
            </div>
            
            {/* Additional Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Additional Comments or Notes</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information for the doctor..."
              />
            </div>
            
            {/* Submit Button */}
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
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-2">
              Your appointment with Dr. {selectedDoctor.name} has been scheduled for:
            </p>
            <p className="font-semibold mb-4">
              {selectedDate} at {selectedTimeSlot.time}
            </p>
            <button 
              onClick={resetForm}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}