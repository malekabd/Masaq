import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    jobNumber: 8,
    name: "malek",
    phoneNumber: `0597140281`,
    email: "malek@gmail.com",
    jobDescription: "Cnc",
    employer: "AnBilArbi",
    qualifications: "PHD",
    trainer: "false",
    trainee: "false",
    admin: "true",
  },
];

const Example = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "jobNumber", //access nested data with dot notation
        header: "Job Number",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "phoneNumber", //normal accessorKey
        header: "Phone Number",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "jobDescription",
        header: "Job Description",
        size: 150,
      },
      {
        accessorKey: "employer",
        header: "Employer",
        size: 150,
      },
      {
        accessorKey: "qualifications",
        header: "Qualifications",
        size: 150,
      },
      {
        accessorKey: "trainer",
        header: "Trainer",
        size: 150,
      },
      {
        accessorKey: "trainee",
        header: "Trainee",
        size: 150,
      },
      {
        accessorKey: "admin",
        header: "Admin",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
