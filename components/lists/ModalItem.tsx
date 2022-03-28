import { Modal } from "antd";
import { useState, useContext } from "react";
import { UPSERT_CONTACT } from "../../data/mutations";
import { AppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import { NextRouter, useRouter } from "next/router";

interface Props {
  isWhitelist: boolean
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

const ModalItem = (props: Props) => {
  const { isWhitelist, isVisible, setIsVisible } = props;
  const [number, setNumber] = useState<string>("");
  const { getFirebaseToken } = useContext(AppContext);
  const router: NextRouter = useRouter();

  const [blacklistContact] = useMutation(UPSERT_CONTACT, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    },
    variables: {
      upsertContactInput: {
        isBlacklisted: true,
        number: number
      }
    }
  })

  const [whitelistContact] = useMutation(UPSERT_CONTACT, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    },
    variables: {
      upsertContactInput: {
        isWhitelisted: true,
        number: number
      }
    }
  })

  return (
    <Modal
      title={`Add to ${isWhitelist ? "Whitelist" : "Blacklist"}`}
      visible={isVisible}
      closable={false}
      centered={true}
      footer={null}
    >
      <input
        className="text-blue-darkBlue  focus:outline-none px-5 w-full h-14 rounded-lg bg-blue-lightBlue mb-1"
        placeholder="Contact Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button
        className={`mt-6 py-2 px-8 rounded-lg shadow-lg text-white font-poppins-medium ${isWhitelist ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"}`}
        onClick={() => {
          if (isWhitelist) {
            whitelistContact();
            setIsVisible(false);
          } else {
            blacklistContact();
            setIsVisible(false);
          }
          router.reload();
        }}>
        ADD
      </button>
      <button
        className="mt-6 py-2 px-7 text-gray-500 hover:text-gray-600 font-poppins-regular hover:font-poppins-medium"
        onClick={() => setIsVisible(false)}
      >
        CANCEL
      </button>
    </Modal>
  )
}

export default ModalItem