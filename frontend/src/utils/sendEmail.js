import emailjs from '@emailjs/browser';

export const sendAppointmentConfirmation = async ({
  toEmail,
  toName,
  doctorName,
  appointmentTime,
  reason,
  notes,
}) => {
  if (!toEmail) {
    console.error("Email address is missing!");
    return false; // or you can throw an error here if you prefer
  }
  const templateParams = {
    to_email: toEmail,
    to_name: toName,
    doctor_name: doctorName,
    appointment_time: appointmentTime,
    reason,
    notes,
  };

  try {
    const res = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    console.log("Email sent:", res.status, res.text);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error?.text || error);
    return false;
  }
};
