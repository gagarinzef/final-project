import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../../store/actions";
import { errorHandler } from "../../helpers/toast";
import Swal from "sweetalert2";

export default function TableTest({ data, trigger, title }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [task, setTask] = useState([]);
  const [member, setMember] = useState([]);
  const [input, setInput] = useState({
    title: "",
    email: "",
    date: "",
    color: "",
    TaskId: "",
    ProjectId: projectId,
  });
  const [inputEdit, setInputEdit] = useState({});

  useEffect(() => {
    console.log(data, "tabletest");
    if (data.project) {
      setTask(data?.project?.Tasks);
    } else {
      trigger(6);
    }
    setMember(data.member);
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleChangeEdit = (event, el) => {
    const { name, value } = event.target;
    setInputEdit({ ...el, [name]: value });
  };

  const createTask = () => {
    dispatch(fetchData(`http://localhost:3001/tasks`, "POST", input))
      .then(() => {
        trigger(input);
        setInput({
          title: "",
          email: "",
          date: "",
          color: "",
          ProjectId: projectId,
        });
      })
      .catch((err) => {
        // errorHandler(err);
      });
  };

  const updateTask = (e, el) => {
    let newInput = inputEdit;
    let obj = {};
    const { value, name } = e.target;
    let status;

    if (name === "color") {
      if (value === "#29A488") {
        status = "Done";
      } else if (value === "#E8697D") {
        status = "Urgent";
      } else if (value === "#D7A463") {
        status = "On Progress";
      }
      obj = {
        ...el,
        status,
        color: value,
      };
      newInput = obj;
    }

    dispatch(
      fetchData(`http://localhost:3001/tasks/${newInput.id}`, "PATCH", newInput)
    )
      .then((data) => {
        trigger(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          return dispatch(
            fetchData(`http://localhost:3001/tasks/${id}`, "DELETE")
          );
        }
      })
      .then(() => {
        trigger(id);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  const handleFilter = (e) => {
    switch (e.target.id) {
      case "asc":
        title({ sort: "ASC" });
        break;
      case "desc":
        title({ sort: "DESC" });
        break;
      case "oldest":
        title({ sort: { created: "ASC" } });
        break;
      case "newest":
        title({ sort: { created: "DESC" } });
        break;
      case "user":
        title({ UserId: e.target.value });
        break;
      case "none":
        title({ UserId: "none" });
        break;
      case "latest":
        title({ sort: { due: "DESC" } });
        break;
      case "older":
        title({ sort: { due: "ASC" } });
        break;
      case "urgent":
        title({ status: "Urgent" });
        break;
      case "onprogress":
        title({ status: "On Progress" });
        break;
      case "done":
        title({ status: "Done" });
        break;
      case "priority":
        title({ status: "none" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="container overflow-visible">
      <div className="bg-white rounded-md p-0.5">
        <table className="table-auto w-full border-spacing:20%">
          <thead className="text-white">
            <tr className="divide-x-2 divide-slate-300">
              <th className="bg-blue-600 rounded-sm border-b-2 border-slate-300 ">
                No.
              </th>
              <th className="bg-blue-600 group relative dropdown px-4 hover:text-gray-900 cursor-pointer font-bold text-base tracking-wide text-center">
                <div className="flex flex-row justify-center">
                  <p>Title</p>
                  <img
                    className="w-3 h-3 mt-1.5 -mr-20 ml-20"
                    src="https://img.icons8.com/ultraviolet/40/000000/circled-chevron-down.png"
                  />
                </div>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                  <ul className="w-48 bg-blue-600 shadow rounded-lg mt-0.5 ml-1">
                    <li
                      id="asc"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      A-Z
                    </li>
                    <li
                      id="desc"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Z-A
                    </li>
                  </ul>
                </div>
              </th>
              <th className="bg-blue-600 group relative dropdown px-4 hover:text-gray-900 cursor-pointer font-bold text-base tracking-wide text-center">
                <div className="flex flex-row justify-center">
                  <p>Asiggnees</p>
                  <img
                    className="w-3 h-3 mt-1.5 -mr-20 ml-12"
                    src="https://img.icons8.com/ultraviolet/40/000000/circled-chevron-down.png"
                  />
                </div>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                  <ul className="w-52 bg-blue-600 shadow rounded-lg mt-0.5 ml-2">
                    <li
                      id="none"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      All
                    </li>
                    {member
                      ? member.map((el) => (
                          <li
                            id="user"
                            className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                            value={el.User.id}
                            onClick={handleFilter}
                            key={el.id}
                          >
                            {el.User.username}
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </th>
              <th className="bg-blue-600 group relative dropdown px-4 hover:text-gray-900 cursor-pointer font-bold text-base tracking-wide text-center">
                <div className="flex flex-row justify-center">
                  <p>Due Date</p>
                  <img
                    className="w-3 h-3 mt-1.5 -mr-5 ml-1"
                    src="https://img.icons8.com/ultraviolet/40/000000/circled-chevron-down.png"
                  />
                </div>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                  <ul className="w-36 bg-blue-600 shadow rounded-lg mt-0.5 ml-1">
                    <li
                      id="latest"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Latest
                    </li>
                    <li
                      id="older"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Oldest
                    </li>
                  </ul>
                </div>
              </th>
              <th className="bg-blue-600 group relative dropdown px-4 hover:text-gray-900 cursor-pointer font-bold text-base tracking-wide text-center">
                <div className="flex flex-row justify-center">
                  <p>Priority</p>
                  <img
                    className="w-3 h-3 mt-1.5 -mr-5 ml-1"
                    src="https://img.icons8.com/ultraviolet/40/000000/circled-chevron-down.png"
                  />
                </div>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                  <ul className="w-36 bg-blue-600 shadow rounded-lg mt-0.5 ml-1">
                    <li
                      id="priority"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      All Priority
                    </li>
                    <li
                      id="urgent"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Urgent
                    </li>
                    <li
                      id="onprogress"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Onprogress
                    </li>
                    <li
                      id="done"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Done
                    </li>
                  </ul>
                </div>
              </th>
              <th className="bg-blue-600 group relative dropdown px-4 hover:text-gray-900 cursor-pointer font-bold text-base tracking-wide text-center">
                <div className="flex flex-row justify-center">
                  <p>Created At</p>
                  <img
                    className="w-3 h-3 mt-1.5 -mr-5 ml-1"
                    src="https://img.icons8.com/ultraviolet/40/000000/circled-chevron-down.png"
                  />
                </div>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                  <ul className="w-36 bg-blue-600 shadow rounded-lg mt-0.5 ml-1">
                    <li
                      id="newest"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Newest
                    </li>
                    <li
                      id="oldest"
                      className="py-1 block hover:text-gray-900 hover:bg-blue-400 text-white cursor-pointer rounded-lg"
                      onClick={handleFilter}
                    >
                      Oldest
                    </li>
                  </ul>
                </div>
              </th>
              <th className="bg-blue-600 px-2 rounded-sm">Action</th>
            </tr>
          </thead>
          <tbody className="h-fit">
            {task.length ? (
              task.map((el, idx) => {
                return (
                  <tr
                    key={el.id}
                    className="divide-x-2 divide-y-2 divide-slate-300"
                  >
                    <td
                      name="TaskId"
                      className="bg-white border-b-2 border-slate-300 "
                    >
                      {idx + 1}
                    </td>
                    <td name="title" className="bg-white  ">
                      <input
                        type="text"
                        name="title"
                        className="focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        defaultValue={el.title}
                        onChange={(e) => handleChangeEdit(e, el)}
                        onBlur={updateTask}
                      />
                    </td>
                    <td name="userId" className="bg-white  ">
                      <select
                        name="UserId"
                        className="focus:outline-none"
                        onChange={(e) => handleChangeEdit(e, el)}
                        onBlur={updateTask}
                      >
                        <option selected className="text-center">
                          -
                        </option>
                        {member.map((e) => {
                          return (
                            <option
                              selected={
                                el.UserId === e.User.id ? "selected" : ""
                              }
                              key={e.User.id}
                              value={e.User.id}
                            >
                              {e.User.email}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td name="date" className="bg-white  ">
                      <input
                        type="date"
                        name="date"
                        className="focus:outline-none"
                        defaultValue={el.date}
                        onChange={(e) => handleChangeEdit(e, el)}
                        onBlur={updateTask}
                      />
                    </td>
                    <td className={`bg-[${el.color}] cursor-pointer`}>
                      <select
                        name="color"
                        defaultValue={el.color}
                        className={`bg-[${el.color}] w-full text-start px-5 cursor-pointer focus:outline-none`}
                        onChange={(e) => updateTask(e, el)}
                      >
                        <option value="#E8697D" className="bg-[#E8697D]">
                          Urgent
                        </option>
                        <option value="#D7A463" className="bg-[#D7A463]">
                          On Progress
                        </option>
                        <option value="#29A488" className="bg-[#29A488]">
                          Done
                        </option>
                      </select>
                    </td>
                    <td name="createdAt" className="bg-white  ">
                      {new Date(el.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteTask(el.id)}
                        className="text-red-800 pt-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1>not found</h1>
            )}
            <tr className="divide-x-2 divide-y-2 divide-slate-300">
              <td className="bg-white px-20 rounded-md"></td>
              <td name="title" className="bg-white   ">
                <input
                  value={input.title}
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={createTask}
                />
              </td>

              <td name="userId" className="bg-white "></td>
              <td name="date" className="bg-white "></td>
              <td name="color" className="bg-white "></td>
              <td name="createdAt" className="bg-white "></td>
              <td className="divide-x-2 divide-y-2 divide-slate-300"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
