import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import React from "react";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [trainingHalls, setTrainingHalls] = useState([]);
  const [program, setProgram] = useState([]);
  const [trainer, setTrainers] = useState([]);

  const fetchProgramsList = useMemo(
    () => async () => {
      try {
        setProgram([]);
        const p = await axios.get("/api/train/getAllIncludedProgram"); // Replace with your API endpoint

        p.data.data.includedProgram.forEach((item) => {
          //  console.log(item);
          const { _id: p_id, programNumber } = item;

          setProgram((oldArray) => [
            ...oldArray,
            [programNumber, p_id].join("@"),
          ]);
        });
        console.log(program);
      } catch (error) {
        console.error("Error fetching program list:", error);
      }
    },
    []
  );

  const fetchHallsList = useMemo(
    () => async () => {
      try {
        setTrainingHalls([]);
        const h = await axios.get("/api/train/getAllTrainingHall"); // Replace with your API endpoint

        h.data.data.forEach((item) => {
          const { _id: h_id, hallNumber } = item;

          setTrainingHalls((oldArray) => [
            ...oldArray,
            [hallNumber, h_id].join("@"),
          ]);
        });
      } catch (error) {
        console.error("Error fetching halls list:", error);
      }
    },
    []
  );

  const fetchTrainersList = useMemo(
    () => async () => {
      try {
        setTrainers([]);
        const t = await axios.get("/api/train/getAllEmployee"); // Replace with your API endpoint
        t.data.data.employee.forEach((item) => {
          //console.log(item);
          const { _id: t_id, jobNumber, trainer } = item;
          console.log(trainer);
          if (trainer == "true") {
            setTrainers((oldArray) => [
              ...oldArray,
              [jobNumber, t_id].join("@"),
            ]);
          }
        });
      } catch (error) {
        console.error("Error fetching trainer list:", error);
      }
    },
    []
  );
  // Fetch the product list on component mount
  useEffect(() => {
    fetchProgramsList();
    fetchHallsList();

    fetchTrainersList();
  }, [fetchProgramsList, fetchHallsList, fetchTrainersList]);

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
        header: "Program Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.programNumber,
          helperText: validationErrors?.programNumber,
          //remove any previous validation errors when user focuses on the input
          /*      onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "includedProgramNumber",
        header: "Included Program Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: program.filter((v, i, a) => a.indexOf(v) === i),
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.includedProgramNumber,
          helperText: validationErrors?.includedProgramNumber,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },

      {
        accessorKey: "date",
        header: "Date",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "date",
          required: true,
          error: !!validationErrors?.date,
          helperText: validationErrors?.date,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "hallNumber",
        header: "Hall Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableClickToCopy: true,
        editVariant: "select",
        editSelectOptions: trainingHalls.filter(
          (v, i, a) => a.indexOf(v) === i
        ),
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.hallNumber,
          helperText: validationErrors?.hallNumber,
          //remove any previous validation errors when user focuses on the input
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
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.attendanceType,
          helperText: validationErrors?.attendanceType,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "targetedCategory",
        header: "Targeted Category",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.targetedCategory,
          helperText: validationErrors?.targetedCategory,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "trainerNumber",
        header: "Trainer Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: trainer.filter((v, i, a) => a.indexOf(v) === i),
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.trainerNumber,
          helperText: validationErrors?.trainerNumber,
        },
      },
      {
        accessorKey: "days",
        header: "Days",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.days,
          helperText: validationErrors?.days,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "attendanceNumber",
        header: "Attendance Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.attendanceNumber,
          helperText: validationErrors?.attendanceNumber,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "traineeList",
        header: "Trainee List",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.traineeList,
          helperText: validationErrors?.traineeList,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
    ],
    [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this Schedule?")) {
      deleteUser(row.original._id);
    }
  };

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
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Training Hall</DialogTitle>
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
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Implemented Program</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
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
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
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
          style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Create New Implemented Program
        </Button>
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
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program) => {
      const { _id, ...rest } = program;
      //console.log(rest);
      const { includedProgramNumber, hallNumber, trainerNumber, ...r } = rest;

      //send api update request here
      const res = await fetch("api/train/addImplementedProgram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          includedProgramNumber: includedProgramNumber.split("@")[1],
          hallNumber: hallNumber.split("@")[1],
          trainerNumber: trainerNumber.split("@")[1],
          ...r,
        }),
      });
      let data = await res.json();

      if (data.code === "500") {
        toast.error(data.message);
      }
      return data.data.implementedProgram;
    },
    //client side optimistic update
    onMutate: (newHallInfo) => {
      queryClient.setQueryData(["ImplementedPrograms"], (prevUsers) => {
        [
          ...prevUsers,
          {
            ...newHallInfo,
            //id: (Math.random() + 1).toString(36).substring(7),
          },
        ];
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["ImplementedPrograms"] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["ImplementedPrograms"],
    queryFn: async () => {
      const res = await fetch("api/train/getAllImplementedProgram", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();
      // console.log(data.data.implementedProgram);
      if (data.code === "500") {
        toast.error("Wrong credentials");
      }
      let result = [];
      data.data.implementedProgram.forEach((item) => {
        console.log(item);
        const {
          includedProgramNumber: { programNumber },
          hallNumber: { hallNumber },
          trainerNumber: { _id, jobNumber, trainer },
          ...rest
        } = item;

        result.push({
          ...rest,
          includedProgramNumber: programNumber,
          hallNumber,
          trainerNumber: jobNumber,
        });
      });
      console.log(result);
      return result;
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program) => {
      const { includedProgramNumber, hallNumber, trainerNumber, ...rest } =
        program;
      //send api update request here
      const res = await fetch("api/train/editImplementedProgram", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          includedProgramNumber: includedProgramNumber.split("@")[1],
          hallNumber: hallNumber.split("@")[1],
          trainerNumber: trainerNumber.split("@")[1],
          ...rest,
        }),
      });
      let data = await res.json();

      if (data.code == "500") {
        toast.error("Wrong credentials");
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["ImplementedPrograms"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["ImplementedPrograms"] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch("api/train/deleteImplementedProgram", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(["ImplementedPrograms"], (prevUsers) =>
        prevUsers?.filter((user) => user._id !== userId)
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["ImplementedPrograms"] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient({
  //sets up the cashe
  defaultOptions: {
    queries: {
      //this is the amount of time that the data in the cash will stay fresh
      staleTime: 0,
    },
  },
});

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;

function validateUser(program) {
  return {
    programNumber: !validateRequired(program.programNumber)
      ? "Program Number is Required"
      : "",
    includedProgramNumber: !validateRequired(program.includedProgramNumber)
      ? "Included ProgramNumber is Required"
      : "",
    date: !validateRequired(program.date) ? "Date Number is Required" : "",
    hallNumber: !validateRequired(program.hallNumber)
      ? "Hall Number is Required"
      : "",
    attendanceType: !validateRequired(program.attendanceType)
      ? "Attendance Type is Required"
      : "",
    targetedCategory: !validateRequired(program.targetedCategory)
      ? "Targeted Category is Required"
      : "",
    trainerNumber: !validateRequired(program.trainerNumber)
      ? "Trainer Number is Required"
      : "",
    days: !validateRequired(program.days) ? "Days is Required" : "",
    attendanceNumber: !validateRequired(program.attendanceNumber)
      ? "Attendance Number is Required"
      : "",
    traineeList: !validateRequired(program.traineeList)
      ? "Trainee List is Required"
      : "",
  };
}
