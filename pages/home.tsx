import Layout from "../components/layout/Layout";
import HomeItem from "../components/home/HomeItem";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";
import CallHistoryItem from "../components/home/CallHistoryItem";

function Home() {
  return (
    <Layout>
      <div className="w-full px-12 py-6">
        <div className="flex w-full gap-x-6">
          <HomeItem title="Weekly Blocked Calls" stats="213" icon={<RiCalendarCheckLine className="text-blue-600 h-7 w-7" />} />
          <HomeItem title="Total Blocked Calls" stats="4,000" icon={<FaRegClock className="text-blue-600 h-7 w-7" />} />
          <HomeItem title="New Callers (Weekly)" stats="240" increase={10} icon={<FiPhoneCall className="text-blue-600 h-7 w-7" />} />
          <HomeItem title="Subscription Renewal" stats="12 Dec 2022" icon={<MdOutlineSubscriptions className="text-blue-600 h-7 w-7" />} />
        </div>
        <div className="mt-7 bg-white shadow-lg rounded-lg w-full">
          <h2 className="py-4 px-6">Call History</h2>
          <div className="bg-gray-50 text-sm py-4 px-6 grid grid-cols-11">
            <h3 className="col-span-2">Phone Number</h3>
            <h3 className="col-span-2">Contact Name</h3>
            <h3 className="col-span-2">Location</h3>
            <h3 className="col-span-2">Date</h3>
            <h3 className="col-span-2">Time</h3>
          </div>
          <CallHistoryItem phoneNumber="+65 8123 4567" contactName="John Doe" location="Singapore" date="10/10/2020" time="09:15-09:45am" blocked={true} />
          <CallHistoryItem phoneNumber="+65 8123 4567" contactName="John Doe" location="Singapore" date="10/10/2020" time="09:15-09:45am" blocked={true} />
          <CallHistoryItem phoneNumber="+65 8123 4568" location="Singapore" date="10/10/2020" time="09:15-09:45am" blocked={false} />
          <CallHistoryItem phoneNumber="+65 8123 4568" location="Singapore" date="10/10/2020" time="09:15-09:45am" blocked={false} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;