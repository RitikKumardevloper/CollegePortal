import { StatsCard } from "../components/StatsCard";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const enrollmentData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Students",
        data: [65, 80, 56, 55, 43, 81, 65, 80, 56, 55, 59, 43],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="1,245"
          icon="👨‍🎓"
          trend="up"
          change="12% from last month"
        />
        <StatsCard
          title="Faculty Members"
          value="78"
          icon="👩‍🏫"
          trend="up"
          change="5% from last month"
        />
        <StatsCard
          title="Courses"
          value="56"
          icon="📚"
          trend="steady"
          change="No change"
        />
        <StatsCard
          title="Attendance Today"
          value="92%"
          icon="✅"
          trend="down"
          change="3% from yesterday"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Enrollment Trends</h2>
          <Chart type="bar" data={enrollmentData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[
              {
                icon: "📢",
                title: "New student registration",
                time: "2 hours ago",
              },
              {
                icon: "📝",
                title: "Course schedule updated",
                time: "5 hours ago",
              },
              { icon: "🎓", title: "3 students graduated", time: "1 day ago" },
              {
                icon: "💰",
                title: "Tuition payments processed",
                time: "2 days ago",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600">{item.icon}</span>
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
