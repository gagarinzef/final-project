import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TableInput from "./TableInput";

export default function TableTest() {
  const { projectId } = useParams();
  const [dataTask, setTask] = useState([]);
  const [member, setMember] = useState([]);
  const [input, setInput] = useState({
    title: "",
    email: "",
    date: "",
    color: "",
    TaskId: "",
    ProjectId: projectId,
  });
  const [inputEdit, setInputEdit] = useState({
    title: "",
    email: "",
    date: "",
    color: "",
    TaskId: "",
    UserId: "",
    ProjectId: projectId,
  });

  const fetchTask = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/projects/${projectId}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      setTask(data.project.Tasks);
      setMember(data.member);
      console.log(member);
      // setInput({ title: "", email: "", date: "", color: "", ProjectId: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    // console.log(input);
  };

  const handleChangeEdit = (event, TaskId) => {
    const { name, value } = event.target;
    setInputEdit({ ...inputEdit, [name]: value, TaskId });
    // console.log(input);
  };

  // console.log(localStorage.getItem("access_token"));

  const createTask = async () => {
    try {
      // console.log(input);

      let { data } = await axios(`http://localhost:3001/tasks`, {
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: input,
      });
      // console.log(data);
      fetchTask();
      setInput({ title: "", email: "", date: "", color: "", ProjectId: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios("http://localhost:3001/tasks", {
        method: "delete",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: id,
      });
      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      console.log(inputEdit);
      let { data } = await axios(`http://localhost:3001/tasks`, {
        method: "patch",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: inputEdit,
      });
      setTask(data);
      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dataTask) {
      fetchTask();
    }
  }, []);

  return (
    <div className="bg-white rounded-md p-0.5 container h-fit">
      <table className=" table-auto w-full border-spacing:20% h-max-40">
        <thead className="text-white">
          <tr className="divide-x-2 divide-black">
            <th className="bg-blue-700 bg-opacity-75 rounded-sm border-b-2 border-black">
              Id
            </th>
            <th className="bg-blue-700 bg-opacity-75 ">Title</th>
            <th className="bg-blue-700 bg-opacity-75 ">Assignees</th>
            <th className="bg-blue-700 bg-opacity-75 ">Due Date</th>
            <th className="bg-blue-700 bg-opacity-75 ">Priority</th>
            <th className="bg-blue-700 bg-opacity-75 ">Created At</th>
            <th className="bg-blue-700 bg-opacity-75 px-2 rounded-sm">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="overflow-scroll h-fit">
          {dataTask.length
            ? dataTask.map((el) => {
                console.log(el);

                return (
                  <tr
                    key={el.id}
                    className="divide-x-2 divide-y-2 divide-black"
                  >
                    <td
                      name="TaskId"
                      className="bg-white border-b-2 border-b-2 border-black "
                    >
                      {el.id}
                    </td>
                    <td name="title" className="bg-white  ">
                      <input
                        type="text"
                        name="title"
                        defaultValue={el.title}
                        onChange={(e) => handleChangeEdit(e, el.id)}
                        onBlur={updateTask}
                      />
                    </td>
                    <td name="userId" className="bg-white  ">
                      <select
                        name="UserId"
                        onChange={(e) => handleChangeEdit(e, el.id)}
                        onBlur={updateTask}
                      >
                        <option disabled selected></option>
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
                        value={el.date}
                        onChange={(e) => handleChangeEdit(e, el.id)}
                        onBlur={updateTask}
                      />
                    </td>
                    <td className="bg-white  ">
                      <select
                        name="color"
                        value={el.color}
                        className={
                          el.color === "#E8697D"
                            ? "bg-[#E8697D] rounded-lg p-1"
                            : el.color === "#D7A463"
                            ? "bg-[#D7A463] rounded-lg p-1"
                            : el.color === "#29A488"
                            ? "bg-[#29A488] rounded-lg p-1"
                            : ""
                        }
                        onChange={(e) => handleChangeEdit(e, el.id)}
                        onBlur={updateTask}
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
                      {/* <input
                            value={el.color}
                            onChange={handleChangeEdit}
                            onBlur={updateTask}
                          /> */}
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
                          class="w-6 h-6"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
          <tr className="divide-x-2 divide-y-2 divide-black">
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

            <td name="userId" className="bg-white    px-20"></td>
            <td name="date" className="bg-white    px-20"></td>
            <td name="color" className="bg-white    px-20"></td>
            <td name="createdAt" className="bg-white   px-20"></td>
            <td className="divide-x-2 divide-y-2 divide-black"></td>
          </tr>
          <TableInput />
          {/* } */}
        </tbody>
      </table>
    </div>
  );
}
