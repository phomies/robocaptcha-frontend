import { BiUserCircle } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { useContext } from "react";
import { UPSERT_CONTACT } from "../../data/mutations";
import { AppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import { NextRouter, useRouter } from "next/router";
import { Tooltip } from "antd";

interface Props {
  isWhitelist: boolean
  number: string
}

const ListItem = (props: Props) => {
  const { isWhitelist, number } = props;
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
    <div className="dark:bg-secondary_dark text-xs md:text-sm py-4 px-7 flex justify-between">
      <div className="flex items-center gap-x-3">
        <BiUserCircle className="h-6 w-6 text-gray-500" />
        {number.slice(0, 3) + " " + number.slice(3, 7) + " " + number.slice(7)}
      </div>
      <Tooltip title={`Remove from ${isWhitelist ? "Whitelist" : "Blacklist"}`} placement="bottom">
        <div className="flex items-center">
          <HiOutlineTrash className="cursor-pointer w-5 h-5 text-red-400 hover:text-red-500"
            onClick={() => {
              if (isWhitelist) {
                removeWhitelist();
              } else {
                removeBlacklist();
              }
              router.reload();
            }} />
        </div>
      </Tooltip>
    </div>
  )
}

export default ListItem