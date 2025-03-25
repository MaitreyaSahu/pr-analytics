export const mockPRData = {
  id: "PR-12345",
  title: "Refactor Authentication Module",
  createdBy: "John Doe",
  createdOn: "2025-03-25T14:30:00Z",
  mergedOn: "2025-03-26T10:15:00Z",
  approvers: ["Alice Smith", "Bob Johnson", "Charlie Brown"],
  codeQualityRating: 4.2,
  codeIssues: [
    {
      severity: "High",
      description: "SQL Injection vulnerability found in user authentication.",
      codeSnippet: `string query = "SELECT * FROM users WHERE username = '" + userInput + "'";`,
    },
    {
      severity: "Medium",
      description: "Unoptimized loop detected in data processing.",
      codeSnippet: `for (int i = 0; i < data.Length; i++) { ProcessData(data[i]); }`,
    },
    {
      severity: "Low",
      description: "Inconsistent variable naming convention.",
      codeSnippet: `let UserName = "John";`,
    },
  ],
  commentQualityRating: 3.8,
  commentIssues: [
    {
      severity: "High",
      comments: [
        "This function is not documented.",
        "No explanation for this complex logic.",
      ],
    },
    {
      severity: "Medium",
      comments: [
        "Variable names should be more descriptive.",
        "Avoid magic numbers in code.",
      ],
    },
    {
      severity: "Low",
      comments: [
        "Consider using a helper function here.",
        "Refactor this block for readability.",
      ],
    },
  ],
  detailedAnalysis:
    "The PR contains a strong refactor of the authentication module but has a few security concerns, unoptimized loops, and inconsistent naming. Additionally, code comments are not detailed enough.",
  analysisGraphData: [
    { category: "High Severity Issues", count: 2 },
    { category: "Medium Severity Issues", count: 2 },
    { category: "Low Severity Issues", count: 2 },
  ],
};
