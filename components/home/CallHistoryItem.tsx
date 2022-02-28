import { BiCheckShield, BiShieldX, BiUserCircle } from "react-icons/bi";
import { VscCallOutgoing } from "react-icons/vsc";

interface Props {
  phoneNumber: string
  contactName?: string
  location: string
  date: string
  time: string
  blocked: boolean
}

function CallHistoryItem(props: Props) {
  const { phoneNumber, contactName, location, date, time, blocked } = props;
  return (
    <div className="text-sm py-4 px-6 grid grid-cols-11">
      <h3 className="col-span-2 flex items-center gap-x-3">
        <BiUserCircle className="h-6 w-6 text-gray-500" />
        {phoneNumber}
      </h3>
      <h3 className="col-span-2">{contactName || "-"}</h3>
      <h3 className="col-span-2">{location}</h3>
      <h3 className="col-span-2">{date}</h3>
      <h3 className="col-span-2">{time}</h3>
      <h3 className="flex items-center gap-x-8">
        {
          blocked ? <BiCheckShield className="w-6 h-6 text-green-400" /> : <BiShieldX className="w-6 h-6 text-red-400" />
        }
        <VscCallOutgoing className="cursor-pointer w-5 h-5 text-gray-400 hover:text-gray-700" />
      </h3>
    </div>
  );
}

export default CallHistoryItem;