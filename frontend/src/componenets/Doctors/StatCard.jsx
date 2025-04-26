const StatCard = ({ count = 0, label, icon: Icon, type }) => {
  const getCardStyles = () => {
    switch (type) {
      case "appointments":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "scheduled":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`${getCardStyles()} rounded-lg p-6 text-white shadow-md`}>
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded-lg">
          {Icon ? <Icon className="h-8 w-8 text-white" /> : null}
        </div>
        <h2 className="text-3xl font-bold">{count}</h2>
      </div>
      <p className="mt-2 text-sm opacity-90">{label}</p>
    </div>
  );
};
export default StatCard;