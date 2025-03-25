import React, { useState, useEffect } from "react";
import PRQualityAnalysis from "./PRQualityAnalysis";
import { mockPRData } from "../../Services/getPRQualityAnalysis";

const PullRequestGrid = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [pullRequests, setPullRequests] = useState([]);
  const [selectedPR, setSelectedPR] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setRepositories(["repo1", "repo2", "repo3"]);
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      setPullRequests([
        {
          id: 1,
          title: "Fix auth bug",
          author: "John Doe",
          createdOn: "2024-03-20",
          mergedOn: "2024-03-22",
          status: "Closed",
          codeRating: 4,
          commentRating: 5,
        },
        {
          id: 2,
          title: "Add logging",
          author: "Jane Smith",
          createdOn: "2024-03-18",
          mergedOn: "2024-03-21",
          status: "Active",
          codeRating: 3,
          commentRating: 4,
        },
      ]);
    }
  }, [selectedRepo]);

  const handleSort = (column) => {
    setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  const filteredPRs = pullRequests
    .filter(
      (pr) =>
        pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a[sortColumn] > b[sortColumn] ? 1 : -1;
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    });

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Pull Requests</h2>
      <div className="flex gap-4 mb-4">
        <select
          className="w-64 border border-gray-300 p-2 rounded-lg shadow-sm"
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
        >
          <option value="">Select Repository</option>
          {repositories.map((repo) => (
            <option key={repo} value={repo}>
              {repo}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search PRs..."
          className="w-64 border border-gray-300 p-2 rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                "id",
                "title",
                "author",
                "createdOn",
                "mergedOn",
                "status",
                "codeRating",
                "commentRating",
              ].map((col) => (
                <th
                  key={col}
                  className="p-2 cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                  {sortColumn === col ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
              <th className="p-2">Analysis</th>
            </tr>
          </thead>
          <tbody>
            {filteredPRs.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  No pull requests found
                </td>
              </tr>
            ) : (
              filteredPRs.map((pr) => (
                <tr
                  key={pr.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-2">{pr.id}</td>
                  <td className="p-2">{pr.title}</td>
                  <td className="p-2">{pr.author}</td>
                  <td className="p-2">{pr.createdOn}</td>
                  <td className="p-2">{pr.mergedOn}</td>
                  <td className="p-2 font-medium text-blue-600">{pr.status}</td>
                  <td className="p-2">{"⭐".repeat(pr.codeRating)}</td>
                  <td className="p-2">{"⭐".repeat(pr.commentRating)}</td>
                  <td className="p-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                      onClick={() => setSelectedPR(pr)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedPR && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-6 backdrop-blur-sm"
          onClick={() => setSelectedPR(null)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg h-full w-full max-w-5xl relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="sticky top-0 right-0 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedPR(null)}
            >
              ✖
            </button>
            <PRQualityAnalysis prData={mockPRData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PullRequestGrid;
