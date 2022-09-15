import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { errorHandler, success } from "../helpers/toast";
import { URL_SERVER } from "../helpers/server-link";

export default function SideNav({ trigger }) {
  const location = useLocation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [showModalCP, setModalCP] = useState(false);
  const [showModal, setModal] = useState(false);

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
      const { data } = await axios(`${URL_SERVER}/projects`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        data: { name },
      });
      trigger(data);
      Swal.fire("Project created");
      setModalCP(false);
    } catch (error) {
      // TERMINAL ERROR
      errorHandler(error);
    }
  };

  const handleSubmitInv = async (event) => {
    event.preventDefault();
    try {
      const { email } = input;
      const { data } = await axios(`${URL_SERVER}/userprojects`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        data: { email, ProjectId: projectId },
      });
      Swal.fire("Invitation Sent");
      setModal(false);
    } catch (error) {
      // TERMINAL ERROR
      errorHandler(error);
    }
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
                onClick={() => setModalCP(true)}
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
                  <div
                    onClick={() => setModal(true)}
                    className="flex items-center p-2 text-lg font-bold hover:text-gray-900 w-full rounded-lg text-white hover:bg-gray-100"
                  >
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

        {showModalCP ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
              <div className="relative w-96 my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col  z-50 w-full bg-gradient-to-r from-pink-900 to-pink-500 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-2xl text-slate-100 font-bold uppercase mt-2">
                      Create Project
                    </h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setModalCP(false)}
                    >
                      <span className="text-black opacity-7 h-5 w-5 text-xl bg-white rounded-full">
                        <i className="fas fa-times-circle h-7 w-7"></i>
                      </span>
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-2 w-full"
                  >
                    <div className="relative p-4 flex-auto">
                      <label className="block text-slate-700 text-md font-extrabold mb-1">
                        <a
                          target="_blank"
                          href="https://icons8.com/icon/DUi0tw0LJ06n/training"
                        ></a>
                        <img
                          className="h-16"
                          src="https://img.icons8.com/fluency/48/000000/training.png"
                        />
                        Project's Title
                      </label>
                      <input
                        name="name"
                        type="name"
                        onChange={handleChange}
                        placeholder="My Project"
                        className="shadow appearance-none border rounded w-full mb-6 py-2 px-1 text-black"
                      />
                    </div>
                    <div className="flex items-center justify-center px-2 pb-2    rounded-b">
                      <button
                        className="text-white bg-pink-600 active:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0  z-50 outline-none focus:outline-none">
              <div className="relative w-96 my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-pink-900 to-pink-500 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-2xl text-white font-bold uppercase">
                      Invite To Project
                    </h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setModal(false)}
                    >
                      <span className="text-black opacity-7 h-5 w-5 text-xl bg-white py-0 rounded-full">
                        <i className="fas fa-times-circle h-7 w-7"></i>
                      </span>
                    </button>
                  </div>
                  <a href="https://icons8.com/icon/OumT4lIcOllS/mail"></a>
                  <form
                    onSubmit={handleSubmitInv}
                    className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-2 w-full"
                  >
                    <div className="relative p-4 flex-auto">
                      <img
                        className="h-16 pl-28 pb-2 scale-110"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFUElEQVRoge2WXWwUVRTHf3d2trvdtutKgQoUhYAofqGY+B0T5UVIeDEGg4EnEIyGEDTQiCEpPqgJkGiIBXnwC40PxhAiEBJ5KxAiBOwDxEA0wVqk1Jbdht12d2fv8WG/ZqYzy2679YWeh93Zu/fc+//97zkzA1MxFXd2qElZtfNCjFFzJ4o1aAHkIGndyadPxOu9Vf0BOnpWguoCaUdAIYCA0C/INnYt/bae29UPYNv52ajAXkReVQBSEG6/FkDJMZHA2+xZerUe204coFMMUj3rFbIboSUvtCDcfi1S2ExAJIWSD3Vv725+XJWbyPYTA+g4v0RpDgBP2YXanVdF57GdQhnsNw0b+Oz5s+OVMD6ALacbjWCoQzTbQYIuUQXR3kDFbxuYpZAuK6c/oOulW5MP8N755QrdBTLPQ4xTtMv5ymDSB7Ip9/myQ5MDsPlMm2EGdgmsHSPat+YrA3mCIUcsMd5i/7K+OgGI4t1f1xqoPSDTKzjoJcYXUrnyXGBxpenMzjmzl85OPX6ALacXKgL7FbLMX8xtS6M8x2uNSmDISWUZGzNfrbhUG8CGc0GjyXofke1AqOrS8BXjJbqcd5tyTIvWH1nB/o85sDHrlmp66TeaMvvQrCsea/fmx3hufoufCZMSp64M8fIn3SCEFLIzlJ0xNw1vuud5ApDTq/POACI8c18ErSf0vKk5nl1wF2hNsRxF5A2qBWhf0h4ZuHydTDINCLlcxT6avJA8QDgaYe4LiyMXvxk7xRMgMi3CvU/PJ/H3EINX+v9394thmgZtj8+j7ckFGMrwnuOXrJQi1t5K04wWDvdmWDnHd2rdQ4ATN+GRNS9iNoYQAV1qbmdUVCWA2RBkR88oh/8K0PFwkAXN3k7UKy6PwL5+uJgkL14LYr85ucIfoHBbK+adHbJ4/aTFa+0m7ywyaarzgQxZ8P2gwfEhRa4oWIriJd8OtQA4Ho4FCkvDD1eznLieZdMikxWzAxN+H7cEjiUMDv5rkso5BbshqgdwuQ9iezjCwCjs6LH46apFx0MB7m8ZX1n1jBh8MRCkN0OpVByuC6Bt19UCeLlfGqfszIWbsPqUxSv3wJYHTWLB6oRfyyq+HGrgXCpQUXBpTPKAVQP4uu8YzX9ogaN9Qnd/lvULDVbNVRg+dZXUcGi4gZ+Hg2RF5cvCIbhQKoKtee37Vwtgf1VxjRfdL+PkPxNZ2HMpx5Fe2LpY8WisnKaB7lQD3yXCxC1VECU+gm1jpV7wElMBoDTXfoQe7nuV2O/DsO6MZvks2PQADGHydaKRK1nTV7D7buPVC7XdhWp0vzQupakcvQa/9CuaZwaJTjdhPILdvVA1AOXkWtzPp0np/7SlSfelGB5M0zorQigSqE2wqxeqBpiI+478Ql4mlePaH8NEog1Ma2vEMFVVgktjNT/IbC5W4749zTsvv14yniEVT9MyPUy0NYRCVRRcbuYaT8DLxUrui23y2DznelogcWOU5M0MsZlhwk1BX8FSOBE/w/wBJsF9XCZkMzlu9CYJR4LE2sIEAmqMYMettpYSquxiDe671iubUJ47ksww8meGlrtDNMdChbWl8ICzl1YtJVTBRa9lnJC2PFsvOfFxmCNAYjBNMpEh2hom1GiWG3w870KODco/y7u5XCzJrqrE/PIEKyMM/pMi1BggOs1WVsXSqhbAz0VHKdghK7gvt3HfPl6cOpq0GE3eIhJtoDnaUDbAI7zfg4XE5LiPT56MMUEEbsXTDPQlGU1aiJZE9QBKtqJUvP7ui0ee7dthQv4fy9LEB0ckOZw54Kl1KqZiKqZiKu7o+A/gRPfqlm7e7AAAAABJRU5ErkJggg=="
                      />
                      <a href="https://icons8.com/icon/OumT4lIcOllS/mail"></a>
                      <label className="block text-slate-700 text-sm font-extrabold mb-1">
                        E-mail
                      </label>
                      <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        placeholder="wok-it-out@mail.com"
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black font-bold"
                      />
                    </div>
                    <div className="flex items-center p-6 rounded-b justify-center">
                      <button
                        className="text-white bg-pink-600 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
