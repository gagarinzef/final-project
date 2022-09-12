import axios from "axios";
import { useEffect, useState } from "react";
import SideNav from "../SideNav";
import TableInput from "./TableInput";

export default function TableTest() {
  const [dataTask, setTask] = useState();

  const createTask = async () => {
    try {
      let { data } = await axios.post(`http://localhost:3001/tasks`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: data,
      });
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      let { data } = await axios.patch(`http://localhost:3001/tasks`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: data,
      });
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        let { data } = await axios.get(`http://localhost:3001/tasks`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setTask(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);
  console.log(dataTask);
  return (
    <div className="bg-biru h-screen">
      {/* <SideNav /> */}
      <div className="">
        <div>
          <table>
            <thead className="text-white">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Assignees</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {dataTask.map((el) => {
                return (
                  <tr>
                    <td
                      name="title"
                      className="bg-white border-2 border-gray-700"
                    >
                      <input onBlur={updateTask} />
                    </td>
                    <td
                      name="status"
                      className="bg-white border-2 border-gray-700"
                    >
                      <input onBlur={updateTask} />
                    </td>
                    <td
                      name="userId"
                      className="bg-white border-2 border-gray-700"
                    >
                      <input onBlur={updateTask} />
                    </td>
                    <td
                      name="date"
                      className="bg-white border-2 border-gray-700"
                    >
                      <input onBlur={updateTask} />
                    </td>
                    <td
                      name="color"
                      className="bg-white border-2 border-gray-700"
                    >
                      <input onBlur={updateTask} />
                    </td>
                    <td
                      name="createdAt"
                      className="bg-white border-2 border-gray-700"
                    >
                      <input onBlur={updateTask} />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td name="title" className="bg-white border-2 border-gray-700">
                  <input onBlur={createTask} />
                </td>
                <td name="status" className="bg-white border-2 border-gray-700">
                  <input onBlur={createTask} />
                </td>
                <td name="userId" className="bg-white border-2 border-gray-700">
                  <input onBlur={createTask} />
                </td>
                <td name="date" className="bg-white border-2 border-gray-700">
                  <input onBlur={createTask} />
                </td>
                <td name="color" className="bg-white border-2 border-gray-700">
                  <input onBlur={createTask} />
                </td>
                <td
                  name="createdAt"
                  className="bg-white border-2 border-gray-700"
                >
                  <input onBlur={createTask} />
                </td>
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
