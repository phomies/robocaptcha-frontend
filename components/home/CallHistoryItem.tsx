import { BiCheckShield, BiShield, BiShieldX, BiUserCircle } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { Tooltip, message } from 'antd';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { UPSERT_CONTACT } from "../../data/mutations";
import { formatPhoneNumberIntl, parsePhoneNumber } from 'react-phone-number-input';

const { getName } = require('country-list');

interface Props {
  phoneNumber: string
  date: string
  time: string
  action: number
}

function CallHistoryItem(props: Props) {
  const { phoneNumber, date, time, action } = props;
  const { getFirebaseToken } = useContext(AppContext);

  const [blacklistContact] = useMutation(UPSERT_CONTACT, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    }
  })

  const getCountry = (number: string) => {
    if (parsePhoneNumber(number)?.country) {
      if (getName(parsePhoneNumber(number)?.country) === "United States of America") {
        return "America";
      } else {
        return getName(parsePhoneNumber(number)?.country);
      }
    } else {
      return "Unknown";
    }
  }

  return (
    <div className="items-center dark:bg-secondary_dark text-xs md:text-sm py-4 px-6 grid grid-cols-5 md:grid-cols-9">
      <div className="col-span-2 flex items-center gap-x-2">
        <BiUserCircle className="hidden lg:block h-6 w-6 text-gray-500" />
        {phoneNumber.includes("Anonymous") ? "Anonymous" : formatPhoneNumberIntl(phoneNumber)}
      </div>
      <div className="hidden md:block md:col-span-2">{getCountry(phoneNumber)}</div>
      <div className="col-span-2 self-center">{date}</div>
      <div className="hidden md:block md:col-span-2">{time}</div>
      <div className="md:col-span-1 flex items-center gap-x-3 md:gap-x-8">
        {
          action === 0 ?
            <BiCheckShield className="w-5 h-5 md:w-6 md:h-6 text-green-400" /> :
            action === 1 ?
              <BiShield className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" /> :
              <BiShieldX className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
        }
        <Tooltip title="Blacklist Caller" placement="bottom">
          <MdBlock className="cursor-pointer w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-red-400 dark:hover:text-red-400"
            onClick={async () => {
              await blacklistContact({
                variables: {
                  upsertContactInput: {
                    isBlacklisted: true,
                    isWhitelisted: false,
                    number: phoneNumber
                  }
                }
              });
              message.success(`${formatPhoneNumberIntl(phoneNumber)} added to blacklist`);
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default CallHistoryItem;