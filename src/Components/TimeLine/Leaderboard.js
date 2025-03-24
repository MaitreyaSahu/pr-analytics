import React, { useState } from "react";
import { motion } from "framer-motion";

const developers = [
  { name: "Alice", prQuality: 95, prsMerged: 120, reviewsGiven: 200 },
  { name: "Bob", prQuality: 90, prsMerged: 110, reviewsGiven: 180 },
  { name: "Charlie", prQuality: 88, prsMerged: 100, reviewsGiven: 160 },
  { name: "David", prQuality: 85, prsMerged: 90, reviewsGiven: 140 },
  { name: "Eve", prQuality: 80, prsMerged: 85, reviewsGiven: 130 },
  { name: "Frank", prQuality: 78, prsMerged: 80, reviewsGiven: 120 },
  { name: "Grace", prQuality: 75, prsMerged: 75, reviewsGiven: 110 },
];

const getProgressWidth = (prQuality) => `${prQuality}%`;

const Leaderboard = ({ name }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleDevelopers = showAll ? developers : developers.slice(0, 5);

  return (
    <div className="max-w-2xl min-w-[350px] mx-auto p-2">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        🏆 {name} Leaderboard
      </h1>
      <div
        className={`grid ${
          showAll ? "grid-cols-2 gap-3" : "space-y-3"
        }  pr-1 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200`}
      >
        {visibleDevelopers.map((dev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-between border-l-4 border-blue-500 hover:shadow-lg transition-transform transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-700 w-8 text-center">
                {index + 1}
              </span>
              <img
                src={`https://ui-avatars.com/api/?name=${dev.name}&background=random`}
                alt={dev.name}
                className="w-8 h-8 rounded-full border"
              />
              <div>
                <span className="text-md font-semibold text-gray-700">
                  {dev.name}
                </span>
                <div className="text-xs text-gray-500">
                  PRs: {dev.prsMerged} | Reviews: {dev.reviewsGiven}
                </div>
                <div className="mt-1 w-full bg-gray-300 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: getProgressWidth(dev.prQuality) }}
                  ></div>
                </div>
              </div>
            </div>
            {index < 3 && (
              <span className="text-lg">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          //   onClick={() => setShowAll(!showAll)}
          className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          {showAll ? "Show Less" : "See More"}
        </motion.button>
      </div>
    </div>
  );
};

export default Leaderboard;
