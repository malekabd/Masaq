import { useMemo, useState } from "react";

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
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "hallNumber",
        header: "Hall Number   ",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.hallNumber,
          helperText: validationErrors?.hallNumber,
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
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
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
        accessorKey: "location",
        header: "Location",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.location,
          helperText: validationErrors?.location,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              location: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "attendanceNumber",
        header: "Attendance Number",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.attendanceNumber,
          helperText: validationErrors?.attendanceNumber,
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
        accessorKey: "equipments",
        header: "Equipments",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.equipments,
          helperText: validationErrors?.equipments,
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
        <DialogTitle variant="h3">Edit Training</DialogTitle>
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
        Create New Training Hall
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
    mutationFn: async (hall) => {
      const { _id, ...rest } = hall;
      //send api update request here
      const res = await fetch("api/train/addTrainingHall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...rest }),
      });
      let data = await res.json();

      if (data.code === 500) {
        /*         toast.error("Wrong credentials");
         */ console.log("error");
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newHallInfo) => {
      queryClient.setQueryData(["Rooms"], (prevUsers) => {
        [
          ...prevUsers,
          {
            ...newHallInfo,
            //id: (Math.random() + 1).toString(36).substring(7),
          },
        ];
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Rooms"] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["Rooms"],
    queryFn: async () => {
      const res = await fetch("api/train/getAllTrainingHall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.status === "Fail") {
        console.log(data.message);
      }
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (hall) => {
      //send api update request here
      const res = await fetch("api/train/editTrainingHall", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hall),
      });
      let data = await res.json();
      console.log(data.code);
      if (data.code == "500") {
        /*         toast.error("Wrong credentials");
         */ toast.error(data.message);
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["Rooms"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Rooms"] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch("api/train/deleteTrainingHall", {
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
      queryClient.setQueryData(["Rooms"], (prevUsers) =>
        prevUsers?.filter((user) => user._id !== userId)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Rooms"] }), //refetch users after mutation, disabled for demo
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
/* const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ); */

function validateUser(hall) {
  return {
    hallNumber: !validateRequired(hall.hallNumber)
      ? "Hall Number is Required"
      : "",
    name: !validateRequired(hall.name) ? "Name is Required" : "",
    location: !validateRequired(hall.location) ? "Location is Required" : "",
    attendanceNumber: !validateRequired(hall.attendanceNumber)
      ? "Attendance Number is Required"
      : "",
    equipments: !validateRequired(hall.equipments)
      ? "Equipments is Required"
      : "",
  };
}
