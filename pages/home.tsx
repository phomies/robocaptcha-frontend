import Layout from '../components/layout/Layout';
import HomeItem from '../components/home/HomeItem';
import { RiCalendarCheckLine } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineSubscriptions } from 'react-icons/md';
import CallHistoryItem from '../components/home/CallHistoryItem';
import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AppContext } from '../components/context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import CallHistoryGraph from '../components/home/CallHistoryGraph';

const GET_CALLS_BY_ID = gql`
  query getUser {
    getUser {
      calls {
        _id
        action
        dateTime
        from
      }
    }
  }
`;

const getAction = (action: string) => {
  if (action === 'success') return 0;
  if (action === 'in-progress') return 1;
  return 2;
};

function Home() {
  const { getFirebaseToken, resetProvider } = useContext(AppContext);
  const router: NextRouter = useRouter();

  const { error, data } = useQuery(GET_CALLS_BY_ID, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  if (error) {
    // console.log(error);
    // router.push('/login');
    resetProvider();
  }

  if (data) console.log(data);

  return (
    <Layout>
      <div className="w-full px-12 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-5 md:gap-6">
          <HomeItem
            title="Weekly Blocked Calls"
            stats="-"
            icon={
              <RiCalendarCheckLine className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
          <HomeItem
            title="Total Blocked Calls"
            stats={data?.getUser.calls.length}
            icon={
              <FaRegClock className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
          <HomeItem
            title="New Callers (Weekly)"
            stats="-"
            increase={10}
            icon={
              <FiPhoneCall className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
          <HomeItem
            title="Subscription Renewal"
            stats="12 Dec 2022"
            icon={
              <MdOutlineSubscriptions className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
        </div>
        <CallHistoryGraph />
        <div className="mt-7 py-1 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full">
          <div className="py-4 px-7 text-sm md:text-base font-poppins-semibold">
            Call History
          </div>
          <div className="font-poppins-semibold bg-gray-50 dark:bg-tertiary_dark text-xs md:text-sm py-4 px-7 grid grid-cols-5 md:grid-cols-9 lg:grid-cols-11">
            <div className="col-span-2">Phone Number</div>
            <div className="hidden lg:block lg:col-span-2">Contact Name</div>
            <div className="hidden md:block md:col-span-2">Location</div>
            <div className="col-span-2">Date</div>
            <div className="hidden md:block md:col-span-2">Time</div>
          </div>
          {data?.getUser.calls.length > 0 ? (
            data.getUser.calls.map((item: any) => (
              <CallHistoryItem
                key={item._id}
                phoneNumber={item.from}
                contactName="-"
                location={item.from.includes('+65') ? 'Singapore' : 'Overseas'}
                date={new Date(item.dateTime).toDateString()}
                time={new Date(item.dateTime).toLocaleTimeString()}
                action={getAction(item.action)}
              />
            ))
          ) : (
            <div className="font-poppins-regular text-gray-400 text-xs md:text-sm flex justify-center items-center w-full h-14 md:h-20">
              No records found
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
