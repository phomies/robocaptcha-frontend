import Layout from '../components/layout/Layout';
import { HiPlusSm } from 'react-icons/hi';
import { useQuery, useLazyQuery } from '@apollo/client';
import { AppContext } from '../components/context/AppContext';
import { useState, useContext } from 'react';
import ListItem from '../components/lists/ListItem';
import ModalItem from '../components/lists/ModalItem';
import { GET_USER, SYNC_CONTACTS } from '../data/queries';
import Head from 'next/head';
import { useRouter } from 'next/router';

function Lists() {
  const { getFirebaseToken, getGoogleToken } = useContext(AppContext);
  const [isBLModalVisible, setIsBLModalVisible] = useState<boolean>(false);
  const [isWLModalVisible, setIsWLModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const { data } = useQuery(GET_USER, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  if (data) console.log('contactsData', data);

  const [syncContacts] = useLazyQuery(SYNC_CONTACTS, {
    context: {
      headers: {
        gapiToken: getGoogleToken(),
        fbToken: getFirebaseToken(),
      },
    },
  });

  return (
    <Layout>
      <Head>
        <title>roboCAPTCHA | Lists</title>
      </Head>

      <ModalItem
        isVisible={isBLModalVisible}
        setIsVisible={setIsBLModalVisible}
        isWhitelist={false}
      />
      <ModalItem
        isVisible={isWLModalVisible}
        setIsVisible={setIsWLModalVisible}
        isWhitelist={true}
      />

      <div className="w-full px-9 md:px-12 pt-6 pb-12">
        <button
          onClick={async () => {
            await syncContacts();
            router.reload();
          }}
          className="text-xs md:text-sm border border-blue-darkBlue text-blue-darkBlue bg-blue-lightBlue hover:bg-blue-100 dark:bg-blue-200 dark:hover:bg-blue-300 dark:text-gray-800 dark:border-0 w-32 md:w-40 rounded-lg py-2 mt-2 shadow-sm"
        >
          Sync contacts
        </button>
        <div className="flex flex-col md:flex-row gap-x-10">
          <div className="mt-7 pt-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full md:w-2/5 h-full">
            <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
              Blacklist
              <HiPlusSm
                className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200"
                onClick={() => setIsBLModalVisible(true)}
              />
            </div>
            <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
              <div className="col-span-3">Phone Number</div>
            </div>
            <div className="max-h-[450px] overflow-y-scroll scrollbar-hide">
            {data?.getUser.contacts.filter((item: any) => item.isBlacklisted)
              .length > 0 ? (
              data.getUser.contacts
                .filter((item: any) => item.isBlacklisted)
                .map((item: any) => (
                  <ListItem
                    key={item._id}
                    isWhitelist={false}
                    number={item.number as string}
                  />
                ))
            ) : (
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex px-7 items-center w-full h-14">
                No records found
              </div>
            )}
          </div>
          </div>
          <div className="mt-7 pt-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full md:w-3/5 h-full">
            <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold flex items-center justify-between">
              Whitelist
              <HiPlusSm
                className="cursor-pointer h-6 w-6 text-gray-400 hover:text-blue-600 dark:hover:text-blue-200"
                onClick={() => setIsWLModalVisible(true)}
              />
            </div>
            <div className="grid grid-cols-10 font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7">
              <div className="col-span-4">Phone Number</div>
              <div className="col-span-4">Contact Name</div>
            </div>
            <div className="max-h-[450px] overflow-y-scroll scrollbar-hide">
            {data?.getUser.contacts.filter((item: any) => item.isWhitelisted)
              .length > 0 ? (
              data.getUser.contacts
                .filter((item: any) => item.isWhitelisted)
                .map((item: any) => (
                  <ListItem
                    key={item._id}
                    isWhitelist={true}
                    number={item.number as string}
                    name={item.name}
                  />
                ))
            ) : (
              <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex px-7 items-center w-full h-14">
                No records found
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Lists;
