import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import people from "../assets/people.png"
import { success } from "../helpers/toast";

function LoginPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // INPUT DATA TO SERVER
  const handleSubmit = async (event) => {
    event.preventDefault();
    const msg = {
      message: "Login success"
    }
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
      success(msg)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="antialiased bg-gradient-to-r from-rose-800 to-yellow-600">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full drop-shadow-xl shadow-stone-800">
            <img
              src={people}
              alt="Wok-it-Out"
              className="w-96 drop-shadow-xl shadow-stone-800"
            />
            <span className="text-6xl text-white font-extrabold w-96 text-center uppercase drop-shadow-xl shadow-stone-800">
              WokItOut
            </span>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="my-10 mx-10 bg-white p-10 flex flex-col w-full shadow-2xl shadow-gray-800 rounded-xl">
              <h2 className="text-4xl font-bold text-stone-800 text-left mb-5 m-auto">
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
                <div id="button" className="flex flex-col w-full my-5 ">
                  <button
                    type="submit"
                    className="w-full py-4 bg-rose-600 rounded-lg text-white transform hover:bg-rose-900 duration-300 ease-in-out"
                  >
                    <div className="flex flex-row items-center justify-center ">
                      <div className="mr-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
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
