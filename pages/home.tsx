import Layout from "../components/layout/Layout";
import HomeItem from "../components/home/HomeItem";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";

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
      </div>
    </Layout>
  );
}

export default Home;