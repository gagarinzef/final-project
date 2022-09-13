import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/actions";

export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      fetchData(`http://localhost:3001/projects`, "GET", null, "projects")
    )
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="h-screen bg-biru flex ">
        <SideNav />
        <div className="items-center mx-16 my-4 w-screen text-start">
          <div className="bg-abu h-[85vh] p-6">
            <h1 className="text-2xl text-white mx-6">Project's List:</h1>
            <ul>
              {projects.map((e) => {
                return (
                  <Link to={`/table/${e.ProjectId}`} key={e.id}>
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
}
