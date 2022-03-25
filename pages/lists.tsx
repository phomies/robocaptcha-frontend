import Layout from "../components/layout/Layout";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineTrash, HiPlusSm } from "react-icons/hi";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AppContext } from "../components/context/AppContext";
import { useContext } from "react";

const GET_CONTACTS = gql`
  query getContacts {
    getUser {
      contacts {
        _id
        isBlacklisted
        isWhitelisted
        number
      }
    }
  }
`;

function Lists() {
  const { getFirebaseToken } = useContext(AppContext);

  const { error, data } = useQuery(GET_CONTACTS, {
    context: {
      headers: {
        'fbToken': getFirebaseToken()
      }
    }
  })

  if (data) console.log(data)

  return (
    <Layout>
      <div className="w-full px-12 pt-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
            Blacklist
            <HiPlusSm className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200" />
          </div>
          <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
            <div className="col-span-3">Phone Number</div>
          </div>
          {
            data?.getUser.contacts.filter((item: any) => item.isBlacklisted).length > 0 ?
              data.getUser.contacts.filter((item: any) => item.isBlacklisted).map((item: any) => {
                <div className="dark:bg-secondary_dark text-xs md:text-sm py-4 px-6 flex justify-between">
                  <div className="flex items-center gap-x-3">
                    <BiUserCircle className="h-6 w-6 text-gray-500" />
                    {item.number.slice(0, 3) + " " + item.number.slice(3, 7) + " " + item.number.slice(7)}
                  </div>
                  <div className="flex items-center">
                    <HiOutlineTrash className="cursor-pointer w-5 h-5 text-red-400 hover:text-red-500" />
                  </div>
                </div>
              }) :
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex justify-center items-center w-full h-14 md:h-20">
                No records found
              </div>
          }
        </div>
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
            Whitelist
            <HiPlusSm className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200" />
          </div>
          <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
            <div className="col-span-3">Phone Number</div>
          </div>
          {
            data?.getUser.contacts.filter((item: any) => item.isWhitelisted).length > 0 ?
              data.getUser.contacts.filter((item: any) => item.isWhitelisted).map((item: any) => {
                <div className="dark:bg-secondary_dark text-xs md:text-sm py-4 px-6 flex justify-between">
                  <div className="flex items-center gap-x-3">
                    <BiUserCircle className="h-6 w-6 text-gray-500" />
                    {item.number.slice(0, 3) + " " + item.number.slice(3, 7) + " " + item.number.slice(7)}
                  </div>
                  <div className="flex items-center">
                    <HiOutlineTrash className="cursor-pointer w-5 h-5 text-red-400 hover:text-red-500" />
                  </div>
                </div>
              }) :
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex justify-center items-center w-full h-14 md:h-20">
                No records found
              </div>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Lists;