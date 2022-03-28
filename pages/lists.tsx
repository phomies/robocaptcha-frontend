import Layout from "../components/layout/Layout";
import { HiPlusSm } from "react-icons/hi";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AppContext } from "../components/context/AppContext";
import { useContext } from "react";
import ListItem from "../components/lists/ListItem";

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
      <div className="w-full px-12 pt-6 pb-12 flex flex-col md:flex-row gap-x-10">
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full h-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
            Blacklist
            <HiPlusSm className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200" />
          </div>
          <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
            <div className="col-span-3">Phone Number</div>
          </div>
          {
            data?.getUser.contacts.filter((item: any) => item.isBlacklisted).length > 0 ?
              data.getUser.contacts.filter((item: any) => item.isBlacklisted).map((item: any) =>
                <ListItem key={item._id} isWhitelist={false} number={item.number as string} />
              ) :
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex justify-center items-center w-full h-14 md:h-20">
                No records found
              </div>
          }
        </div>
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full h-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
            Whitelist
            <HiPlusSm className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200" />
          </div>
          <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
            <div className="col-span-3">Phone Number</div>
          </div>
          {
            data?.getUser.contacts.filter((item: any) => item.isWhitelisted).length > 0 ?
              data.getUser.contacts.filter((item: any) => item.isWhitelisted).map((item: any) =>
                <ListItem key={item._id} isWhitelist={true} number={item.number as string} />
              ) :
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex justify-center items-center w-full h-14">
                No records found
              </div>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Lists;