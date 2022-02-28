import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutItem from "./LayoutItem";
import { MdNotificationsNone, MdPayment, MdOutlineFeedback } from "react-icons/md";
import { FiHome, FiSettings } from "react-icons/fi";
import { CgUserList } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

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
    <div className="font-poppins-medium text-gray-700 flex h-screen w-screen">
      <div className="z-50 h-screen fixed flex w-72 bg-white shadow-xl justify-center">
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
          <button className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 hover:text-blue-600 hover:font-poppins-semibold">
            <BiLogOut className="h-5 w-5" />
            <div className="text-sm">Logout</div>
          </button>
        </div>
      </div>
      <div className="ml-72 bg-background1 w-full">
        <div className="z-40 sticky top-0 px-12 pt-9 justify-between flex items-center">
          <h1 className="font-poppins-semibold text-secondary text-2xl">{title}</h1>
          <div className="flex items-center gap-x-9">
            <MdNotificationsNone className="h-8 w-8 text-gray-700 hover:text-blue-600 cursor-pointer" />
            <div className="w-10 h-10 bg-blue-600 rounded-full" />
          </div>
        </div>
        <div className="bg-background2 overflow-y-scroll">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
