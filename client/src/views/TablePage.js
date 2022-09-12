import React, { useState, useEffect } from "react";
import EditableCell from "../components/EditableCells";
import SideNav from "../components/SideNav";
import TableData from "../components/TableData";

export default function App() {
  const [rowdata, setRowData] = useState([]);
  const onAddRowClick = () => {
    setRowData(
      rowdata.concat({
        title: "",
        description: "",
        status: "",
        assignees: "",
        dueDate: "",
        priority: "",
        createdAt: "",
      })
    );
  };
  const columns = [
    {
      Header: "Title",
      accessor: "title",
      Cell: EditableCell,
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: EditableCell,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: EditableCell,
    },
    {
      Header: "Assignees",
      accessor: "assignees",
      Cell: EditableCell,
    },
    {
      Header: "Due Date",
      accessor: "dueDate",
      Cell: EditableCell,
    },
    {
      Header: "Priority",
      accessor: "priority",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        const onItemClick = (value) => {
          console.log("value", value);
          updateMyData(index, id, value);
        };
        return (
          <select
            title={"priority"}
            onItemClick={onItemClick}
            selectedValue={initialValue}
          >
            <option className="bg-red-500 hover:bg-red-700 text-white">
              Urgent
            </option>
            <option className="bg-amber-500 hover:bg-amber-700 text-white">
              Medium
            </option>
            <option className="bg-green-500 hover:bg-green-700 text-white">
              Relax
            </option>
          </select>
        );
      },
    },

    {
      Header: "Created at",
      accessor: "createdAt",
      Cell: EditableCell,
    },
  ];
  return (
    <div className="flex justify-between bg-biru h-screen">
      <SideNav />
      <div className="container mx-auto my-20">
        <button
          onClick={onAddRowClick}
          className="ml-10 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Row
        </button>
        <div className="flex justify-center mt-8 mx-10">
          <TableData columns={columns} data={rowdata} />
        </div>
      </div>
      <div className="w-56">
        <div className="my-20 text-white p-20 bg-abu">CALENDAER</div>
        <div className="my-20 text-white px-20 pt-20 pb-96 bg-abu">
          LIVECHAT
        </div>
      </div>
    </div>
  );
}
