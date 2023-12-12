import { useEffect, useMemo, useState } from "react";

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
  const [trainees, setTrainees] = useState([]);
  const [programs, setPrograms] = useState([]);
  let _user = localStorage.getItem("user");
  let user = {};
  if (_user) {
    user = JSON.parse(_user);
    // console.log(user.jobNumber);
  }
  // Fetch the product list on component mount
  useEffect(() => {
    const fetchTrainersList = async () => {
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
    fetchTrainersList();
    fetchProgramsList();
  }, []);
  //Loop and Return Dictionary of trainers list
  function filterObjectsByProperty(array, propertyKey, propertyValue) {
    const matchingObjects = array.filter(
      (obj) => obj[propertyKey] === propertyValue
    );
    return matchingObjects.map((obj) => obj.jobNumber);
  }
  // Loop and Return the halls list
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
        accessorKey: "_id",
        header: "Id",

        enableEditing: false,
        size: 80,
      },

      {
        accessorKey: "executedProgramNumber",
        header: "Executed Program Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: getUniqueValuesForKey(programs, ["programNumber"]),
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.executedProgramNumber,
          helperText: validationErrors?.executedProgramNumber,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              executedProgramNumber: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "traineeNumber",
        header: "Trainee Number",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: [user.jobNumber],
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.traineeNumber,
          helperText: validationErrors?.traineeNumber,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              traineeNumber: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "trainerEvaluation",
        header: "Trainer Evaluation",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.trainerEvaluation,
          helperText: validationErrors?.trainerEvaluation,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              trainerEvaluation: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "programNumber",
        header: "Program Evaluation", //I made a mistake in this name in the data base (programNumber)
        editVariant: "select",
        editSelectOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              programNumber: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "hallEvaluation",
        header: "Hall Evaluation",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        editVariant: "select",
        editSelectOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.hallEvaluation,
          helperText: validationErrors?.hallEvaluation,
          //remove any previous validation errors when user focuses on the input
          /*           onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              hallEvaluation: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
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
  } = useGetUsers(user.jobNumber);

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
    muiTableBodyProps: {
      sx: {
        backgroundColor: "#f5f5",
      },
    },
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
        <DialogTitle variant="h3">Create New Evaluation</DialogTitle>
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
        <DialogTitle variant="h3">Edit Evaluation</DialogTitle>
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
        Create New Evaluation
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
      const { _id, ...rest } = program;
      const findValueByKey = (list, searchKey, searchValue, resultKey) => {
        const result = list.find((item) => item[searchKey] === searchValue);
        return result ? result[resultKey] : null;
      };
      const { executedProgramNumber, traineeNumber, ...r } = rest;

      //send api update request here
      const res = await fetch("api/train/addProgramEvaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          executedProgramNumber: findValueByKey(
            programs,
            "programNumber",
            executedProgramNumber,
            "_id"
          ),
          traineeNumber: findValueByKey(
            trainees,
            "jobNumber",
            traineeNumber,
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
    onMutate: (newEvaluationInfo) => {
      queryClient.setQueryData(["Evaluation"], (prevEvaluation) => {
        [
          ...prevEvaluation,
          {
            ...newEvaluationInfo,
          },
        ];
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["Evaluation"] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers(jb) {
  return useQuery({
    queryKey: ["Evaluation"],
    queryFn: async () => {
      const res = await fetch("api/train/getAllProgramEvaluation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      //console.log(data);
      if (data.status === "Fail") {
        console.log(data.message);
      }

      let result = [];
      data.data.forEach((item) => {
        const {
          executedProgramNumber: { programNumber },

          traineeNumber: { jobNumber },
          ...rest
        } = item;
        if (jb === jobNumber) {
          result.push({
            ...rest,
            executedProgramNumber: programNumber,

            traineeNumber: jobNumber,
          });
        }
      });

      return result;
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser(programs, trainees) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (evaluation) => {
      const findValueByKey = (list, searchKey, searchValue, resultKey) => {
        const result = list.find((item) => item[searchKey] === searchValue);
        return result ? result[resultKey] : null;
      };
      const { _id, ...rest } = evaluation;

      const { executedProgramNumber, traineeNumber, ...r } = rest;
      //send api update request here
      const res = await fetch("api/train/EditProgramEvaluation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          executedProgramNumber: findValueByKey(
            programs,
            "programNumber",
            executedProgramNumber,
            "_id"
          ),
          traineeNumber: findValueByKey(
            trainees,
            "jobNumber",
            traineeNumber,
            "_id"
          ),
          ...r,
        }),
      });
      let data = await res.json();

      if (data.code == "500") {
        console.log(data.message);
      }
      return data.data;
    },
    //client side optimistic update
    onMutate: (newEvaluation) => {
      queryClient.setQueryData(["Evaluation"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser._id === newEvaluation._id ? newEvaluation : prevUser
        )
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["Evaluation"] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch("api/train/deleteProgramEvaluation", {
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
      queryClient.setQueryData(["Evaluation"], (prevUsers) =>
        prevUsers?.filter((user) => user._id !== userId)
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["Evaluation"] }), //refetch users after mutation, disabled for demo
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
    <div className="w-full h-screen">
      <Example />
    </div>
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
const validateNumberRequired = (value) => {
  // Check if the value is not undefined, not null, and not NaN
  return value !== undefined && value !== null && !isNaN(value) && value !== "";
};
function validateUser(evaluation) {
  return {
    executedProgramNumber: !validateNumberRequired(
      evaluation.executedProgramNumber
    )
      ? "Executed ProgramNumber is Required"
      : "",
    traineeNumber: !validateNumberRequired(evaluation.traineeNumber)
      ? "Trainee Number is Required"
      : "",
    trainerEvaluation: !validateNumberRequired(evaluation.trainerEvaluation)
      ? "Trainer Evaluation is Required"
      : "",
    programNumber: !validateNumberRequired(evaluation.programNumber)
      ? "Program Number is Required"
      : "",
    hallEvaluation: !validateNumberRequired(evaluation.hallEvaluation)
      ? "Hall Evaluation is Required"
      : "",
  };
}
