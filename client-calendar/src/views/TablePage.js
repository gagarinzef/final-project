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
import { errorHandler } from "../helpers/toast";
import { URL_SERVER } from "../helpers/server-link";

export default function TablePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const date = new Date();
  const lang = navigator.language;
  const { projectId } = useParams();
  const [page, setPage] = useState("Calendar");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [calendar, setCalendar] = useState({
    month: date.toLocaleString(lang, { month: "long" }),
    dayName: date.toLocaleString(lang, { weekday: "long" }),
    dayNumber: date.getDate(),
  });

  const [trigger, setTrigger] = useState("");
  const [input, setInput] = useState({
    start: "",
    end: "",
    status: "",
    sort: "",
    UserId: "",
  });

  const value = (data) => {
    console.log(data);
    setTrigger(data);
  };

  const title = (data) => {
    setInput({ ...input, ...data });
    setTrigger(data);
  };

  useEffect(() => {
    dispatch(
      fetchData(
        `${URL_SERVER}/projects/${projectId}?key=${JSON.stringify(input)}`,
        "GET",
        null,
        "project"
      )
    )
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        if (err === "User not Authorized") {
          navigate("/projects");
        }
        errorHandler(err);
      });
  }, [trigger, input]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTrigger(input);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <div className="flex">
        <SideNav />
        <div className="flex min-h-screen w-full bg-[#EFEFEF] ml-60">
          <div className="container mx-auto my-5">
            <div className="flex justify-start">
              <button
                onClick={() => setPage("Table")}
                className="ml-10 bg-stone-800 text-white transform hover:-translate-y-1 duration-300 ease-in-out hover:bg-white hover:text-black font-bold py-2 px-4 rounded shadow-lg shadow-slate-700"
              >
                Table
              </button>
              <button
                onClick={() => setPage("Kanban")}
                className="ml-2 bg-stone-800 text-white transform hover:-translate-y-1 duration-300 ease-in-out hover:bg-white hover:text-black font-bold py-2 px-4 rounded shadow-lg shadow-slate-700"
              >
                Kanban
              </button>
              <button
                onClick={() => setPage("Calendar")}
                className="ml-2 bg-stone-800 text-white transform hover:-translate-y-1 duration-300 ease-in-out hover:bg-white hover:text-black font-bold py-2 px-4 rounded shadow-lg shadow-slate-700"
              >
                Calendar
              </button>
            </div>
            {page !== "Kanban" && (
              <div className="flex justify-end">
                <div className="container bg-stone-800 p-3 rounded-lg w-1/2 mx-9 my-4">
                  <h1 className="text-white flex justify-start mb-3 font-bold">
                    Posted Date
                  </h1>
                  <div className="flex justify-start">
                    <div className="flex">
                      <form onSubmit={handleSubmit}>
                        <label className=" text-white">From :</label>
                        <input
                          name="start"
                          type="date"
                          onChange={handleChange}
                          value={input.start}
                          className="mx-4"
                        />
                        <label className="text-white">To :</label>
                        <input
                          name="end"
                          type="date"
                          onChange={handleChange}
                          value={input.end}
                          className="ml-4"
                        />
                        <button
                          type="submit"
                          className="text-white mx-4 px-4 py-1 bg-green-800 hover:bg-green-400 transform hover:-translate-y-1 duration-500 ease-in-out rounded-md shadow-lg shadow-slate-700"
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
                        className="text-white px-4 py-1 bg-green-800 hover:bg-green-400 transform hover:-translate-y-1 duration-500 ease-in-out rounded-md shadow-lg shadow-slate-700"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <Loading />
            ) : (
              <div className="flex justify-center mt-2 mx-10">
                {page === "Kanban" && <Kanban trigger={value} />}
                {/* TABLE COMPONENT */}
                {page === "Table" && (
                  <TableTest data={project} trigger={value} title={title} />
                )}
                {/* CALENDAR COMPONENT */}
                {page === "Calendar" && (
                  <CalendarPage data={project} trigger={value} />
                )}
              </div>
            )}
          </div>

          {/* CALENDAR */}
          <div className="w-96 mr-16">
            <button onClick={() => setPage("Calendar")}>
              <div className="my-5 flex-col justify-center items-center rounded-lg overflow-hidden shadow-slate-800 shadow-lg w-52 transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300">
                <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-200 text-black py-4 px-8">
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
            <div className="container m-auto bg-gradient-to-r from-rose-700 to-pink-600 rounded-xl mb-7 mt-3 text-white shadow-gray-500 shadow-lg">
              <h1 className="text-3xl font-bold p-2">
                {project?.project?.name}
              </h1>
            </div>

            {/* LIVECHAT */}
            <div className="fixed bottom-0">
              <button
                onClick={() => setToggle(!toggle)}
                className={`${
                  !toggle ? "animate-bounce" : "animate-none"
                } w-full inline-block px-24 py-2.5 bg-stone-800 text-white font-medium leading-tight rounded-md shadow-md 
                hover:bg-white hover:shadow-lg hover:text-stone-800 
                focus:shadow-lg  
                focus:outline-none focus:ring-0 
                active:shadow-lg transition duration-150 ease-in-out mb-1 mt-6 text-lg`}
              >
                <span>Messaging</span>
                {!toggle ? (
                  <i className="fas fa-chevron-up px-2"></i>
                ) : (
                  <i class="fas fa-chevron-down px-2"></i>
                )}
              </button>
              {toggle && (
                <div className="container m-auto text-white rounded-lg bg-white">
                  <div className="p-3">
                    <ChatRoom />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
