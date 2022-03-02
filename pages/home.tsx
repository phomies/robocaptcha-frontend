import Layout from "../components/layout/Layout";
import HomeItem from "../components/home/HomeItem";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";
import CallHistoryItem from "../components/home/CallHistoryItem";
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

const GET_CALLS_TO_USER_ID = gql`
  query getCalls($getCallsToUserId: ID) {
    getCallsToUser(id: $getCallsToUserId) {
      dateTime
      from
      action
      _id
    }
  }
`;

const getAction = (action: string) => {
  if (action === "success") return 0;
  if (action === "in-progress") return 1;
  return 2;
}

function Home() {
  const { getUserId } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_CALLS_TO_USER_ID, {
    variables: { getCallsToUserId: getUserId() }
  })

  if (loading) return null;
  if (error) console.log("error");
  if (data) console.log(data);

  return (
    <Layout>
      <div className="bg-background w-full px-12 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-5 md:gap-6">
          <HomeItem title="Weekly Blocked Calls" stats="-" icon={<RiCalendarCheckLine className="text-blue-600 h-7 w-7" />} />
          <HomeItem title="Total Blocked Calls" stats={data?.getCallsToUser.length} icon={<FaRegClock className="text-blue-600 h-7 w-7" />} />
          <HomeItem title="New Callers (Weekly)" stats="-" increase={10} icon={<FiPhoneCall className="text-blue-600 h-7 w-7" />} />
          <HomeItem title="Subscription Renewal" stats="12 Dec 2022" icon={<MdOutlineSubscriptions className="text-blue-600 h-7 w-7" />} />
        </div>
        <div className="mt-7 bg-white shadow-lg rounded-lg w-full">
          <h2 className="py-4 px-6 text-sm md:text-base font-poppins-semibold">Call History</h2>
          <div className="font-poppins-semibold bg-gray-50 text-xs md:text-sm py-4 px-6 grid grid-cols-5 md:grid-cols-9 lg:grid-cols-11">
            <h3 className="col-span-2">Phone Number</h3>
            <h3 className="hidden lg:block lg:col-span-2">Contact Name</h3>
            <h3 className="hidden md:block md:col-span-2">Location</h3>
            <h3 className="col-span-2">Date</h3>
            <h3 className="hidden md:block md:col-span-2">Time</h3>
          </div>
          {
            data?.getCallsToUser.map((item: any) => <CallHistoryItem key={item._id} phoneNumber={item.from.includes("Anonymous") ? "Anonymous" : item.from} contactName="-" location={item.from.includes("+65") ? "Singapore" : "Overseas"} date={new Date(item.dateTime).toDateString()} time={new Date(item.dateTime).toLocaleTimeString()} action={getAction(item.action)} />)
          }
        </div>
      </div>
    </Layout>
  );
}

export default Home;