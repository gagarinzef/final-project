import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/projects`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  return (
    <div className="h-screen bg-biru flex ">
      <SideNav />
      <div className="items-center mx-16 my-4 w-screen text-start">
        <div className="bg-slate-600 h-[85vh] p-6 rounded-lg">
          <h1 className="text-2xl text-white mx-6">Project's List:</h1>

          {/* STARTING CARD HERE */}
          <div className="flex flex-wrap m-5">

            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    CREATE PROJECT
                  </h1>
                  <p className="text-center"> + </p>
                </div>
              </div>
            </div>

            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>

            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>
            <div className="m-5 rounded-xl shadow-xl items-center w-1/6">
              <div className="bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-72 justify-between">
                <div className="relative overflow-hidden items-center">
                  <h1 className="px-4 mt-3 mb-2 font-bold text-[12px] text-center">
                    ini di loop dari project.map
                  </h1>
                </div>
              </div>
            </div>

          </div>

          {/* INI MASUKIN KE CARD */}
          {projects.map((e) => {
            return (
              <Link to={`/table/${e?.Project?.id}`} key={e.id}>
                <div className="text-white my-6 ml-32 hover:text-gray-500">
                  {e?.Project?.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
}
