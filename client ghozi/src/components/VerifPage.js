import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import loading from "../assets/loading.gif"
import axios from "axios";

function ConfirmPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");  

  useEffect(() => {
    const verifUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/users/verify/${params.token}`)
            setMessage(data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(true);
            setMessage(error.response.data.message);
        }
    }
    verifUser();
  }, [])
    
  return (
    <div className="ConfirmPage">
      <div className="flex justify-center mt-20">
        <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-1000">
        <img src="https://i.postimg.cc/s2rkZHpL/icon.jpg" className="w-40 h-40 m-auto mb-10"></img>
        {error ? ( <p className="font-normal text-gray-700"> {message} </p>) : ( <>
      <p className="font-normal text-gray-700">
           {message}
          </p>
          <img src={loading} className="w-10 h-10 mt-10 mb-10 m-auto"></img>
          <p className="font-normal text-gray-700 text-xs">
           Redirecting to login page..
          </p> </>)}
        </a>
      </div>
    </div>
  );
}

export default ConfirmPage;