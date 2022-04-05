import { Modal } from "antd";
import { useState, useContext } from "react";
import { UPSERT_CONTACT } from "../../data/mutations";
import { AppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import { NextRouter, useRouter } from "next/router";
import PhoneInput from 'react-phone-input-2';

interface Props {
  isWhitelist: boolean
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

const ModalItem = (props: Props) => {

  const { isWhitelist, isVisible, setIsVisible } = props;
  const [number, setNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { getFirebaseToken, getTheme } = useContext(AppContext);
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
        number: number,
        name: name
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
        className="font-poppins-regular text-blue-darkBlue focus:outline-none px-5 w-full h-14 rounded-lg bg-blue-lightBlue mb-1"
        placeholder="Phone Number"
        value={number}
        onChange={(e) => { setNumber('+' + e); }}
      />

      {
        isWhitelist &&
        <input
          className="font-poppins-regular text-blue-darkBlue mt-4 focus:outline-none px-5 w-full h-14 rounded-lg bg-blue-lightBlue mb-1"
          placeholder="Contact Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      }

      <button
        className={`mt-6 py-2 px-8 rounded-lg shadow-lg text-white font-poppins-medium ${isWhitelist ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"}`}
        onClick={async () => {
          if (isWhitelist) {
            await whitelistContact();
            setIsVisible(false);
          } else {
            await blacklistContact();
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