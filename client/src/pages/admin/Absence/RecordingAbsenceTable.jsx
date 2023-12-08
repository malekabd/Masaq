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
  const [programs, setPrograms] = useState([]);
  const [trainees, setTrainees] = useState([]);

  // Fetch the product list on component mount
  useEffect(() => {
    const fetchProgramsList = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllImplementedProgram");
        const result = await response.json();
        setPrograms(result.data.implementedProgram);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTraineesList = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllEmployee");
        const result = await response.json();
        // Update the state with the fetched data
        setTrainees(result.data.employee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProgramsList();

    fetchTraineesList();
  }, []);
  //Loop and Return Dictionary of trainers list
  function filterObjectsByProperty(array, propertyKey, propertyValue) {
    const matchingObjects = array.filter(
      (obj) => obj[propertyKey] === propertyValue
    );
    return matchingObjects.map((obj) => obj.jobNumber);
  }
  function getUniqueValuesForKey(arrayOfObjects, selectedKey) {
    const uniqueValues = new Set();

    arrayOfObjects.forEach((obj) => {
      const value = obj[selectedKey];
      if (value !== undefined) {
        uniqueValues.add(value);
      }
    });

    return Array.from(uniqueValues);
  }
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
          type: "number",
          required: true,
          error: !!validationErrors?.number,
          helperText: validationErrors?.number,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              number: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "programNumber",
        header: "Program Number",
        editVariant: "select",
        editSelectOptions: getUniqueValuesForKey(programs, ["programNumber"]),
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
              programNumber: undefined,
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
          type: "number",
          required: true,
          error: !!validationErrors?.TodayTraining,
          helperText: validationErrors?.TodayTraining,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              TodayTraining: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "employeeNumber",
        header: "Employee Number",
        editVariant: "select",
        editSelectOptions: filterObjectsByProperty(trainees, "trainee", "true"),
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
              employeeNumber: undefined,
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
          type: "number",
          required: true,
          error: !!validationErrors?.present,
          helperText: validationErrors?.present,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              present: undefined,
            }),
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
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser(
    programs,
    trainees
  );
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser(
    programs,
    trainees
  );
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
function useCreateUser(programs, trainees) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program) => {
      // Loop and Return the id base on the targeted value
      const findValueByKey = (list, searchKey, searchValue, resultKey) => {
        const result = list.find((item) => item[searchKey] === searchValue);
        return result ? result[resultKey] : null;
      };
      const { _id, ...rest } = program;

      const { programNumber, employeeNumber, ...r } = rest;

      //send api update request here
      const res = await fetch("api/train/addRegistrationOfTrainee ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programNumber: findValueByKey(
            programs,
            "programNumber",
            programNumber,
            "_id"
          ),
          employeeNumber: findValueByKey(
            trainees,
            "jobNumber",
            employeeNumber,
            "_id"
          ),
          ...r,
        }),
      });
      let data = await res.json();
      console.log(data);
      if (data.code == "500") {
        toast.error("Wrong credentials");
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
      // console.log(data.data);
      if (data.code == "500") {
        toast.error("Wrong credentials");
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
        // console.log(result);
      });
      return result;
    },
    refetchOnWindowFocus: true,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser(programs, trainees) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program) => {
      const findValueByKey = (list, searchKey, searchValue, resultKey) => {
        const result = list.find((item) => item[searchKey] === searchValue);
        return result ? result[resultKey] : null;
      };
      //send api update request here

      const { programNumber, employeeNumber, ...r } = program;

      const res = await fetch("api/train/editRegistrationOfTrainee", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programNumber: findValueByKey(
            programs,
            "programNumber",
            programNumber,
            "_id"
          ),
          employeeNumber: findValueByKey(
            trainees,
            "jobNumber",
            employeeNumber,
            "_id"
          ),
          ...r,
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
const validateNumberRequired = (value) => {
  // Check if the value is not undefined, not null, and not NaN
  return value !== undefined && value !== null && !isNaN(value) && value !== "";
};
function validateUser(register) {
  return {
    number: !validateNumberRequired(register.number)
      ? " Number is Required"
      : "",
    programNumber: !validateNumberRequired(register.programNumber)
      ? "Name is Required"
      : "",
    employeeNumber: !validateNumberRequired(register.employeeNumber)
      ? "Employee Number is Required"
      : "",
    TodayTraining: !validateNumberRequired(register.TodayTraining)
      ? "Today Training is Required"
      : "",

    present: !validateNumberRequired(register.present)
      ? "Present is Required"
      : "",
  };
}
