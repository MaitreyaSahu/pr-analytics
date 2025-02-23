import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Rating,
} from "@mui/material";
import { events } from "./Services/getPRTimeline";
import { PRAnalytics as rows } from "./Services/getPRAnalytics";
import "./PRAnalytics.css";
import { Timeline } from "./Components/TimeLine/Timeline";

export const PRAnalytics = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = rows?.sort((a, b) => {
    if (orderBy === "id" || orderBy === "rating") {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
    return order === "asc"
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex p-2 gap-2 justify-between align-center">
        <Typography variant="h6">PR Quality Report</Typography>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[]}
          size="small"
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Repository" />}
        />
      </div>
      <Timeline events={events} />

      {/* <Box sx={{ border: "1px solid #ccc", height: "100%" }}> */}
      <TableContainer component={Paper}>
        <Table aria-label="PR analytics table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "gray" }}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleRequestSort("id")}
                >
                  PR ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "gray" }}>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={() => handleRequestSort("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "gray" }}>
                <TableSortLabel
                  active={orderBy === "createdBy"}
                  direction={orderBy === "createdBy" ? order : "asc"}
                  onClick={() => handleRequestSort("createdBy")}
                >
                  Created By
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "gray" }}>
                <TableSortLabel
                  active={orderBy === "rating"}
                  direction={orderBy === "rating" ? order : "asc"}
                  onClick={() => handleRequestSort("rating")}
                >
                  Rating
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "gray" }}>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleRequestSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.createdBy}</TableCell>
                <TableCell>
                  <Rating value={row.rating} readOnly />
                </TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {/* </Box> */}
    </div>
  );
};
