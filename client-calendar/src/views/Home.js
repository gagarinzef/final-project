import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import SideNav from "../components/SideNav";

export default function Home() {
  return (
    <div className="font-RobotoMono h-screen bg-biru">
      <div className="flex bg-biru flex-row h-full">
        <div className="bg-cyan-300 h-min-screen max-h-[32rem] w-1/6">
          <SideNav />
        </div>
        <div className="bg-red-300 h-full w-5/6">
          <Outlet />
        </div>

        {/*<main className="flex-1 bg-biru">
        <div className="bg-biru h-full w-full py-6 ml-64">*/}

        {/* </div>
        </main>*/}
      </div>
      {/* <FooterComponent /> */}
    </div>
  );
}
