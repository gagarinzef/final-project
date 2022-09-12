import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditableCell from "../components/table/EditableCells";
import SideNav from "../components/SideNav";
import TableData from "../components/table/TableData";
import Kanban from "../components/Kanban";
import CalendarPage from "../components/CalendarPage";

export default function TablePage() {
  const date = new Date();
  const lang = navigator.language;
  const { projectId } = useParams();

  const [page, setPage] = useState("Table");
  const [loading, setLoading] = useState(true);

  const [rowdata, setRowData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [calendar, setCalendar] = useState({
    month: date.toLocaleString(lang, { month: "long" }),
    dayName: date.toLocaleString(lang, { weekday: "long" }),
    dayNumber: date.getDate(),
  });
  const onAddRowClick = (page) => {
    setPage(page);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="flex bg-biru h-fit">
        <SideNav />

        <div className="container mx-auto my-20">
          <div className="flex justify-start mb-20">
            <button
              onClick={() => onAddRowClick("Table")}
              className="ml-10 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            >
              Table
            </button>
            <button
              onClick={() => onAddRowClick("Kanban")}
              className="ml-5 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            >
              Kanban
            </button>
          </div>
          {/* TABLE CONTAINER */}
          <div className="flex justify-center mt-8 mx-10">
            {/* <TableData columns={columns} data={rowdata} /> */}
            {page === "Kanban" && <Kanban task={projects.project.Tasks} />}
            {/* TABLE COMPONENT */}
            {page === "Table" && <TableData columns={columns} data={rowdata} />}
            {/* CALENDAR COMPONENT */}
            {page === "Calendar" && <CalendarPage />}
          </div>
        </div>

        <div className="w-56">
          {/* CALENDAR */}
          <button onClick={() => setPage("Calendar")}>
            <div className="my-5 flex-col justify-center items-center rounded-lg overflow-hidden shadow-md w-52 transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300">
              <div className="bg-blue-500 text-white py-4 px-8">
                <p className="text-2xl font-semibold text-white uppercase tracking-wide text-center">
                  {calendar.month}
                </p>
              </div>
              <div className="flex-col justify-center items-center">
                <p className="text-2xl text-gray-400 text-center pt-3 px-4 leading-none">
                  {calendar.dayName}
                </p>
                <p className="font-bold text-black text-center pb-3 px-4 leading-none text-8xl">
                  {calendar.dayNumber}
                </p>
              </div>
            </div>
          </button>
          {/* LIVECHAT */}
          <div className="my-20 text-white px-20 pt-20 pb-96 bg-abu">
            LIVECHAT
          </div>
        </div>
      </div>
    );
  }
}
