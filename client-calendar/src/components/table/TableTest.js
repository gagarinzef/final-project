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

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });

  };

  const handleChangeEdit = (event, TaskId) => {
    const { name, value } = event.target;
    setInputEdit({ ...inputEdit, [name]: value, TaskId });
  };



  const createTask = async () => {
    try {
      await axios(`http://localhost:3001/tasks`, {
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: input,
      });

      fetchTask();
      setInput({ title: "", email: "", date: "", color: "", ProjectId: 1 });
    } catch (error) {
      console.log(error);
    }
  };



  const updateTask = async () => {
    try {
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
                          <option
                            value="#D7A463"
                            className="bg-[#D7A463]"
                            selected={
                              el.color === "#D7A463" ? "selected" : ""
                            }
                          >
                            On Progress
                          </option>
                          <option
                            value="#E8697D"
                            className="bg-[#E8697D]"
                            selected={
                              el.color === "#E8697D" ? "selected" : ""
                            }
                          >
                            Urgent
                          </option>
                          <option
                            value="#29A488"
                            className="bg-[#29A488]"
                            selected={
                              el.color === "#29A488" ? "selected" : ""
                            }
                          >
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
