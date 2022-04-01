import Layout from "../components/layout/Layout";
import { Modal, Rate, message } from 'antd';
import { Switch } from '@headlessui/react';
import { MdNotificationsNone, MdArrowForwardIos, MdPayment, MdOutlineFeedback } from "react-icons/md";
import { RiLockPasswordLine, RiFontSize } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import { IoMdHelp } from "react-icons/io";
import { BiPhoneCall } from "react-icons/bi";
import { useMutation } from "@apollo/client";
import { AppContext } from "../components/context/AppContext";
import { useState, useContext } from "react";
import { DELETE_USER } from "../data/mutations";
import Head from "next/head";

function Settings() {
  const [isNotifsOn, setIsNotifsOn] = useState<boolean>(true);
  const [feedbackModal, setFeedbackModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [delAccModal, setDelAccModal] = useState<boolean>(false);
  const { getFirebaseToken, resetProvider } = useContext(AppContext);

  const [deleteUser] = useMutation(DELETE_USER, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    },
  })

  return (
    <Layout>
      <Head>
        <title>roboCAPTCHA | Settings</title>
      </Head>

      <Modal
        title="Submit Feedback"
        visible={feedbackModal}
        closable={false}
        centered={true}
        footer={null}
      >
        <div className="font-poppins-regular text-sm mb-2">
          Please rate our application and help provide user feedback!
          <Rate className="mt-4" />
        </div>
        <input
          className="mt-5 text-blue-darkBlue focus:outline-none px-5 w-full h-14 rounded-lg bg-blue-lightBlue mb-1"
          placeholder="Comments (Optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          className="py-2 px-7 rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 text-white font-poppins-medium"
          onClick={() => {
            setFeedbackModal(false);
            message.success("Feedback submitted");
          }}>
          SUBMIT
        </button>
        <button
          className="mt-6 py-2 px-7 text-gray-500 hover:text-gray-600 font-poppins-regular hover:font-poppins-medium"
          onClick={() => setFeedbackModal(false)}
        >
          CANCEL
        </button>
      </Modal>
      <Modal
        title="Confirm?"
        visible={delAccModal}
        closable={false}
        centered={true}
        footer={null}
      >
        <div className="font-poppins-regular text-sm mb-2">
          Confirm account deletion? This action cannot be undone.
        </div>
        <button
          className="mt-6 py-2 px-7 rounded-lg shadow-lg bg-red-500 hover:bg-red-600 text-white font-poppins-medium"
          onClick={async () => {
            await deleteUser();
            await resetProvider();
          }}>
          DELETE
        </button>
        <button
          className="mt-6 py-2 px-7 text-gray-500 hover:text-gray-600 font-poppins-regular hover:font-poppins-medium"
          onClick={() => setDelAccModal(false)}
        >
          CANCEL
        </button>
      </Modal>
      <div className="w-full px-9 md:px-12 pt-8 pb-12">
        <div className="flex flex-col gap-y-4">
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full px-10 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <MdNotificationsNone className="h-6 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Notifications: {isNotifsOn ? <span className="ml-10 font-poppins-medium text-blue-600 dark:text-blue-200">ON</span> : <span className="ml-10 font-poppins-medium text-gray-400">OFF</span>}</div>
            </div>
            <Switch
              checked={isNotifsOn}
              onChange={() => setIsNotifsOn(!isNotifsOn)}
              className={`${isNotifsOn ? 'bg-blue-600 dark:bg-blue-200' : 'bg-gray-400'}
          relative inline-flex flex-shrink-0 h-4 w-9 md:h-5 md:w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${isNotifsOn ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-3 w-3 md:h-4 md:w-4 rounded-full bg-white dark:bg-secondary_dark shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
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
              <BiPhoneCall className="h-5 w-6" />
              <div className="ml-7 font-poppins-semibold text-sm">Adjust Verification Level</div>
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
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex justify-between items-center"
            onClick={() => setFeedbackModal(true)}
          >
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
          <div className="bg-white dark:bg-secondary_dark rounded-lg shadow-md w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-tertiary_dark px-10 p-6 flex items-center text-red-500 dark:text-red-400"
            onClick={() => setDelAccModal(true)}
          >
            <HiOutlineTrash className="h-6 w-6" />
            <div className="ml-7 font-poppins-semibold text-sm">Delete Account</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;