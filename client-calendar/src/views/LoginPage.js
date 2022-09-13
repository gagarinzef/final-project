import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  // TO HANDLE DELETE EVENTS
  const eventClick = (event) => {
    console.log(event.event._def.publicId);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // INPUT DATA TO SERVER
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = input;
      const { data } = await axios(`http://localhost:3001/users/login`, {
        method: "post",
        data: { email, password },
      });
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("access_token", data.access_token);
      navigate(`/projects`);
      Swal.fire("Login Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="antialiased bg-biru">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <img
              src="https://i.imgur.com/j5gSXf9.png"
              alt="Wok-it-Out"
              className="w-80"
            />
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className=" my-10 mx-10 bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-4xl font-bold text-gray-800 text-left mb-5 m-auto">
                LOGIN
              </h2>
              <form onSubmit={handleSubmit} className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="username" className="text-gray-500 mb-2">
                    E-mail
                  </label>
                  <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    id="email"
                    placeholder="Please insert your email"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    id="password"
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type="submit"
                    className="w-full py-4 bg-abu rounded-lg text-white"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </div>
                      <div className="font-bold">Login</div>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <span
                      href="#"
                      className="w-full text-center font-medium text-gray-500"
                    >
                      Don't have an account?{" "}
                      <Link
                        to={"/register"}
                        className="underline text-gray-500 hover:text-gray-900"
                      >
                        Register here
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
