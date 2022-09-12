import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Search Params buat ambil query di url
import loading from "../assets/loading.gif"
import axios from "axios";

function InvitationPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const acceptInvite = async () => {
      try {
        const { data } = await axios(
          `http://localhost:3001/userprojects/accept?UserId=${searchParams.get("UserId")}&ProjectId=${searchParams.get("ProjectId")}`,
          {
            method: "post",
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setMessage(data.message);
        setTimeout(() => navigate(`/table/${searchParams.get("ProjectId")}`), 2000);
      } catch (error) {
        console.log(error);
        setError(true);
        setMessage(error.response.data.message);
        setTimeout(() => navigate(`/table/${searchParams.get("ProjectId")}`), 2000);
      }
    };

    acceptInvite();
  }, []);

  return (
    <div className="InvitationPage">
    <div className="flex justify-center mt-20">
      <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-1000">
      <img src="https://i.postimg.cc/s2rkZHpL/icon.jpg" className="w-40 h-40 m-auto mb-10"></img>
      {error ? ( <>
      <p className="font-normal text-gray-700"> {message} </p>
      <img src={loading} className="w-10 h-10 mt-10 mb-10 m-auto"></img>
        <p className="font-normal text-gray-700 text-xs">
         Redirecting to project page..
        </p>
      </>) : ( <>
    <p className="font-normal text-gray-700">
         {message}
        </p>
        <img src={loading} className="w-10 h-10 mt-10 mb-10 m-auto"></img>
        <p className="font-normal text-gray-700 text-xs">
         Redirecting to project page..
        </p> </>)}
      </a>
      </div>
  </div>
  );
}

export default InvitationPage;
