import Layout from "../components/layout/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AppContext } from "../components/context/AppContext";
import { useState, useContext, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { NextRouter, useRouter } from "next/router";

const GET_USER_BY_ID = gql`
  query getUser {
    getUser {
      _id
      name
      email
      phoneNumber
    }
  }
`;

const EDIT_USER_BY_ID = gql`
  mutation updateUser($userInput: UserInput) {
    updateUser(userInput: $userInput) {
      _id
    }
  }
`

function Profile() {
  const { getFirebaseToken } = useContext(AppContext);
  const router: NextRouter = useRouter();

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { error, data } = useQuery(GET_USER_BY_ID, {
    context: { 
      headers: {
        'fbToken': getFirebaseToken()
      }
    }
  })

  const [updateUser] = useMutation(EDIT_USER_BY_ID, {
    variables: {
      userInput: {
        _id: getFirebaseToken(),
        name: name,
        email: email,
        phoneNumber: phoneNumber
      }
    }
  })

  if (error) console.log("error");
  if (data) console.log(data);

  useEffect(() => {
    setName(data?.getUser.name);
    setEmail(data?.getUser.email);
    setPhoneNumber(data?.getUser.phoneNumber);
  }, [data])

  return (
    <Layout>
      <div className="flex items-center gap-x-8 w-full px-12 py-3 pb-12">
        <div className="items-center gap-x-8 w-full px-1 py-4">
          <div className="flex items-center mt-2 mb-12 gap-x-9 lg:gap-x-14">
            <FaUserCircle className="w-14 h-14 lg:w-24 lg:h-24 text-blue-600 dark:text-blue-200" />

            <div>
              <div className="flex font-poppins-semibold mb-2 text-lg md:text-xl">{data?.getUser.name}</div>
              <div className="flex font-poppins-regular text-sm md:text-base text-gray-500 dark:text-gray-400">Update your photo and personal details</div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full px-8 p-6">
            <div className="grid grid-cols-2 mb-5">
              <div className="text-base font-poppins-semibold">Profile Details</div>
              {
                !editProfile ?
                  <div className="items-center text-blue-600 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-300 cursor-pointer flex justify-self-end" onClick={() => setEditProfile(true)}>
                    <AiFillEdit className="h-4 w-4 md:h-5 md:w-5 mx-4" />
                    <div className="text-sm lg:text-base">Edit</div>
                  </div> :
                  <div className="items-center text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 cursor-pointer flex justify-self-end" onClick={() => {
                    setEditProfile(false);
                    setName(data?.getUser.name);
                    setEmail(data?.getUser.email);
                    setPhoneNumber(data?.getUser.phoneNumber);
                  }}>
                    <ImCross className="mx-4 h-3 w-3" />
                    <div className="text-sm lg:text-base">Discard</div>
                  </div>
              }
            </div>
            <hr className="mb-5 dark:opacity-30" />

            <div className={`flex w-full items-center gap-x-9 ${editProfile ? "sm:gap-x-16" : "sm:gap-x-20"}`}>
              <div className={`w-1/4 flex text-xs sm:text-sm flex-col font-poppins-semibold ${editProfile ? "gap-y-2" : "gap-y-1"}`}>
                <div className="text-right py-4">Name</div>
              </div>
              <div className={`w-3/4 flex flex-col text-xs sm:text-sm font-poppins-regular ${editProfile ? "py-2 justify-between gap-y-2" : "gap-y-1"}`}>
                <input readOnly={!editProfile} className={`bg-transparent focus:outline-none flex w-full lg:w-3/4 text-blue-darkBlue dark:text-blue-200 ${editProfile ? "h-10 border dark:border-gray-500 px-6 py-2 rounded-full" : "py-4"}`} value={name} onChange={e => setName(e.target.value)} />
              </div>
            </div>
            <div className={`flex w-full items-center gap-x-9 ${editProfile ? "sm:gap-x-16" : "sm:gap-x-20"}`}>
              <div className={`w-1/4 flex text-xs sm:text-sm flex-col font-poppins-semibold ${editProfile ? "gap-y-2" : "gap-y-1"}`}>
                <div className="text-right py-4">Email</div>
              </div>
              <div className={`w-3/4 flex flex-col text-xs sm:text-sm font-poppins-regular ${editProfile ? "py-2 justify-between gap-y-2" : "gap-y-1"}`}>
                <input readOnly={!editProfile} className={`bg-transparent focus:outline-none flex w-full lg:w-3/4 text-blue-darkBlue dark:text-blue-200 ${editProfile ? "h-10 border dark:border-gray-500 px-6 py-2 rounded-full" : "py-4"}`} value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className={`flex w-full items-center gap-x-9 ${editProfile ? "sm:gap-x-16" : "sm:gap-x-20"}`}>
              <div className={`w-1/4 flex text-xs sm:text-sm flex-col font-poppins-semibold ${editProfile ? "gap-y-2" : "gap-y-1"}`}>
                <div className="text-right py-4">Contact Number</div>
              </div>
              <div className={`w-3/4 flex flex-col text-xs sm:text-sm font-poppins-regular ${editProfile ? "py-2 justify-between gap-y-2" : "gap-y-1"}`}>
                <input readOnly={!editProfile} className={`bg-transparent focus:outline-none flex w-full lg:w-3/4 text-blue-darkBlue dark:text-blue-200 ${editProfile ? "h-10 border dark:border-gray-500 px-6 py-2 rounded-full" : "py-4"}`} value={editProfile ? phoneNumber : phoneNumber?.slice(0, 3) + " " + phoneNumber?.slice(3, 7) + " " + phoneNumber?.slice(7)} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
            </div>
          </div>
          {
            editProfile &&
            <button onClick={() => {
              updateUser();
              router.reload();
            }} className="my-9 h-14 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 dark:hover:bg-blue-300 text-white dark:text-gray-800 w-full shadow-xl">
              Save Edit
            </button>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Profile;