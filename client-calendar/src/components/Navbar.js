import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    Swal.fire("Logout Success");
  };

  return (
    <div className="Navbar">
      <nav className="bg-abu border-abu px-2 sm:px-4 py-2.5  dark:bg-abu">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div
            className="hidden h-12 w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 bg-abu rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-abu md:dark:bg-abu dark:border-abu">
              <li>
                <Link
                  to="/projects"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {!localStorage.getItem("access_token") ? (
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
              ) : null}
              {!localStorage.getItem("access_token") ? (
                <li>
                  <Link
                    to="/register"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              ) : null}
              {/* {localStorage.getItem("access_token") ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              ) : null} */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
