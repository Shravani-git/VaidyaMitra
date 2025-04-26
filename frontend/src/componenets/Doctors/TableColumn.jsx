// import StatusBadge from "./StatusBadge";
// import {AppointmentModal} from "./AppointmentModal";

// Mock doctors data


// Utility function to format date time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return {
    dateTime: date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

// Button Component
export const Button = ({ variant, size, onClick, disabled, children, className }) => {
  const getVariantStyles = () => {
    if (variant === "outline") {
      return "border border-gray-300 text-gray-700 hover:bg-gray-50";
    }
    return "bg-blue-500 text-white hover:bg-blue-600";
  };

  const getSizeStyles = () => {
    if (size === "sm") {
      return "py-1 px-3 text-sm";
    }
    return "py-2 px-4";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${getVariantStyles()} ${getSizeStyles()} rounded-md font-medium transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className || ""}`}
    >
      {children}
    </button>
  );
};

// AppointmentModal Component (simplified for this example)
export const AppointmentModal = ({ type, title, description }) => {
  return (
    <Button
      variant={type === "schedule" ? "primary" : "outline"}
      size="sm"
      className={`${type === "cancel" ? "text-red-500 border-red-300 hover:bg-red-50" : ""}`}
    >
      {type === "schedule" ? "Schedule" : "Cancel"}
    </Button>
  );
};

// StatusBadge Component
export const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

// Columns definition for the data table
export const columns = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="font-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="font-medium">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <img
            src={doctor?.image }
            alt="doctor"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];

export default Button;