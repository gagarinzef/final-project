import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-abu">
      <div class=" flex flex-wrap justify-end mx-auto">
        <div class="flex items-center md:order-2 text-white">
          <div class="grid-col">
            <p>User Name</p>
            <Link to={"/home"}>my Profile</Link>
          </div>
          <span class="sr-only">Open user menu</span>
          <img
            class="w-12 h-12 rounded-full ml-2"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="user photo"
          />
        </div>
      </div>
    </nav>
  );
}
