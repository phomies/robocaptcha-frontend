import Layout from "../components/layout/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AuthContext } from "../components/context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { NextRouter, useRouter } from "next/router";

const GET_USER_BY_ID = gql`
  query getUser($getUserId: ID) {
    getUser(id: $getUserId) {
      name
      password
      email
      phoneNumber
    }
  }
`;

const EDIT_USER_BY_ID = gql`
  mutation updateUser($userInput: UserInput) {
    updateUser(userInput: $userInput) {
      name
    }
  }
`

function Profile() {
  const { getUserId } = useContext(AuthContext);
  const router: NextRouter = useRouter();

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { error, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserId: getUserId() },
  })

  const [updateUser] = useMutation(EDIT_USER_BY_ID, {
    variables: {
      userInput: {
        _id: getUserId(),
        name: name,
        email: email,
        phoneNumber: phoneNumber
      }
    }
  })

  if (error) console.log("error");
  if (data) console.log(data);

  useEffect(() => {
    setName(data?.getUser.name);
    setEmail(data?.getUser.email);
    setPhoneNumber(data?.getUser.phoneNumber);
  }, [data])

  return (
    <Layout>
      <div className="flex items-center gap-x-8 bg-background w-full px-12 py-3 pb-12">
        <div className="items-center gap-x-8 first-letter:bg-background w-full lg:px-24 py-4">
          <div className="grid lg:grid-cols-5 grid-cols-3 mb-12 gap-x-20">
            <div className="lg:col-span-1 col-span-1 lg:w-32 lg:h-32 w-24 h-24 bg-blue-600 rounded-full" />

            <div className="lg:col-span-4 col-span-2 my-auto">
              <h2 className="flex font-poppins-semibold mb-2 text-xl">{data?.getUser.name}</h2>
              <h2 className="flex font-poppins-regular text-sm text-gray-600">Update your photo and personal details</h2>
            </div>
          </div>

          <div className="bg-white w-full px-8 p-6 shadow-sm">
            <div className="grid grid-cols-2 mb-6">
              <h1>Profile details</h1>
              {
                !editProfile ?
                  <div className="text-blue-500 hover:text-blue-600 cursor-pointer flex justify-self-end" onClick={() => setEditProfile(true)}>
                    <AiFillEdit className="my-auto mx-4" />
                    <h1>Edit profile</h1>
                  </div> :
                  <div className="text-red-500 hover:text-red-600 cursor-pointer flex justify-self-end" onClick={() => {
                    setEditProfile(false);
                    setName(data?.getUser.name);
                    setEmail(data?.getUser.email);
                    setPhoneNumber(data?.getUser.phoneNumber);
                  }}>
                    <ImCross className="my-auto mx-4 h-3 w-3" />
                    <h1>Discard edit</h1>
                  </div>
              }
            </div>
            <hr className="mb-5" />

            <div className={`grid grid-cols-4 ${editProfile ? "gap-x-16" : "ml-5 gap-x-20"}`}>
              <div className={`col-span-1 ${editProfile && "h-44 justify-between flex flex-col"}`}>
                <h1 className="text-right text-sm py-4">Name</h1>
                <h1 className="text-right text-sm py-4">Email</h1>
                <h1 className="text-right text-sm py-4">Contact Number</h1>
              </div>
              <div className={`col-span-3 ${editProfile && "py-2 h-full justify-between flex flex-col"}`}>
                <input className={`focus:outline-none flex text-sm font-poppins-regular w-3/4 text-blue-darkBlue ${editProfile ? "h-10 border px-6 py-2 rounded-full" : "py-4"}`} value={name} onChange={e => setName(e.target.value)} />
                <input className={`focus:outline-none flex text-sm font-poppins-regular w-3/4 text-blue-darkBlue ${editProfile ? "h-10 border px-6 py-2 rounded-full" : "py-4"}`} value={email} onChange={e => setEmail(e.target.value)} />
                <input className={`focus:outline-none flex text-sm font-poppins-regular w-3/4 text-blue-darkBlue ${editProfile ? "h-10 border px-6 py-2 rounded-full" : "py-4"}`} value={editProfile ? phoneNumber : phoneNumber?.slice(0, 3) + " " + phoneNumber?.slice(3, 7) + " " + phoneNumber?.slice(7)} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
            </div>
          </div>
          {
            editProfile &&
            <button onClick={() => {
              updateUser();
              router.reload();
            }} className="my-8 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white w-full shadow-xl">
              Save Edit
            </button>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Profile;