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
      <div className="w-full px-12 pt-6 pb-12">
        <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg mb-12 w-full mt-2 flex flex-col">
          <div className="cursor-pointer hover:bg-gray-50 px-10 pt-7 pb-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdNotificationsNone className="h-6 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Notifications: {isNotifsOn ? <span className="ml-8 font-poppins-medium text-blue-600">On</span> : <span className="ml-8 font-poppins-medium text-gray-400">Off</span>}</div>
            </div>
            <Switch checked={isNotifsOn} onChange={() => setIsNotifsOn(!isNotifsOn)} />
          </div>
          <hr className="mx-10" />
          <div className="cursor-pointer hover:bg-gray-50 px-10 py-6 flex justify-between items-center">
            <div className="flex items-center">
              <RiLockPasswordLine className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Change Password</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <hr className="mx-10" />
          <div className="cursor-pointer hover:bg-gray-50 px-10 py-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdPayment className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Edit Payment Details</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <hr className="mx-10" />
          <div className="cursor-pointer hover:bg-gray-50 px-10 py-6 flex justify-between items-center">
            <div className="flex items-center">
              <RiFontSize className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Adjust Font Size</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <hr className="mx-10" />
          <div className="cursor-pointer hover:bg-gray-50 px-10 py-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdOutlineFeedback className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Feedback</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <hr className="mx-10" />
          <div className="cursor-pointer hover:bg-gray-50 px-10 py-6 flex justify-between items-center">
            <div className="flex items-center">
              <IoMdHelp className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Help</div>
            </div>
            <MdArrowForwardIos className="text-gray-400 h-5 w-5" />
          </div>
          <hr className="mx-10" />
          <div className="cursor-pointer hover:bg-gray-50 px-10 pt-6 pb-7 flex items-center text-red-400">
            <HiOutlineTrash className="h-6 w-6" />
            <div className="ml-7 font-poppins-semibold text-sm">Delete Account</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;