import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import GitHubPRUI from "./GitHubPRUI";

const COLORS = ["#FF4B4B", "#FFA500", "#4CAF50"];

const PRQualityAnalysis = ({ prData }) => {
  return (
    <div className="p-2 max-w-5xl mx-auto min-h-screen ">
      {/* PR Quality Analysis Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            PR Quality Analysis
          </h2>
          <div className="mt-2 space-y-1 text-gray-700">
            <p>
              <strong>ID:</strong> {prData.id}
            </p>
            <p>
              <strong>Title:</strong> {prData.title}
            </p>
            <p>
              <strong>Created By:</strong> {prData.createdBy}
            </p>
            <p>
              <strong>Created On:</strong>{" "}
              {new Date(prData.createdOn).toLocaleString()}
            </p>
            <p>
              <strong>Merged On:</strong>{" "}
              {prData.mergedOn
                ? new Date(prData.mergedOn).toLocaleString()
                : "Not merged"}
            </p>
          </div>
        </div>
        {/* Issue Distribution Pie Chart */}
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={prData.analysisGraphData}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="100%"
                fill="#8884d8"
              >
                {prData.analysisGraphData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={prData.analysisGraphData}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="100%"
                fill="#8884d8"
              >
                {prData.analysisGraphData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* AI Code Quality Analysis */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
          <h2 className="text-md font-semibold text-gray-900">
            AI Code Quality Analysis
          </h2>
          <p className="mt-2 text-gray-700">
            Overall Rating: {prData.codeQualityRating} / 5 ⭐
          </p>
          <div className="mt-2 space-y-1">
            {prData.codeIssues.map((issue, index) => (
              <div
                key={index}
                className={`text-xs p-2 rounded-md ${
                  issue.severity === "High"
                    ? "bg-red-100 text-red-600"
                    : issue.severity === "Medium"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <p>
                  <strong>{issue.severity}:</strong> {issue.description}
                </p>
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  className="rounded-md mt-1"
                >
                  {issue.codeSnippet}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        </div>

        {/* AI Comment Quality Analysis */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
          <h2 className="text-md font-semibold text-gray-900">
            AI Comment Quality Analysis
          </h2>
          <p className="mt-2 text-gray-700">
            Overall Rating: {prData.commentQualityRating} / 5 ⭐
          </p>
          <div className="mt-2 space-y-1">
            {prData.commentIssues.map((group, index) => (
              <div
                key={index}
                className="mt-1 p-2 rounded-md bg-gray-100 text-xs"
              >
                <p
                  className={`font-semibold ${
                    group.severity === "High"
                      ? "text-red-600"
                      : group.severity === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {group.severity} Issues:
                </p>
                <ul className="list-disc list-inside text-gray-700 pl-4">
                  {group.comments.map((comment, i) => (
                    <li key={i}>{comment}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GitHubPRUI />
    </div>
  );
};

export default PRQualityAnalysis;
