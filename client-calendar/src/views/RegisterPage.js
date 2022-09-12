import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function RegisterPage() {
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
      const { username, email, password } = input;
      const { data } = await axios(`http://localhost:3001/users`, {
        method: "post",
        data: { username, email, password },
      });
      navigate(`/verify/${data.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="flex justify-between justify bg-slate-700">
      <div class="w-96 bg-biru">
        <img
          class="ml-20 mt-40 scale-125"
          src="https://i.imgur.com/j5gSXf9.png"
        />
      </div>
      {/* card-start */}
      <form className="flex w-1/2 mr-1" onSubmit={handleSubmit}>
        <div class="flex mb-4 h-screen lg:w-5/12 mt-80 mr-40">
          <div>
            <label class="block text-white text-sm font-bold mb-2" for="email">
              E-mail
            </label>
            <input
              onChange={handleChange}
              class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              name="email"
              type="email"
              placeholder="Your e-mail"
            />
            <label
              class="block text-white text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              onChange={handleChange}
              class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              name="username"
              type="username"
              placeholder="Your username"
            />

            <label
              class="block text-white text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              name="password"
              type="password"
              placeholder="Your password"
            />
            <button
              type="submit"
              className="mt-6 p-2 rounded bg-cyan-500 hover:bg-cyan-700"
            >
              Submit
            </button>
            <p className="mt-6">
              Already have an account? <Link to={"/"}>Login</Link> here
            </p>
          </div>
        </div>
      </form>
      {/* card-end */}
    </div>
  );
}

export default RegisterPage;
