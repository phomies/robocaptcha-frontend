import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutItem from "./LayoutItem";
import { MdNotificationsNone, MdPayment, MdOutlineFeedback } from "react-icons/md";
import { FiHome, FiSettings } from "react-icons/fi";
import { CgUserList } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  useEffect(() => {
    if (router.pathname.includes("home")) {
      setTitle("Home");
    } else if (router.pathname.includes("profile")) {
      setTitle("Profile");
    } else if (router.pathname.includes("subscription")) {
      setTitle("Subscription");
    } else if (router.pathname.includes("settings")) {
      setTitle("Settings");
    } else if (router.pathname.includes("feedback")) {
      setTitle("Feedback");
    } else if (router.pathname.includes("help")) {
      setTitle("Help");
    }
  }, [router.pathname]);

  return (
    <div className="font-poppins-medium text-gray-700">
      <div className={`xl:hidden z-50 py-10 absolute w-screen h-screen bg-white ${!visibleDrawer && "hidden"}`}>
        <div className="flex items-center px-12 mb-7 gap-x-8">
          <ImCross className="xl:hidden h-4 w-4" onClick={() => setVisibleDrawer(false)} />
          <h1 className="font-poppins-semibold text-secondary text-xl">Menu</h1>
        </div>
        <LayoutItem title="Home" icon={<FiHome className="h-5 w-5" />} />
        <LayoutItem title="Profile" icon={<CgUserList className="h-6 w-6" />} />
        <LayoutItem title="Subscription" icon={<MdPayment className="h-5 w-5" />} />
        <LayoutItem title="Settings" icon={<FiSettings className="h-5 w-5" />} />
        <LayoutItem title="Feedback" icon={<MdOutlineFeedback className="h-5 w-5" />} />
        <LayoutItem title="Help" icon={<IoMdHelp className="h-5 w-5" />} />
        <hr className="mb-2" />
        <button onClick={() => router.push("/login")} className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 hover:text-blue-600 hover:font-poppins-semibold">
          <BiLogOut className="h-5 w-5" />
          <div className="text-sm">Logout</div>
        </button>
      </div>
      <div className="flex h-screen w-screen">
        <div className="hidden xl:flex z-50 h-screen fixed w-72 bg-white shadow-xl justify-center">
          <div className="flex-col">
            <button
              className="flex my-8 self-start"
              onClick={() => router.push("/home")}>
              <img src="/logo.png" alt="Logo" className="px-9" />
            </button>
            <LayoutItem title="Home" icon={<FiHome className="h-5 w-5" />} />
            <LayoutItem title="Profile" icon={<CgUserList className="h-6 w-6" />} />
            <LayoutItem title="Subscription" icon={<MdPayment className="h-5 w-5" />} />
            <LayoutItem title="Settings" icon={<FiSettings className="h-5 w-5" />} />
            <LayoutItem title="Feedback" icon={<MdOutlineFeedback className="h-5 w-5" />} />
            <LayoutItem title="Help" icon={<IoMdHelp className="h-5 w-5" />} />
            <hr className="mb-2" />
            <button onClick={() => router.push("/login")} className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 hover:text-blue-600 hover:font-poppins-semibold">
              <BiLogOut className="h-5 w-5" />
              <div className="text-sm">Logout</div>
            </button>
          </div>
        </div>
        <div className={`xl:ml-72 bg-background w-full ${visibleDrawer && "hidden xl:block"}`}>
          <div className="bg-background z-40 sticky top-0 px-12 pt-9 pb-5 justify-between flex items-center">
            <div className="flex items-center gap-x-8">
              <TiThMenu className="xl:hidden h-5 w-5" onClick={() => setVisibleDrawer(true)} />
              <h1 className="font-poppins-semibold text-secondary text-xl xl:text-2xl">{title}</h1>
            </div>
            <div className="flex items-center gap-x-7 xl:gap-x-9 xl:-mt-1 xl:mb-1">
              <MdNotificationsNone className="w-6 h-6 xl:h-8 xl:w-8 text-gray-700 hover:text-blue-600 cursor-pointer" />
              <button className="w-8 h-8 xl:w-10 xl:h-10 bg-blue-600 rounded-full" onClick={() => router.push("/profile")} />
            </div>
          </div>
          <div className="-mt-5 bg-background2 overflow-y-scroll">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
