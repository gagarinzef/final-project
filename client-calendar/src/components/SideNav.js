import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function SideNav({ proId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name } = input;
      const { data } = await axios(`http://localhost:3001/projects`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        data: { name },
      });

      Swal.fire("Project created");
      setShowModal(false);
    } catch (error) {
      // TERMINAL ERROR
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    Swal.fire("Logout Success");
  };
  return (
    <aside className="w-56" aria-label="Sidebar">
      <div className="h-full overflow-y-auto py-4 px-3 rounded-lg bg-abu dark:bg-abu">
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center p-2 text-base font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100
"
            >
              <i className="fas fa-plus"></i>
              <span className="ml-3 whitespace-nowrap">New</span>
            </button>
          </li>
          <li>
            <Link
              to={`/projects`}
              className="flex items-center p-2 text-base font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100"
            >
              <i className="fas fa-tasks"></i>
              <span className="ml-3 whitespace-nowrap">Projects</span>
            </Link>
          </li>
          <li className="cursor-pointer">
            <div className="flex items-center p-2 text-base font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100">
              <i className="fas fa-user-plus"></i>
              <span className="ml-3 whitespace-nowrap">Invite</span>
            </div>
          </li>
          <hr className="bg-white" />
          <li className="cursor-pointer">
            <div className="flex items-center p-2 text-base font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100">
              <i className="fas fa-sign-out-alt"></i>
              <button
                onClick={handleLogout}
                className="flex ml-3 whitespace-nowrap font-bold"
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-abu outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl text-white font-bold">NEW PROJECT</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      <i className="fas fa-times"></i>
                    </span>
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="bg-abu shadow-md rounded px-8 pt-6 pb-8 w-full"
                >
                  <div className="relative p-6 flex-auto">
                    <label className="block text-white text-lg font-bold mb-2">
                      Title
                    </label>
                    <input
                      name="name"
                      type="name"
                      onChange={handleChange}
                      placeholder="My project"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black font-bold"
                    />
                  </div>
                  <div className="flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b justify-center">
                    <button
                      className="text-white bg-blue-600 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </aside>
  );
}
