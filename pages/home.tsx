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
import CallHistoryGraph from '../components/home/CallHistoryGraph';

const GET_CALLS_BY_TOKEN = gql`
  query getUser {
    getUser {
      calls {
        _id
        action
        dateTime
        from
        location
      }
    }
  }
`;

const GET_CALL_SUMMARY = gql`
  query CallsReceived {
    getCallSummary {
      newCalls
      totalBlockedCalls
      weeklyBlockedCalls
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

  const { error: callsError, data: callsData } = useQuery(GET_CALLS_BY_TOKEN, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  if (callsError) {
    resetProvider();
  }

  // if (callsData) console.log(callsData);

  const { data: callSummaryData } = useQuery(GET_CALL_SUMMARY, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  // if (callSummaryData) console.log(callSummaryData);

  return (
    <Layout>
      <div className="w-full px-12 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-5 md:gap-6">
          <HomeItem
            title="Weekly Blocked Calls"
            stats={callSummaryData?.getCallSummary.weeklyBlockedCalls}
            icon={
              <RiCalendarCheckLine className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
          <HomeItem
            title="Total Blocked Calls"
            stats={callSummaryData?.getCallSummary.totalBlockedCalls}
            icon={
              <FaRegClock className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
          <HomeItem
            title="New Calls (Weekly)"
            stats={callSummaryData?.getCallSummary.newCalls}
            increase={10}
            icon={
              <FiPhoneCall className="text-blue-600 dark:text-blue-200 h-7 w-7" />
            }
          />
          <HomeItem
            title="Subscription Renewal"
            stats="-"
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
          {callsData?.getUser.calls.length > 0 ? (
            callsData.getUser.calls.map((item: any) => (
              <CallHistoryItem
                key={item._id}
                phoneNumber={item.from}
                contactName="-"
                location={item.location}
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
