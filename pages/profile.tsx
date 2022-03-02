import Layout from "../components/layout/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AuthContext } from "../components/context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
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

  if (loading) console.log("loading");
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
        <div className="items-center gap-x-8 first-letter:bg-background w-full px-24 py-7 pb-12">
          <div className="grid grid-cols-5 mb-12">
            <div className="col-span-1 w-32 h-32 bg-blue-600 rounded-full" />

            <div className="col-span-4 my-auto">
              <h2 className="flex font-poppins-semibold mb-2 text-xl">{data?.getUser.name}</h2>
              <h2 className="flex font-poppins-regular text-sm text-gray-600">Update your photo and personal details</h2>
            </div>
          </div>

          <div className="bg-white w-full px-8 p-6 shadow-sm">
            <div className="grid grid-cols-2 mb-6">
              <h1>Profile details</h1>
              <div className="flex justify-self-end" onClick={() => { setEditProfile(true) }}>
                <AiFillEdit className="my-auto mx-4" />
                <h1>Edit profile</h1>
              </div>

            </div>
            <hr className="mb-5" />

            <div className="grid grid-cols-4 gap-x-20">
              <div className="col-span-1">
                <h1 className="text-right text-sm py-4">Name</h1>
                <h1 className="text-right text-sm py-4">Email</h1>
                <h1 className="text-right text-sm py-4">Contact Number</h1>
              </div>
              <div className="col-span-3">
                <input className="focus:outline-none flex text-sm py-4 font-poppins-regular w-full text-blue-darkBlue" value={name} onChange={e => setName(e.target.value)} />
                <input className="focus:outline-none flex text-sm py-4 font-poppins-regular w-full text-blue-darkBlue" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="focus:outline-none flex text-sm py-4 font-poppins-regular w-full text-blue-darkBlue" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
            </div>
          </div>
          <button onClick={() => {
            updateUser();
            router.reload();
          }} className="my-12 h-12 rounded-lg bg-blue-600 text-white w-full shadow-xl">Save Edits</button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;