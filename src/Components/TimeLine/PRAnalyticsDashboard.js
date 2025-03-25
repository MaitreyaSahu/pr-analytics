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
import Select from "react-select";
import "tailwindcss/tailwind.css";

const sprintData = [
  {
    sprint: "Sprint 1",
    codeQuality: 80,
    commentQuality: 70,
    mergeTime: 12,
    firstReviewTime: 5,
    rework: 2,
    count: 10,
  },
  {
    sprint: "Sprint 2",
    codeQuality: 85,
    commentQuality: 75,
    mergeTime: 9,
    firstReviewTime: 4,
    rework: 3,
    count: 15,
  },
  {
    sprint: "Sprint 3",
    codeQuality: 90,
    commentQuality: 80,
    mergeTime: 8,
    firstReviewTime: 3,
    rework: 1,
    count: 12,
  },
  {
    sprint: "Sprint 4",
    codeQuality: 88,
    commentQuality: 78,
    mergeTime: 7,
    firstReviewTime: 3,
    rework: 4,
    count: 18,
  },
  {
    sprint: "Sprint 5",
    codeQuality: 92,
    commentQuality: 82,
    mergeTime: 6,
    firstReviewTime: 2,
    rework: 2,
    count: 14,
  },
  {
    sprint: "Sprint 6",
    codeQuality: 95,
    commentQuality: 85,
    mergeTime: 5,
    firstReviewTime: 2,
    rework: 3,
    count: 20,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PRAnalyticsDashboard = () => {
  const [data, setData] = useState(sprintData);
  const [sprintRange, setSprintRange] = useState(["Sprint 1", "Sprint 6"]);

  useEffect(() => {
    const startIndex = sprintData.findIndex(
      (sprint) => sprint.sprint === sprintRange[0]
    );
    const endIndex = sprintData.findIndex(
      (sprint) => sprint.sprint === sprintRange[1]
    );
    if (startIndex !== -1 && endIndex !== -1) {
      setData(sprintData.slice(startIndex, endIndex + 1));
    }
  }, [sprintRange]);

  const sprintOptions = sprintData.map((sprint) => ({
    label: sprint.sprint,
    value: sprint.sprint,
  }));

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Pull Request Analytics</h1>
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium">Sprint Range:</label>
        <Select
          options={sprintOptions}
          defaultValue={sprintOptions[0]}
          onChange={(e) => setSprintRange([e.value, sprintRange[1]])}
          className="w-40"
        />
        <span>to</span>
        <Select
          options={sprintOptions}
          defaultValue={sprintOptions[sprintOptions.length - 1]}
          onChange={(e) => setSprintRange([sprintRange[0], e.value])}
          className="w-40"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">PR Status Distribution</h2>
          <PieChart width={300} height={200}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="sprint"
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

        <div className="bg-white p-4 shadow-lg rounded-lg col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            PR Quality Report (Sprint-wise)
          </h2>
          <AreaChart width={600} height={200} data={data}>
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

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Average PR Merge Time</h2>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sprint" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mergeTime" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Time to First Review</h2>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sprint" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="firstReviewTime" fill="#FFBB28" />
          </BarChart>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Total Number of Reworks
          </h2>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sprint" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rework" fill="#00C49F" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default PRAnalyticsDashboard;
