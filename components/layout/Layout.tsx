import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NextRouter, useRouter } from "next/router";
import LayoutItem from "./LayoutItem";
import { FaUserCircle } from "react-icons/fa";
import { MdNotificationsNone, MdPayment, MdOutlineListAlt } from "react-icons/md";
import { FiHome, FiSettings } from "react-icons/fi";
import { CgUserList } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import DayNightToggle from 'react-day-and-night-toggle'
import { Drawer } from 'antd';
import useDeviceSize from "../../utils/useDeviceSize";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { getTheme, saveTheme, signOut } = useContext(AppContext);
  const [title, setTitle] = useState<string>("");
  const router: NextRouter = useRouter();
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [width] = useDeviceSize();

  useEffect(() => {
    if (router.pathname.includes("home")) {
      setTitle("Home");
    } else if (router.pathname.includes("notifications")) {
      setTitle("Notifications");
    } else if (router.pathname.includes("profile")) {
      setTitle("Profile");
    } else if (router.pathname.includes("lists")) {
      setTitle("Call Lists");
    } else if (router.pathname.includes("subscription")) {
      setTitle("Subscription");
    } else if (router.pathname.includes("settings")) {
      setTitle("Settings");
    }
  }, [router.pathname]);

  const logout = async () => {
    await signOut();
  }

  return (
    <div className={`font-poppins-medium text-gray-700 dark:text-gray-50 ${getTheme() === 'dark' && 'dark'}`}>

      <Drawer className={`${getTheme() === 'dark' && 'dark'}`} placement="left" visible={width < 1280 && visibleDrawer} width="100%" closable={false}>
        <div className="dark:bg-secondary_dark h-screen">
          <div className="dark:text-gray-50 pt-9 flex items-center px-12 mb-7 gap-x-8">
            <ImCross className="h-4 w-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-200" onClick={() => setVisibleDrawer(false)} />
            <div className="font-poppins-semibold text-secondary text-xl">Menu</div>
          </div>
          <LayoutItem title="Home" icon={<FiHome className="h-5 w-5" />} />
          <LayoutItem title="Notifications" icon={<MdNotificationsNone className="h-6 w-6" />} />
          <LayoutItem title="Profile" icon={<CgUserList className="h-6 w-6" />} />
          <LayoutItem title="Lists" icon={<MdOutlineListAlt className="h-6 w-6" />} />
          <LayoutItem title="Subscription" icon={<MdPayment className="h-5 w-5" />} />
          <LayoutItem title="Settings" icon={<FiSettings className="h-5 w-5" />} />
          <hr className="mb-2 dark:opacity-30" />
          <button onClick={async () => await logout()} className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 hover:text-blue-600 dark:text-gray-50 dark:hover:text-blue-200 hover:font-poppins-semibold">
            <BiLogOut className="h-5 w-5" />
            <div className="text-sm">Logout</div>
          </button>
        </div>
      </Drawer>

      <div className="flex h-screen w-screen">
        <div className="hidden xl:flex z-50 h-screen fixed w-72 bg-white dark:bg-secondary_dark dark:text-gray-50 shadow-xl justify-center">
          <div className="flex-col w-full">
            <button
              className="flex my-8 self-start gap-x-4 items-center px-11"
              onClick={() => router.push("/home")}>
              <img src={`/images/logo_${getTheme()}.png`} alt="Logo" className="h-8 w-8" />
              <div className="font-poppins-semibold text-xl text-gray-700 dark:text-gray-50">robo<span className="text-blue-600 dark:text-blue-200">CAPTCHA</span></div>
            </button>
            <LayoutItem title="Home" icon={<FiHome className="h-5 w-5" />} />
            <LayoutItem title="Notifications" icon={<MdNotificationsNone className="h-6 w-6" />} />
            <LayoutItem title="Profile" icon={<CgUserList className="h-6 w-6" />} />
            <LayoutItem title="Lists" icon={<MdOutlineListAlt className="h-6 w-6" />} />
            <LayoutItem title="Subscription" icon={<MdPayment className="h-5 w-5" />} />
            <LayoutItem title="Settings" icon={<FiSettings className="h-5 w-5" />} />
            <hr className="mb-2 dark:opacity-30" />
            <button onClick={async () => await logout()} className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 dark:text-gray-50 dark:hover:text-blue-200 hover:text-blue-600 hover:font-poppins-semibold">
              <BiLogOut className="h-5 w-5" />
              <div className="text-sm">Logout</div>
            </button>
          </div>
        </div>
        <div className={`xl:ml-72 bg-primary_light dark:bg-primary_dark dark:text-gray-50 w-full ${visibleDrawer && "hidden xl:block"}`}>
          <div className="z-40 bg-primary_light dark:bg-primary_dark sticky top-0 px-12 pt-9 pb-5 justify-between flex items-center">
            <div className="flex items-center gap-x-8">
              <TiThMenu className="xl:hidden h-5 w-5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-200" onClick={() => setVisibleDrawer(true)} />
              <div className="font-poppins-semibold text-secondary text-lg xl:text-2xl pr-4">{title}</div>
            </div>
            <div className="flex items-center gap-x-5 xl:gap-x-9 xl:-mt-1 xl:mb-1">
              <DayNightToggle size={18} checked={getTheme() === "dark"} onChange={() => saveTheme(getTheme() === "dark" ? "light" : "dark")} />
              <MdNotificationsNone className="w-6 h-6 xl:h-8 xl:w-8 text-gray-600 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-200 cursor-pointer" />
              <FaUserCircle className="w-7 h-7 xl:w-8 xl:h-8 text-blue-600 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-300 cursor-pointer" onClick={() => router.push("/profile")} />
            </div>
          </div>
          <div className="bg-primary_light dark:bg-primary_dark -mt-5 overflow-y-scroll">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;