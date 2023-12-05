import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  programID,
  Name,
  Type,
  Department,
  Package,
  Evaluation,
  Certificate
) {
  return {
    programID,
    Name,
    Type,
    Department,
    Package,
    Evaluation,
    Certificate,
  };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

export default function TraineeRecord() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Program ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">type</StyledTableCell>
            <StyledTableCell align="center">Department</StyledTableCell>
            <StyledTableCell align="center">Package</StyledTableCell>
            <StyledTableCell align="center">Evaluation</StyledTableCell>
            <StyledTableCell align="center">Certificate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.programID}>
              <StyledTableCell component="th" scope="row">
                {row.programID}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Name}</StyledTableCell>
              <StyledTableCell align="center">{row.Type}</StyledTableCell>
              <StyledTableCell align="center">{row.Department}</StyledTableCell>
              <StyledTableCell align="center">{row.Package}</StyledTableCell>
              <StyledTableCell align="center">{row.Evaluation}</StyledTableCell>
              <StyledTableCell align="center">
                {row.Certificate}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
