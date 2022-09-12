import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditableCell from "../components/EditableCells";
import SideNav from "../components/SideNav";
import TableData from "../components/TableData";

export default function TablePage() {
  const { projectId } = useParams();
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

  const [projects, setProjects] = useState([]);
  console.log(projectId);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/projects/${projectId}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  return (
    <div className="flex bg-biru h-screen">
      <SideNav />

      <div className="container mx-auto my-20">
        <h1>{projects.name}</h1>
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
      <div className="w-56 ">
        <div className="my-20 text-white p-20 bg-abu grid-col">
          <h1>Calendar</h1> <Link to={"/calendar"}>click me</Link>
        </div>
        <div className="my-20 text-white px-20 pt-20 pb-96 bg-abu">
          LIVECHAT
        </div>
      </div>
    </div>
  );
}
