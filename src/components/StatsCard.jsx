export const StatsCard = ({ title, value, icon, trend, change }) => {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    steady: "text-yellow-500",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    steady: "→",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className={`text-sm mt-2 ${trendColors[trend]}`}>
            {trendIcons[trend]} {change}
          </p>
        </div>
        <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};
