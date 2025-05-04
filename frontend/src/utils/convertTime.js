const convertTime=(time)=> {
    if (!time || typeof time !== 'string') {
        console.error('Invalid time passed to convertTime:', time);
        return '';
      }
    
      // Handle time ranges like "16:00 - 16:30"
      if (time.includes(' - ')) {
        const [start, end] = time.split(' - ');
        return `${convertTime(start)} - ${convertTime(end)}`;
      }
    
      const [hourStr, minuteStr] = time.split(':');
      let hours = parseInt(hourStr);
      const minutes = parseInt(minuteStr);
    
      let meridiem = 'AM';
      if (hours >= 12) {
        meridiem = 'PM';
        if (hours > 12) hours -= 12;
      }
      if (hours === 0) hours = 12;
    
      return `${hours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
}

export default convertTime;