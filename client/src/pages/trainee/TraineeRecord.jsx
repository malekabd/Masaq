import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf"; //or use your library of choice here
import logo from "../../images/logo.png";
import signature from "../../images/signature.png";
import autoTable from "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import toast from "react-hot-toast";
import React from "react";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [programs, setPrograms] = useState([]);
  let _user = localStorage.getItem("user");
  let user = {};
  if (_user) {
    user = JSON.parse(_user);
  }
  let target_value = user.jobNumber;
  const generatePDF = (row) => {
    function findProgramName(programs, targetProgramNumber) {
      for (const program of programs) {
        if (program.programNumber === targetProgramNumber) {
          return program.programName;
        }
      }
      return null;
    }
    const name = row.original.name;
    const program = row.original.programNumber;
    const pdfDoc = new jsPDF({
      orientation: "landscape",
    });

    // Add a decorative border
    pdfDoc.setDrawColor(255, 0, 0); // Red color for the border
    pdfDoc.rect(
      10,
      10,
      pdfDoc.internal.pageSize.getWidth() - 20,
      pdfDoc.internal.pageSize.getHeight() - 20
    );

    // Draw a circle
    pdfDoc.setFillColor(229, 249, 252); //  color
    pdfDoc.circle(
      pdfDoc.internal.pageSize.getWidth() / 2,
      pdfDoc.internal.pageSize.getHeight() / 2,
      60,
      "F"
    );

    // Add logo
    const logoWidth = 30; // Set the width of the logo
    const logoHeight = 30; // Set the height of the logo
    const logoX = (pdfDoc.internal.pageSize.getWidth() - logoWidth) / 11;
    const logoY = (pdfDoc.internal.pageSize.getHeight() - logoHeight) / 8.5;
    pdfDoc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Add title
    pdfDoc.setFontSize(34);
    pdfDoc.setTextColor(0, 51, 102);
    pdfDoc.text(
      "Certificate of Attendance",
      pdfDoc.internal.pageSize.getWidth() / 2,
      35,
      { align: "center" }
    );

    // Add first phrase
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(0, 51, 102);
    pdfDoc.text(
      "This is to certify that",
      pdfDoc.internal.pageSize.getWidth() / 2,
      70,
      { align: "center" }
    );

    // Add Employee name
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(51, 102, 0);
    pdfDoc.text(
      name.charAt(0).toUpperCase() + name.slice(1),
      pdfDoc.internal.pageSize.getWidth() / 2,
      80,
      {
        align: "center",
      }
    );

    // Add second phrase
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(0, 51, 102);
    pdfDoc.text(
      `Has attend the ${findProgramName(
        programs,
        program
      )} course within company training center`,
      pdfDoc.internal.pageSize.getWidth() / 2,
      90,
      { align: "center" }
    );

    // Add Progrma name
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(51, 102, 0);
    pdfDoc.text(
      "Statistical Reports",
      pdfDoc.internal.pageSize.getWidth() / 2,
      100,
      { align: "center" }
    );

    // Add an signture
    const imgWidth = 80; // Set the width of the signture
    const imgHeight = 80; // Set the height of the signture
    const imgX = (pdfDoc.internal.pageSize.getWidth() - imgWidth) / 1;
    const imgY = (pdfDoc.internal.pageSize.getHeight() - imgHeight) / 1;
    pdfDoc.addImage(signature, "PNG", imgX, imgY, imgWidth, imgHeight);

    // ...

    pdfDoc.save("certificate.pdf");
  };

  useEffect(() => {
    const fetchProgramsList = async () => {
      // console.log(jn);
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllImplementedProgram");
        const result = await response.json();
        setPrograms(result.data.implementedProgram);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProgramsList();
  });
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "programNumber",
        header: "Program Id",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "name",
        header: "name",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "attendanceType",
        header: "Attendance Type",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorKey: "trainerEvaluation",
        header: "Evaluation",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    [validationErrors]
  );

  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers(user.name, target_value);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("mrt-pdf-example.pdf");
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    initialState: { columnVisibility: { _id: false } },
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "100px",
      },
    },

    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Certificate">
          <IconButton onClick={() => generatePDF(row)}>
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows To PDF
        </Button>
      </Box>
    ),
    state: {
      isLoading: isLoadingUsers,

      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//READ hook (get users from api)
function useGetUsers(name, jn) {
  return useQuery({
    queryKey: ["ImplementedPrograms"],
    queryFn: async () => {
      const res = await fetch("api/train/getAllProgramEvaluation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();

      if (data.code === "500") {
        toast.error("Wrong credentials");
      }
      let result = [];
      data.data.forEach((item) => {
        const {
          executedProgramNumber: { programNumber, attendanceType },
          traineeNumber: { jobNumber },
          trainerEvaluation,
        } = item;

        if (jn == jobNumber) {
          result.push({
            programNumber,
            attendanceType,
            name: name,
            trainerEvaluation,
          });
        }
      });

      return result;
    },
    refetchOnWindowFocus: false,
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const ExampleWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;
