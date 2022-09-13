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

  // console.log(input);

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
    <div className="bg-biru h-screen">
      {/* <SideNav /> */}
      <div className="">
        <div>
          <table>
            <thead className="text-white">
              <tr>
                <th>Id</th>
                <th>Title</th>

                <th>Assignees</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {dataTask.length
                ? dataTask.map((el) => {
                    console.log(el);

                    return (
                      <tr key={el.id}>
                        <td
                          name="TaskId"
                          className="bg-white border-2 border-gray-700"
                        >
                          {el.id}
                        </td>
                        <td
                          name="title"
                          className="bg-white border-2 border-gray-700"
                        >
                          <input
                            type="text"
                            name="title"
                            defaultValue={el.title}
                            onChange={(e) => handleChangeEdit(e, el.id)}
                            onBlur={updateTask}
                          />
                        </td>

                        <td
                          name="userId"
                          className="bg-white border-2 border-gray-700"
                        >
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
                        <td
                          name="date"
                          className="bg-white border-2 border-gray-700"
                        >
                          <input
                            type="date"
                            name="date"
                            value={el.date}
                            onChange={(e) => handleChangeEdit(e, el.id)}
                            onBlur={updateTask}
                          />
                        </td>
                        <td className="bg-white border-2 border-gray-700">
                          <select
                            name="color"
                            value={el.color}
                            className=""
                            onChange={(e) => handleChangeEdit(e, el.id)}
                            onBlur={updateTask}
                          >
                            <option value="#E8697D" className="bg-red-200">
                              Urgent
                            </option>
                            <option value="#D7A463" className="bg-amber-200">
                              On Progress
                            </option>
                            <option value="#29A488" className="bg-green-200">
                              Done
                            </option>
                          </select>
                          {/* <input
                            value={el.color}
                            onChange={handleChangeEdit}
                            onBlur={updateTask}
                          /> */}
                        </td>
                        <td
                          name="createdAt"
                          className="bg-white border-2 border-gray-700"
                        >
                          {new Date(el.createdAt).toLocaleDateString("id-ID")}
                        </td>
                      </tr>
                    );
                  })
                : null}
              <tr>
                <td className="bg-white border-2 border-gray-700 px-20"></td>
                <td name="title" className="bg-white border-2 border-gray-700">
                  <input
                    value={input.title}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={createTask}
                  />
                </td>

                <td
                  name="userId"
                  className="bg-white border-2 border-gray-700 px-20"
                ></td>
                <td
                  name="date"
                  className="bg-white border-2 border-gray-700 px-20"
                ></td>
                <td
                  name="color"
                  className="bg-white border-2 border-gray-700 px-20"
                ></td>
                <td
                  name="createdAt"
                  className="bg-white border-2 border-gray-700 px-20"
                ></td>
              </tr>
              <TableInput />
              {/* } */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
