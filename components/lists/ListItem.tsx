import { BiUserCircle } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { useContext } from "react";
import { UPSERT_CONTACT } from "../../data/mutations";
import { AppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import { NextRouter, useRouter } from "next/router";
import { Tooltip } from "antd";
import { formatPhoneNumberIntl } from 'react-phone-number-input';

interface Props {
  isWhitelist: boolean
  number: string
  name?: string
}

const ListItem = (props: Props) => {
  const { isWhitelist, number, name } = props;
  const { getFirebaseToken } = useContext(AppContext);
  const router: NextRouter = useRouter();

  const [removeBlacklist] = useMutation(UPSERT_CONTACT, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    },
    variables: {
      upsertContactInput: {
        isBlacklisted: false,
        number: number
      }
    }
  })

  const [removeWhitelist] = useMutation(UPSERT_CONTACT, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    },
    variables: {
      upsertContactInput: {
        isWhitelisted: false,
        number: number
      }
    }
  })

  return (
    <div className="items-center grid grid-cols-10 dark:bg-secondary_dark text-xs md:text-sm py-4 px-7 justify-between">
      <div className={`${isWhitelist ? "col-span-4" : "col-span-8"} flex items-center gap-x-3`}>
        <BiUserCircle className="h-6 w-6 text-gray-500" />
        {formatPhoneNumberIntl(number)}
      </div>
      {isWhitelist &&
        <div className="col-span-4">
          {name || "-"}
        </div>
      }

      <Tooltip title={`Remove from ${isWhitelist ? "Whitelist" : "Blacklist"}`} placement="bottom">
        <div className="col-span-2 justify-self-end flex items-center">
          <HiOutlineTrash className="cursor-pointer w-5 h-5 text-red-400 hover:text-red-500"
            onClick={async () => {
              if (isWhitelist) {
                await removeWhitelist();
              } else {
                await removeBlacklist();
              }
              router.reload();
            }} />
        </div>
      </Tooltip>
    </div>
  )
}

export default ListItem