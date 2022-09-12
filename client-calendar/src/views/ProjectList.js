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
  console.log(projects);

  return (
    <div className="h-screen bg-biru flex ">
      <SideNav />
      <div className="items-center mx-16 my-4 w-screen text-start">
        <div className="bg-abu h-[85vh]">
          <h1 className="text-2xl text-white mx-6">Project's List:</h1>
          <ul>
            {projects.map((e) => {
              return (
                <Link to={`/table/${e?.Project?.id}`}>
                  <li className="text-white my-6 ml-32 hover:text-gray-500">
                    {e?.Project?.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}
