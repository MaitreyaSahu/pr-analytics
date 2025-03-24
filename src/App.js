import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { ArrowRight } from "lucide-react";
import logo from "./logo.svg";
import "./index.css";
import { items } from "./Services/getTimeLineReport";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import { AgingList } from "./AgingList";
import { PRAnalytics } from "./PRAnalytics";
import { Autocomplete } from "@mui/material";
import ReleaseBranchTracker from "./Components/TimeLine/ReleaseBranchTracker";
import AppBar from "./Components/TimeLine/AppBar";
import Leaderboard from "./Components/TimeLine/Leaderboard";

function App() {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState({});

  const filteredItems = items.filter(
    (item) =>
      item.repoName.toLowerCase().includes(filter.toLowerCase()) ||
      item.LastMergedToMaster.branchName
        .toLowerCase()
        .includes(filter.toLowerCase())
  );

  const handleClick = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const mergedCount = items.filter(
    (item) => item.unmergedPRs.length === 0
  ).length;
  const unmergedCount = items.filter(
    (item) => item.unmergedPRs.length > 0
  ).length;

  const data = [
    { name: "Merged Repos", value: mergedCount, color: "#00C49F" },
    { name: "Unmerged Repos", value: unmergedCount, color: "#FF8042" },
  ];

  return (
    <div className="App w-screen h-screen flex flex-col">
      <AppBar />
      <div className="w-full h-full overflow-auto flex p-2 gap-2">
        <Card sx={{ width: "100%", height: "100%" }}>
          <CardContent sx={{ height: "100%", p: 2, pr: 1 }}>
            {/* <PRAnalytics /> */}
            <ReleaseBranchTracker />
            {/* <CustomActiveShapePieChart data={data} /> */}
          </CardContent>
        </Card>
        <Card sx={{ width: "4500px", height: "100%" }}>
          <CardContent sx={{ height: "100%", p: 2, pr: 1 }}>
            {/* <PRAnalytics /> */}
            <ReleaseBranchTracker />
            {/* <CustomActiveShapePieChart data={data} /> */}
          </CardContent>
        </Card>
        <div className="overflow-y-auto w-full mr-2">
          <Card sx={{}}>
            <CardContent sx={{ p: 2 }}>
              <Leaderboard name="Developer" />
            </CardContent>
          </Card>
          <Card sx={{}}>
            <CardContent sx={{ p: 2 }}>
              <Leaderboard name="Reviewer" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
