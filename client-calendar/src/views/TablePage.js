import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import Kanban from "../components/Kanban";
import CalendarPage from "../components/CalendarPage";
import TableTest from "../components/table/TableTest";
import ChatRoom from "../components/ChatRoom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/actions";
import Loading from "../components/Loader/Loading";

export default function TablePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const date = new Date();
  const lang = navigator.language;
  const { projectId } = useParams();
  const [page, setPage] = useState("Table");
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState({
    month: date.toLocaleString(lang, { month: "long" }),
    dayName: date.toLocaleString(lang, { weekday: "long" }),
    dayNumber: date.getDate(),
  });
  const [trigger, setTrigger] = useState("");
  const [input, setInput] = useState({
    start: "",
    end: "",
  });

  const value = (data) => {
    setTrigger(data);
  };

  useEffect(() => {
    console.log(input);
    dispatch(
      fetchData(
        `http://localhost:3001/projects/${projectId}?key=${JSON.stringify(
          input
        )}`,
        "GET",
        null,
        "project"
      )
    )
      .then(() => setLoading(false))
      .catch((err) => {
        if (err === "User not Authorized") {
          navigate("/projects");
        }
        console.log(err);
      });
  }, [trigger]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTrigger(input);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {}, [project, dispatch, projectId]);

  return (
    <>
      <div>
        <div className="flex min-h-screen w-full bg-biru">
          <SideNav />
          <div className="container mx-auto my-5">
            <div className="flex justify-start mb-15">
              <button
                onClick={() => setPage("Table")}
                className="ml-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Table
              </button>
              <button
                onClick={() => setPage("Kanban")}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Kanban
              </button>
            </div>

            <h1 className="text-white flex justify-start pt-4 pl-10 text-weight-bold">
              By Created At
            </h1>
            <div className="flex justify-star pl-10">
              <div></div>
              <div className="flex justify-between">
                <form onSubmit={handleSubmit}>
                  <label className=" text-white">Start:</label>
                  <input
                    name="start"
                    type="date"
                    onChange={handleChange}
                    value={input.start}
                    className="mx-2"
                  />
                  <label className="text-white">End:</label>
                  <input
                    name="end"
                    type="date"
                    onChange={handleChange}
                    value={input.end}
                    className="ml-2"
                  />
                  <button
                    type="submit"
                    className="text-white mx-2 px-4 py-1 bg-blue-600 rounded-md"
                  >
                    Filter
                  </button>
                </form>
                <button
                  onClick={() => {
                    setInput({
                      start: "",
                      end: "",
                    });
                    setTrigger(5);
                  }}
                  className="text-white px-4 py-1 bg-blue-600 rounded-md "
                >
                  Clear
                </button>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="flex justify-center mt-8 mx-10">
                {page === "Kanban" && <Kanban trigger={value} />}
                {/* TABLE COMPONENT */}
                {page === "Table" && (
                  <TableTest data={project} trigger={value} />
                )}
                {/* CALENDAR COMPONENT */}
                {page === "Calendar" && (
                  <CalendarPage data={project} trigger={value} />
                )}
              </div>
            )}
          </div>

          <div className="w-96 mr-16">
            {/* CALENDAR */}
            <button onClick={() => setPage("Calendar")}>
              <div className="my-5 flex-col justify-center items-center rounded-lg overflow-hidden shadow-slate-800 shadow-lg w-52 transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300">
                <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-200 text-white py-4 px-8">
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
            <div className="container m-auto text-white rounded-lg bg-[#121212] shadow-slate-700 shadow-xl">
              <div className="p-3">
                <ChatRoom />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
