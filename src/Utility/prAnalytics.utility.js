/**
 * Function to get status-wise PR count
 * @param {Array} prList - List of PR objects
 * @returns {Object} - Object with status-wise PR count
 */
function getStatusWisePRCount(prList) {
  const statusCount = {
    active: 0,
    closed: 0,
  };

  prList.forEach((pr) => {
    if (pr.mergedOn || pr.finalApprovalOn) {
      statusCount.closed++;
    } else {
      statusCount.active++;
    }
  });

  return statusCount;
}

/**
 * Function to get average PR merge time
 * @param {Array} prList - List of PR objects
 * @returns {Number} - Average merge time in milliseconds
 */
function getAveragePRMergeTime(prList) {
  let totalMergeTime = 0;
  let mergedPRCount = 0;

  prList.forEach((pr) => {
    if (pr.mergedOn) {
      const createdOn = new Date(pr.createdOn);
      const mergedOn = new Date(pr.mergedOn);
      totalMergeTime += mergedOn - createdOn;
      mergedPRCount++;
    }
  });

  return mergedPRCount > 0 ? totalMergeTime / mergedPRCount : 0;
}
