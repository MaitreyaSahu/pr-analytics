import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
const releases = [
  { name: "release/1.1", date: "2024-03-15" },
  { name: "release/1.0", date: "2024-02-10" },
];

const data = [
  {
    repo: "repo-1",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-10" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-15" },
    ],
  },
  {
    repo: "repo-2",
    branches: [{ name: "hotfix/2.0", merged: true, mergedAt: "2024-02-20" }],
  },
  {
    repo: "repo-3",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-05" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-12" },
    ],
  },
  {
    repo: "repo-4",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-08" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-14" },
    ],
  },
  {
    repo: "repo-5",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-09" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-16" },
    ],
  },
  {
    repo: "repo-6",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-07" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-13" },
    ],
  },
  {
    repo: "repo-7",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-06" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-11" },
    ],
  },
  {
    repo: "repo-8",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-04" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-10" },
    ],
  },
  {
    repo: "repo-9",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-03" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-09" },
    ],
  },
  {
    repo: "repo-10",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-02" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-08" },
    ],
  },
  {
    repo: "repo-11",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-03-01" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-07" },
    ],
  },
  {
    repo: "repo-12",
    branches: [
      { name: "release/1.0", merged: true, mergedAt: "2024-02-28" },
      { name: "release/1.1", merged: false, createdAt: "2024-03-06" },
    ],
  },
];

export default function ReleaseBranchTracker() {
  const [expanded, setExpanded] = useState({});
  const [selectedRelease, setSelectedRelease] = useState(releases[0]);
  const [filter, setFilter] = useState("all");

  const toggleExpand = (repo) => {
    setExpanded((prev) => ({ ...prev, [repo]: !prev[repo] }));
  };

  const getLastMergedBranch = (branches) => {
    return branches
      .filter((branch) => branch.merged)
      .sort((a, b) => new Date(b.mergedAt) - new Date(a.mergedAt))[0];
  };

  const hasUnmergedAfterLastMerged = (branches, lastMerged) => {
    return branches.some(
      (branch) => !branch.merged && branch.createdAt > lastMerged?.mergedAt
    );
  };

  return (
    <div className="p-2 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Release Branch Tracker</h1>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Current Release: {selectedRelease.name}
          </h2>
          <p className="text-sm text-gray-600">
            Release Date: {selectedRelease.date}
          </p>
        </div>
        <select
          value={selectedRelease.name}
          onChange={(e) =>
            setSelectedRelease(releases.find((r) => r.name === e.target.value))
          }
          className="border p-2 rounded-lg"
        >
          {releases.map((release) => (
            <option key={release.name} value={release.name}>
              {release.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="merged">In Sync (All Merged)</option>
          <option value="not-merged">Not In Sync</option>
        </select>
      </div>
      <div className="space-y-4">
        {data.map(({ repo, branches }) => {
          const lastMerged = getLastMergedBranch(branches);
          const outOfSync =
            lastMerged && hasUnmergedAfterLastMerged(branches, lastMerged);
          const isCurrentReleaseMerged = branches.some(
            (branch) => branch.name === selectedRelease.name && branch.merged
          );
          const statusColor =
            isCurrentReleaseMerged || !outOfSync
              ? "bg-green-100"
              : "bg-red-100";

          return (
            <div
              key={repo}
              className={`p-4 border rounded-lg shadow ${statusColor}`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(repo)}
              >
                <div className="flex items-center space-x-2">
                  {expanded[repo] ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                  <span className="font-semibold text-lg">{repo}</span>
                </div>
                {lastMerged && (
                  <span className="text-sm">
                    Last Merged: {lastMerged.name} ({lastMerged.mergedAt})
                  </span>
                )}
              </div>
              {expanded[repo] && (
                <div className="mt-2 space-y-2">
                  {branches.map(({ name, merged, createdAt, mergedAt }) => (
                    <div
                      key={name}
                      className="flex justify-between p-2 border rounded"
                    >
                      <span>{name}</span>
                      <span
                        className={`px-2 py-1 text-white rounded ${
                          merged ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {merged ? "Merged" : "Not Merged"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
