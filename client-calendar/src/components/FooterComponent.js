export default function FooterComponent() {
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-gray-200" />
        <div
          className="flex flex-wrap items-center md:justify-between justify-center"
        >
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright © <span id="javascript-date"></span>
              <a
                href='https://www.hacktiv8.com/react-and-react-native-basic'
                className="text-gray-500 hover:text-gray-700 text-sm font-semibold py-1"
              >
                Wokitout.com
              </a>
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center">
              <li>
                <div
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                >
                  Hacktiv8
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
