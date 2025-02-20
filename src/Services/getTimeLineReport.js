const generateUnmergedPRs = (count) => {
  const prs = [];
  for (let i = 0; i < count; i++) {
    prs.push({
      prId: 200 + i,
      prName: `Feature ${String.fromCharCode(65 + i)}`,
      srcBranchName: `feature-${String.fromCharCode(97 + i)}`,
      trgBranchName: "master",
      createdOn: `2025-02-${10 + i}`,
      mergedOn: null,
    });
  }
  return prs;
};

export const items = [
  {
    repoName: "Repo - 1",
    repoId: 1,
    LastMergedToMaster: {
      branchName: "Release 23 adadafasf a asf afa fa afaf ",
      mergedOn: "2025-02-20",
      createdOn: "2025-02-15",
      prId: 101,
      mergedBy: "username1",
    },
    unmergedPRs: generateUnmergedPRs(2),
  },
  {
    repoName: "Repo - 2",
    repoId: 2,
    LastMergedToMaster: {
      branchName: "Release 24",
      mergedOn: "2025-02-19",
      createdOn: "2025-02-14",
      prId: 104,
      mergedBy: "username2",
    },
    unmergedPRs: generateUnmergedPRs(1),
  },
  ...Array.from({ length: 30 }, (_, index) => {
    const hasUnmergedPRs = Math.random() < 0.5;
    return {
      repoName: `Repo - ${index + 3}`,
      repoId: index + 3,
      LastMergedToMaster: {
        branchName: `Release ${index + 25}`,
        mergedOn: `2025-02-${10 + (index % 20)}`,
        createdOn: `2025-02-${5 + (index % 20)}`,
        prId: 105 + index,
        mergedBy: `username${index + 3}`,
      },
      unmergedPRs: hasUnmergedPRs
        ? generateUnmergedPRs(Math.floor(Math.random() * 11))
        : [],
    };
  }),
];
