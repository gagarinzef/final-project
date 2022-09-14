import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import people from "../assets/people.png";
import axios from "axios";
import Swal from "sweetalert2";

function RegisterPage() {
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
    try {
      const { username, email, password } = input;
      const { data } = await axios(`http://localhost:3001/users`, {
        method: "post",
        data: { username, email, password },
      });
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Thank you for registering! ${data.message}`,
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => navigate("/"), 1700);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <div className="antialiased bg-gradient-to-r from-rose-800 to-yellow-600">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left h-screen md:items-center justify-center">
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl m-auto">
              <div className="flex flex-col w-full md:items-center mb-10">
                <img
                  src={"https://images-ext-2.discordapp.net/external/UJyLyld9NIfjmLolyhqa8UJs9LH0C9nonv7665KOYz4/https/i.postimg.cc/T3gw4x5j/unknown.png"}
                  alt="Wok-it-Out"
                  className="w-40 rounded-lg"
                />
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label
                    for="username"
                    className="text-gray-700 mb-2 font-bold"
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    onChange={handleChange}
                    type="username"
                    id="username"
                    placeholder="Please insert your username"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label
                    for="username"
                    className="text-gray-700 mb-2 font-bold"
                  >
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
                  <label
                    for="password"
                    className="text-gray-700 mb-2 font-bold"
                  >
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
                    className="w-full py-4 rounded-lg text-white bg-rose-600 transform hover:bg-rose-900 duration-300 ease-in-out"
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
                      <div className="font-bold">Register</div>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <span
                      href="#"
                      className="w-full text-center font-medium text-gray-500"
                    >
                      Already have an account?{" "}
                      <Link
                        to={"/"}
                        className="underline text-gray-500 hover:text-gray-900"
                      >
                        Login here
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

export default RegisterPage;
