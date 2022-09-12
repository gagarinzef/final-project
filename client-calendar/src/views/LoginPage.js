import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
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
      localStorage.setItem("access_token", data.access_token);
      navigate(`/projects`);
      Swal.fire("Login Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <body class="antialiased bg-biru">
        <div class="container px-6 mx-auto">
          <div class="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
            <div class="flex flex-col w-full">
              <img
                src="https://i.imgur.com/j5gSXf9.png"
                alt="Wok-it-Out"
                class="w-80"
              />
              {/* card-start */}

              <div class="bg-abu lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 mr-20 mt-10">
                <div class="-mt-6 relative">
                  <p class="text-white text-sm  font-bold px-7 lg:px-9 2xl:pt-6 2xl:mx-2">
                    I received a job offer mid-course, and the subjects I
                    learned were current, if not more so, in the company I
                    joined. I honestly feel I got every penny’s worth.
                  </p>
                </div>
              </div>

              {/* card-end */}
            </div>
            <div class="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
              {/* card  */}
              <div class="bg-abu lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 mr-20">
                <div class="-mt-6 relative">
                  <p class="text-white text-md  font-bold px-7 lg:px-9 2xl:pt-6 2xl:mx-2">
                    I received a job offer mid-course, and the subjects I
                    learned were current, if not more so, in the company I
                    joined. I honestly feel I got every penny’s worth.
                  </p>
                </div>
              </div>
              {/* card-end */}
              <div class=" my-10 mx-10 bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                <h2 class="text-2xl font-bold text-gray-800 text-left mb-5 mt-20">
                  Login
                </h2>
                <form onSubmit={handleSubmit} class="w-full">
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="username" class="text-gray-500 mb-2">
                      E-mail
                    </label>
                    <input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      id="email"
                      placeholder="Please insert your email"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="password" class="text-gray-500 mb-2">
                      Password
                    </label>
                    <input
                      name="password"
                      onChange={handleChange}
                      type="password"
                      id="password"
                      placeholder="Please insert your password"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="button" class="flex flex-col w-full my-5">
                    <button
                      type="submit"
                      class="w-full py-4 bg-abu rounded-lg text-green-100"
                    >
                      <div class="flex flex-row items-center justify-center">
                        <div class="mr-2">
                          <svg
                            class="w-6 h-6"
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
                        <div class="font-bold">LogIn</div>
                      </div>
                    </button>
                    <div class="flex justify-evenly mt-5">
                      <span
                        href="#"
                        class="w-full text-center font-medium text-gray-500"
                      >
                        Don't have an account?{" "}
                        <Link to={"/register"}>Register</Link> here
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default LoginPage;