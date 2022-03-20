import Layout from "../components/layout/Layout";
import { Switch } from 'antd';
import { useState } from 'react';
import { MdNotificationsNone, MdArrowForwardIos, MdPayment, MdOutlineFeedback } from "react-icons/md";
import { RiLockPasswordLine, RiFontSize } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import { IoMdHelp } from "react-icons/io";

function Settings() {
  const [isNotifsOn, setIsNotifsOn] = useState<boolean>(true);
  return (
    <Layout>
      <div className="w-full px-12 pt-8 pb-12">
        <div className="flex flex-col gap-y-4">
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdNotificationsNone className="h-6 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Notifications: {isNotifsOn ? <span className="ml-10 font-poppins-medium text-blue-600 dark:text-blue-200">ON</span> : <span className="ml-10 font-poppins-medium text-gray-400">OFF</span>}</div>
            </div>
            <Switch checked={isNotifsOn} onChange={() => setIsNotifsOn(!isNotifsOn)} />
          </div>
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <RiLockPasswordLine className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Change Password</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdPayment className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Edit Payment Details</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <RiFontSize className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Adjust Font Size</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdOutlineFeedback className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Feedback</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <IoMdHelp className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Help</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex items-center text-red-400">
            <HiOutlineTrash className="h-6 w-6" />
            <div className="ml-7 font-poppins-semibold text-sm">Delete Account</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;