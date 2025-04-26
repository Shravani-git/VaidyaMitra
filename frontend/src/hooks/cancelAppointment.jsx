import { BASE_URL,token } from "../utils/config";

export const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(`${BASE_URL}/appointments/cancel/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Server did not return JSON. Raw response:", text);
        throw new Error("Server error: Invalid JSON response");
      }
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || "Failed to cancel appointment.");
      }
  
      return result;
    } catch (err) {
      console.error("Error canceling appointment:", err.message);
      throw err;
    }
  };
  