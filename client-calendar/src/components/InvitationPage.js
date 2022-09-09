import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom"; // Search Params buat ambil query di url
import axios from "axios";

function InvitationPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const acceptInvite = async () => {
      try {
        const { data } = await axios(
          `http://localhost:3001/userprojects/accept?UserId=${searchParams.get(
            "UserId"
          )}&ProjectId=${searchParams.get("ProjectId")}`,
          {
            method: "post",
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setMessage(data.message);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    acceptInvite();
  }, []);

  return (
    <div className="InvitationPage">
      <div className="flex justify-center mt-20">
        <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-1000">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            TODO APP
          </h5>
          {!error ? (
            <p className="font-normal text-gray-700">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="font-normal text-gray-700"> {error} </p>
          ) : null}
          <Link to="/" className="bg-green-500 text-white mt-5 rounded-lg"> Home Page </Link>
        </a>
      </div>
    </div>
  );
}

export default InvitationPage;
