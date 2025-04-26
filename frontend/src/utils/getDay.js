export const convertTo24HourFormat = (time) => {
    if (!time || typeof time !== "string") return "";
  
    // If time is already in 24-hour format like "16:00", return as is
    if (!time.toLowerCase().includes('am') && !time.toLowerCase().includes('pm')) {
      return time;
    }
  
    const [hourMin, period] = time.trim().split(' ');
    let [hour, minute] = hourMin.split(':').map(Number);
  
    if (isNaN(hour) || isNaN(minute)) return "";
  
    if (period.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
  
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };
  
  export const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(':').map(Number);
    if (isNaN(hour) || isNaN(minute)) return '';
  
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  
    return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
  };
  
  

export const  generate30MinSlots = (start, end) => {
    const slots = [];
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
  
    while (startTime < endTime) {
      const nextTime = new Date(startTime.getTime() + 30 * 60000);
      const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  
      slots.push({
        time: `${formatTime(startTime)} - ${formatTime(nextTime)}`,
        available: true,
      });
  
      startTime.setTime(nextTime.getTime());
    }
  
    return slots;
  };
  

  export const  getDayFromDate = (dateString) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(dateString).getDay()];
  };
  

  
