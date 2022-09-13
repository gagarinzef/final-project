import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import Swal from "sweetalert2";

export default function ProjectList() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/projects`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, []);
  console.log(projects);

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
      fetchProject();
    } catch (error) {
      // TERMINAL ERROR
      console.log(error);
    }
  };

  const openProject = (id) => {
    navigate(`/table/${id}`);
  };

  return (
    <div className="h-screen bg-biru flex ">
      <SideNav />
      <div className="items-center mx-16 my-4 w-screen text-start">
        <div className="bg-slate-600 h-[85vh] p-6 rounded-lg">
          <h1 className="text-2xl text-white mx-6">Project's List:</h1>

          {/* STARTING CARD HERE */}
          <div className="flex flex-wrap m-5  ">
            <div
              className="m-5 rounded-xl shadow-xl items-center w-1/6 duration-200 hover:scale-110"
              onClick={() => setShowModal(true)}
            >
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-64 justify-between">
                <div className="relative overflow-hidden items-center">
                  <i className="fas fa-plus fa-4x flex px-24 pt-16 scale-50 hover:scale-75 hover:drop-shadow-lg"></i>
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[16px] text-center">
                    CREATE PROJECT
                  </h1>
                </div>
              </div>
            </div>
            {/* END CARD */}

            {projects.map((e) => {
              return (
                <div
                  key={e.id}
                  className="m-5 rounded-xl shadow-xl items-center w-1/6"
                >
                  <div
                    onClick={() => openProject(e?.Project?.id)}
                    className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-64 justify-between duration-200 hover:scale-110"
                  >
                    <div className="relative overflow-hidden ">
                      <h1 className="break-all px-7 mt-4 pt-4 mb-2 font-bold text-[24px] text-start">
                        {e?.Project?.name}
                      </h1>
                      <div className="pl-6">
                        {/* <i class="fas fa-caret-down fa-2x"></i> */}
                        <img src="https://img.icons8.com/fluency/48/000000/open-book.png" />
                        <a
                          target="_blank"
                          href="https://icons8.com/icon/39FLspc26r4c/open-book"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INI MASUKIN KE CARD */}
          {/* {projects.map((e) => {
            return (
              <Link to={`/table/${e?.Project?.id}`} key={e.id}>
                <div className="text-white my-6 ml-32 hover:text-gray-500">
                  {e?.Project?.name}
                </div>
              </Link>
            );
          })} */}
        </div>
        <div></div>
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-abu outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl text-white font=semibold">
                    General Info
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="bg-abu shadow-md rounded px-8 pt-6 pb-8 w-full"
                >
                  <div className="relative p-6 flex-auto">
                    <label className="block text-white text-sm font-bold mb-1">
                      Project's Name
                    </label>
                    <input
                      name="name"
                      type="name"
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-white bg-cyan-600 active:bg-cyan-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
    </div>
  );
}
