import Layout from "../components/layout/Layout";
import { HiPlusSm } from "react-icons/hi";
import { useQuery } from "@apollo/client";
import { AppContext } from "../components/context/AppContext";
import { useState, useContext } from "react";
import ListItem from "../components/lists/ListItem";
import ModalItem from "../components/lists/ModalItem";
import { GET_CONTACTS } from "../data/queries";

function Lists() {
  const { getFirebaseToken } = useContext(AppContext);
  const [isBLModalVisible, setIsBLModalVisible] = useState<boolean>(false);
  const [isWLModalVisible, setIsWLModalVisible] = useState<boolean>(false);

  const { error, data } = useQuery(GET_CONTACTS, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    }
  })

  if (data) console.log(data)

  return (
    <Layout>
      <ModalItem isVisible={isBLModalVisible} setIsVisible={setIsBLModalVisible} isWhitelist={false} />
      <ModalItem isVisible={isWLModalVisible} setIsVisible={setIsWLModalVisible} isWhitelist={true} />

      <div className="w-full px-12 pt-6 pb-12 flex flex-col md:flex-row gap-x-10">
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full h-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
            Blacklist
            <HiPlusSm className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200"
              onClick={() => setIsBLModalVisible(true)} />
          </div>
          <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
            <div className="col-span-3">Phone Number</div>
          </div>
          {
            data?.getUser.contacts.filter((item: any) => item.isBlacklisted).length > 0 ?
              data.getUser.contacts.filter((item: any) => item.isBlacklisted).map((item: any) =>
                <ListItem key={item._id} isWhitelist={false} number={item.number as string} />
              ) :
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex justify-center items-center w-full h-14">
                No records found
              </div>
          }
        </div>
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full h-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
            Whitelist
            <HiPlusSm className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200"
              onClick={() => setIsWLModalVisible(true)} />
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