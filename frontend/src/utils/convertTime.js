const convertTime=(time)=> {
    const timeParts = time.split(':'); // Split the time string into hours and minutes
    let hours = parseInt(timeParts[0]); // Parse the hours part as an integer
    const minutes = parseInt(timeParts[1]); // Get the minutes part as a string

    let meridiem = 'AM'; // Default to AM
    if (hours >= 12) {
        meridiem = 'PM'; // If hours are 12 or more, set to PM
        if (hours > 12) {
            hours -= 12; // Convert to 12-hour format
        }
    }

    return hours.toString().padStart(2) + ":" + minutes.toString().padStart(2, '0') + ' ' + meridiem; // Format the time string
}

export default convertTime;