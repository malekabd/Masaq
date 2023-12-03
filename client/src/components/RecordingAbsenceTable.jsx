import { useMemo, useState, useEffect } from "react";
import axios from "axios";
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
  const [program, setProgram] = useState([]);
  const [trainee, setTrainees] = useState([]);

  const fetchProgramsList = useMemo(
    () => async () => {
      try {
        setProgram([]);
        const p = await axios.get("/api/train/getAllImplementedProgram"); // Replace with your API endpoint

        p.data.data.implementedProgram.forEach((item) => {
          const { _id: p_id, programNumber } = item;

          setProgram((oldArray) => [
            ...oldArray,
            [programNumber, p_id].join("@"),
          ]);
        });
      } catch (error) {
        console.error("Error fetching program list:", error);
      }
    },
    []
  );

  const fetchTrainersList = useMemo(
    () => async () => {
      try {
        setTrainees([]);
        const t = await axios.get("/api/train/getAllEmployee"); // Replace with your API endpoint
        t.data.data.employee.forEach((item) => {
          const { _id: t_id, jobNumber, trainee } = item;

          if (trainee == "true") {
            setTrainees((oldArray) => [
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

    fetchTrainersList();
  }, [fetchProgramsList, fetchTrainersList]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "number",
        header: "Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.number,
          helperText: validationErrors?.number,
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
        accessorKey: "programNumber",
        header: "Program Number",
        editVariant: "select",
        editSelectOptions: program.filter((v, i, a) => a.indexOf(v) === i),
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
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "TodayTraining",
        header: "Today Training",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.TodayTraining,
          helperText: validationErrors?.TodayTraining,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "employeeNumber",
        header: "Employee Number",
        editVariant: "select",
        editSelectOptions: trainee.filter((v, i, a) => a.indexOf(v) === i),
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.employeeNumber,
          helperText: validationErrors?.employeeNumber,
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
        accessorKey: "present",
        header: "present",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableClickToCopy: true,
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.present,
          helperText: validationErrors?.present,
          //remove any previous validation errors when user focuses on the input
          /* onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "_id",
        header: "Id",
        enableEditing: false,
        size: 80,
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
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original._id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
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
        <DialogTitle variant="h3">
          Create New Registration of trainees
        </DialogTitle>
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
        <DialogTitle variant="h3">Edit Registration</DialogTitle>
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
      <Button
        style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Registration
      </Button>
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

      const { programNumber, employeeNumber, ...r } = rest;

      //send api update request here
      const res = await fetch("api/train/addRegistrationOfTrainee ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programNumber: programNumber.split("@")[1],
          employeeNumber: employeeNumber.split("@")[1],
          ...r,
        }),
      });
      let data = await res.json();
      console.log(data);
      if (data.code === "500") {
        toast.error(data.message);
      }
      return data;
    },
    //client side optimistic update
    onMutate: (newProgram) => {
      queryClient.setQueryData(["Programs"], (prevProgram) => {
        [
          ...prevProgram,
          {
            ...newProgram,
          },
        ];
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Programs"] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["Programs"],
    queryFn: async () => {
      const res = await fetch("api/train/getAllRegistrationOfTrainee", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.code === "500") {
        toast.error(data.message);
      }
      let result = [];
      data.data.forEach((item) => {
        //console.log(item);
        const {
          programNumber: { programNumber },
          employeeNumber: { jobNumber },

          ...rest
        } = item;

        result.push({
          ...rest,
          programNumber,
          employeeNumber: jobNumber,
        });
      });
      return result;
    },
    refetchOnWindowFocus: true,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program) => {
      //send api update request here
      const { _id, ...rest } = program;

      const { programNumber, employeeNumber, ...r } = rest;
      console.log(programNumber.split("@")[1]);
      console.log(employeeNumber.split("@")[1]);
      const res = await fetch("api/train/editRegistrationOfTrainee", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programNumber: programNumber.split("@")[1],
          employeeNumber: employeeNumber.split("@")[1],
          ...r,
        }),
      });
      let data = await res.json();
      console.log(data.code);
      if (data.code == "500") {
        toast.error(data.message);
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["Programs"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Programs"] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch("api/train/deleteRegistrationOfTrainee", {
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
      queryClient.setQueryData(["Programs"], (prevUsers) =>
        prevUsers?.filter((user) => user._id !== userId)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Programs"] }), //refetch users after mutation, disabled for demo
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

function validateUser(register) {
  return {
    number: !validateRequired(register.number) ? " Number is Required" : "",
    programNumber: !validateRequired(register.programNumber)
      ? "Name is Required"
      : "",
    TodayTraining: !validateRequired(register.TodayTraining)
      ? "Today Training is Required"
      : "",

    employeeNumber: !validateRequired(register.employeeNumber)
      ? "Employee Number is Required"
      : "",
    present: !validateRequired(register.present) ? "Present is Required" : "",
  };
}
