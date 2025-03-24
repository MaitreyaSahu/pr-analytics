import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import "tailwindcss/tailwind.css";

const mockData = [
  {
    status: "Active",
    count: 10,
    mergeTime: 12,
    firstReviewTime: 5,
    reviewers: 3,
    comments: 7,
    locChanged: 200,
    aiIssues: 2,
    contributor: "User A",
    reviewResponseTime: 3,
  },
  {
    status: "Completed",
    count: 15,
    mergeTime: 9,
    firstReviewTime: 4,
    reviewers: 2,
    comments: 5,
    locChanged: 150,
    aiIssues: 1,
    contributor: "User B",
    reviewResponseTime: 2,
  },
];

const sprintData = [
  { sprint: "Sprint 1", codeQuality: 80, commentQuality: 70 },
  { sprint: "Sprint 2", codeQuality: 85, commentQuality: 75 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PRAnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [sprintDuration, setSprintDuration] = useState(2);

  useEffect(() => {
    // Fetch PR analytics data (replace with API call)
    setData(mockData);
  }, []);

  return (
    <div className="p-2 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pull Request Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PR Status-wise Count (Pie Chart) */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">PR Status Distribution</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Sprint-wise PR Quality Report (Stacked Area Chart) */}
        <div className="bg-white p-4 shadow-lg rounded-lg col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            PR Quality Report (Sprint-wise)
          </h2>
          <label className="block text-sm font-medium">
            PI Duration (Sprints):
          </label>
          <input
            type="number"
            value={sprintDuration}
            onChange={(e) => setSprintDuration(Number(e.target.value))}
            className="p-2 border rounded mb-2 w-full"
          />
          <AreaChart width={600} height={300} data={sprintData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sprint" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="codeQuality"
              stackId="1"
              stroke="#0088FE"
              fill="#0088FE66"
            />
            <Area
              type="monotone"
              dataKey="commentQuality"
              stackId="1"
              stroke="#FFBB28"
              fill="#FFBB2866"
            />
          </AreaChart>
        </div>

        {/* Average PR Merge Time (Bar Chart) */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Average PR Merge Time</h2>
          <BarChart width={300} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mergeTime" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Time to First Review */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Time to First Review</h2>
          <BarChart width={300} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="firstReviewTime" fill="#FFBB28" />
          </BarChart>
        </div>

        {/* Average Number of Reviewers per PR */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Reviewers Per PR</h2>
          <BarChart width={300} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reviewers" fill="#00C49F" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default PRAnalyticsDashboard;
