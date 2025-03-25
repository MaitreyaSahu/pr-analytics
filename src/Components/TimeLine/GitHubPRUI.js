import React, { useState } from "react";
import { parse, html } from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";

const mockFiles = [
  {
    name: "src/components/Header.js",
    type: "modified",
    diff: "--- a/src/components/Header.js\n+++ b/src/components/Header.js\n@@ -1 +1 @@\n-const title = 'Old Title';\n+const title = 'New Title';",
  },
  {
    name: "src/utils/helper.js",
    type: "added",
    diff: "--- /dev/null\n+++ b/src/utils/helper.js\n@@ -0,0 +1 @@\n+export const newHelper = () => {};",
  },
];

const GitHubPRUI = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {/* File List Panel */}
      <div className="col-span-1 p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Changed Files</h2>
        <ul>
          {mockFiles.map((file, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => setSelectedFile(file)}
            >
              {file.name} ({file.type})
            </li>
          ))}
        </ul>
      </div>

      {/* Diff Viewer Panel */}
      <div className="col-span-2 p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Code Changes</h2>
        {selectedFile ? (
          <div
            dangerouslySetInnerHTML={{
              __html: html(parse(selectedFile.diff), {
                inputFormat: "diff",
                showFiles: false,
                matching: "lines",
              }),
            }}
          />
        ) : (
          <p>Select a file to view changes</p>
        )}
      </div>
    </div>
  );
};

export default GitHubPRUI;
