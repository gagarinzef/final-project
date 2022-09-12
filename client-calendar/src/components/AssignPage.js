import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Search Params buat ambil query di url
import loading from "../assets/loading.gif"

function AssignPage() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setTimeout(() => navigate(`/table/${params.projectId}`), 2000);
  }, []);

  return (
    <div className="AssignPage">
    <div className="flex justify-center mt-20">
      <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-1000">
        <img src="https://i.postimg.cc/s2rkZHpL/icon.jpg" className="w-40 h-40 m-auto mb-10"></img>
        <img src={loading} className="w-10 h-10 mt-10 mb-10 m-auto"></img>
        <p className="font-normal text-gray-700 text-xs">
         Redirecting to project page.. </p> 
      </a>
      </div>
  </div>
  );
}

export default AssignPage;
