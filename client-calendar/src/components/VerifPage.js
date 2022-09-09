import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ConfirmPage() {
  const params = useParams();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
    

  useEffect(() => {
    const verifUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/users/verify/${params.token}`)
            console.log(data);
            setMessage(data.message);
        } catch (error) {
            setError(true);
            setMessage(error.response.data.message);
        }
    }

    verifUser();
  }, [])
 
  console.log(params.token);
    
  return (
    <div className="ConfirmPage">
      <div className="flex justify-center mt-20">
        <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-1000">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">   
            TODO APP
          </h5>
          <p className="font-normal text-gray-700">
           {message}, Please Login first
          </p>
          {!error ? (<Link to="/login" className="bg-green-500 text-white">Login Page</Link>) : null}
        </a>
      </div>
    </div>
  );
}

export default ConfirmPage;