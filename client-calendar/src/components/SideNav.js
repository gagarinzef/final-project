import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { success } from "../helpers/toast";
export default function SideNav({ handleSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleLogout = () => {
    localStorage.clear();
    const msg = {
      message: "Logout success",
    };
    navigate("/");
    success(msg);
  };
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-pink-700 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-100 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="cursor-pointer text-3xl md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0">
            WOKITOUT
          </div>
          <div
            className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
            id="example-collapse-sidebar"
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <a
                    href="/"
                    className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    DASHBOARD
                  </a>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-100 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid border-gray-500 placeholder-gray-300 text-white bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none text-left text-white">
              <li
                className="items-center mb-3 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <div className="flex items-center p-2 text-lg font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100">
                  <i className="fas fa-plus"></i>
                  <span className="ml-3 whitespace-nowrap">New</span>
                </div>
              </li>
              <li className="items-center mb-3">
                <Link
                  to={`/projects`}
                  className="flex items-center p-2 text-lg font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100"
                >
                  <i className="fas fa-tasks"></i>
                  <span className="ml-2 whitespace-nowrap">Projects</span>
                </Link>
              </li>
              {location.pathname !== "/projects" && (
                <li className="cursor-pointer">
                  <div className="flex items-center p-2 text-lg font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100">
                    <i className="fas fa-user-plus"></i>
                    <span className="ml-1 whitespace-nowrap">Invite</span>
                  </div>
                </li>
              )}
              <hr className="my-4 md:min-w-full" />
              <li className="cursor-pointer" onClick={handleLogout}>
                <div className="flex items-center p-2 text-lg font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100">
                  <i className="fas fa-sign-out-alt"></i>
                  <div className="flex ml-3 whitespace-nowrap font-bold">
                    Logout
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-abu outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-xl text-white font-bold">
                      NEW PROJECT
                    </h3>
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
                    onSubmit={(event) => {
                      handleSubmit(event, input);
                      setShowModal(false);
                    }}
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
      </nav>
    </>
  );
}
