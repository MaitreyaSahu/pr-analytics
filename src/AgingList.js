import React, { useState } from "react";
import {
  DatePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import { FieldError, Text } from "react-aria-components";
import AppBar from "@mui/material/AppBar";
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

export const AgingList = ({ items }) => {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState({});
  const [value, setValue] = useState(null);
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
  const redWidth = 99; // Example percentage for red div
  const greenWidth = 1; // Example percentage for green div

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Aging Report
        <span className="text-xs ml-1 text-gray-500">(as on 2025-02-25)</span>
      </Typography>
      {/* <div>
        <div className="flex mb-2 rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-start pl-1"
            style={{
              width: `${redWidth}%`,
              backgroundColor: "rgba(255, 165, 0, 0.5)",
              height: "10px",
            }}
          >
            {redWidth}%
          </div>
          <div
            className="flex items-center justify-end pr-1"
            style={{
              width: `${greenWidth}%`,
              backgroundColor: "rgba(0, 128, 0, 0.5)",
              height: "10px",
            }}
          >
            {greenWidth}%
          </div>
        </div>
      </div> */}

      <TextField
        label="Filter"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        size="small"
        autoComplete="off" // Disable browser text suggestions
        sx={{ marginBottom: 2 }}
      />
      <div className="overflow-y-auto pr-1 h-full">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {filteredItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  p: 1,
                  mt: 1,
                  backgroundColor: item.unmergedPRs.length
                    ? "rgba(255, 0, 0, 0.05)" // Lighter red
                    : "rgba(0, 255, 0, 0.05)", // Lighter green
                  "&:hover": {
                    backgroundColor: item.unmergedPRs.length
                      ? "rgba(255, 0, 0, 0.1)" // Lighter red on hover
                      : "rgba(0, 255, 0, 0.1)", // Lighter green on hover
                  },
                }}
                alignItems="flex-start"
                button
                onClick={() => handleClick(index)}
              >
                <ListItemText
                  primary={
                    <div className="flex justify-between">
                      <Typography
                        variant="h6"
                        sx={{
                          color: item.unmergedPRs.length
                            ? "rgba(255, 0, 0, 0.8)"
                            : "inherit",
                          opacity: item.unmergedPRs.length ? "0.8" : "inherit",
                        }}
                      >
                        {item.repoName}
                      </Typography>
                      {item.unmergedPRs.length ? (
                        <Chip
                          sx={{
                            color: "rgba(255, 0, 0, 0.8)",
                            borderColor: "rgba(255, 0, 0, 0.2)",
                            opacity: 0.8,
                          }}
                          label={`${item.unmergedPRs.length} unmerged PRs`}
                          color="red"
                          variant="outlined"
                        />
                      ) : null}
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
                        Last merged to master:
                      </div>
                      <div className="flex">
                        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                          <a
                            href={`https://example.com/branches/${item.LastMergedToMaster.branchName}`}
                            title={item.LastMergedToMaster.branchName}
                          >
                            {item.LastMergedToMaster.branchName}
                          </a>
                        </div>
                        <div className="flex-shrink-0 ml-1">
                          {" on " + item.LastMergedToMaster.mergedOn}
                        </div>
                      </div>
                    </React.Fragment>
                  }
                />
                {item.unmergedPRs.length > 0 &&
                  (open[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.unmergedPRs.length > 0 && (
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      p: 1,
                      backgroundColor: "rgba(255, 0, 0, 0.05)", // Lighter red
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)", // Lighter red on hover
                      },
                    }}
                  >
                    {item.unmergedPRs.map((pr, prIndex) => (
                      <ListItem key={prIndex} sx={{ pl: 4 }}>
                        <ListItemText
                          primary={
                            <a href={`https://example.com/prs/${pr.prId}`}>
                              {pr.prName}
                            </a>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                  color: "text.primary",
                                  display: "inline",
                                }}
                              >
                                PR ID: {pr.prId}
                              </Typography>
                              {" — Source Branch: "}
                              <a
                                href={`https://example.com/branches/${pr.srcBranchName}`}
                              >
                                {pr.srcBranchName}
                              </a>
                              {" — Target Branch: "}
                              <a
                                href={`https://example.com/branches/${pr.trgBranchName}`}
                              >
                                {pr.trgBranchName}
                              </a>
                              {" — Created On: " + pr.createdOn}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </div>
    </>
  );
};
