import { useMemo, useState } from "react";
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
        accessorKey: "jobNumber",
        header: "Job Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "number",
          required: true,

          error: !!validationErrors?.jobNumber,
          helperText: validationErrors?.jobNumber,
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
        accessorKey: "name",
        header: "Name",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "string",
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          /*    onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.phoneNumber,
          helperText: validationErrors?.phoneNumber,
          //remove any previous validation errors when user focuses on the input
          /* onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "email",
        header: "email",
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
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
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
        accessorKey: "jobDescription",
        header: "Job Description",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.jobDescription,
          helperText: validationErrors?.jobDescription,
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
        accessorKey: "employer",
        header: "Employer",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.employer,
          helperText: validationErrors?.employer,
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
        accessorKey: "qualifications",
        header: "Qualifications",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.qualifications,
          helperText: validationErrors?.qualifications,
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
        accessorKey: "trainer",
        header: "Trainer",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: ["true", "false"],
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.trainer,
          helperText: validationErrors?.trainer,
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
        accessorKey: "trainee",
        header: "Trainee",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: ["true", "false"],
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.trainee,
          helperText: validationErrors?.trainee,
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
        accessorKey: "admin",
        header: "Admin",
        editVariant: "select",
        editSelectOptions: ["true", "false"],
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.admin,
          helperText: validationErrors?.admin,
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
        accessorKey: "password",
        header: "Password",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        muiEditTextFieldProps: {
          type: "Password",
          required: true,
          error: !!validationErrors?.password,
          helperText: validationErrors?.password,
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
    if (window.confirm("Are you sure you want to delete this Employee?")) {
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
    initialState: { columnVisibility: { _id: false, password: false } },
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
        <DialogTitle variant="h3">Create New Employee</DialogTitle>
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
        <DialogTitle variant="h3">Edit Employee</DialogTitle>
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
          Create New Employee
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
    mutationFn: async (employee) => {
      const { _id, ...rest } = employee;
     // console.log(rest);
      //send api update request here
      const res = await fetch("api/train/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      let data = await res.json();
      if (data.code == "500") {
        toast.error("Wrong credentials");
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newEmployeeInfo) => {
      queryClient.setQueryData(["Employees"], (prevEmployee) => {
        [
          ...prevEmployee,
          {
            ...newEmployeeInfo,
          },
        ];
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Employees"] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Employees"],
    queryFn: async () => {
      const res = await fetch("api/train/getAllEmployee", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();

      if (data.code == "500") {
        toast.error("Wrong credentials");
      }
      return data.data.employee;
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (employee) => {
      //send api update request here
      const { password, ...rest } = employee;
      let res = {};
      if (password.length > 23) {
        res = await fetch("api/train/editEmployee", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...rest }),
        });
      } else {
        res = await fetch("api/train/editEmployee", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...rest, password }),
        });
      }
      let data = await res.json();

      if (data.code == "500") {
        toast.error("Wrong credentials");
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["Employees"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Employees"] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch("api/train/deleteEmployee", {
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
      queryClient.setQueryData(["Employees"], (prevUsers) =>
        prevUsers?.filter((user) => user._id !== userId)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Employees"] }), //refetch users after mutation, disabled for demo
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
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateNumberRequired = (value) => {
  // Check if the value is not undefined, not null, and not NaN
  return value !== undefined && value !== null && !isNaN(value) && value !== "";
};
function validateUser(employee) {
  return {
    jobNumber: !validateNumberRequired(employee.jobNumber)
      ? "Job Number is Required"
      : "",
    name: !validateRequired(employee.name) ? "Name is Required" : "",
    phoneNumber: !validateNumberRequired(employee.phoneNumber)
      ? "Phone Number is Required"
      : "",
    email: !validateEmail(employee.email) ? "email is Required" : "",
    jobDescription: !validateRequired(employee.jobDescription)
      ? "Job Description is Required"
      : "",
    employer: !validateRequired(employee.employer)
      ? "Employer is Required"
      : "",
    qualifications: !validateRequired(employee.qualifications)
      ? "Qualifications is Required"
      : "",
    trainer: !validateRequired(employee.trainer) ? "Trainer is Required" : "",
    trainee: !validateRequired(employee.trainee) ? "Trainee is Required" : "",
    admin: !validateRequired(employee.admin) ? "Admin is Required" : "",
  };
}
