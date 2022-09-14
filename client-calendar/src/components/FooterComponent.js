export default function FooterComponent() {
  return (
    <div className="z-50">
      <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-abu w-full bottom-0">
        <span className="text-sm text-white sm:text-center">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Wok-it-Out
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
          <li>
            <div className="mr-4 hover:underline md:mr-6 ">About</div>
          </li>
          <li>
            <div className="hover:underline">Contact</div>
          </li>
        </ul>
      </footer>
    </div>
  );
}
