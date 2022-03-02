import Layout from "../components/layout/Layout";
import { useQuery, gql } from "@apollo/client";
import { AuthContext } from "../components/context/AuthContext";
import { useContext, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";

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

// const UPDATE_EMAIL = gql`
//   mutation UpdateUser($userInput: UserInput) {
//     updateUser(userInput: $userInput) {
//       email
//     }
//   }
// `;



function Profile() {
  const { getUserId } = useContext(AuthContext);

  const [editProfile, setEditProfile] = useState(false);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserId: getUserId() },
  })

  

  if (loading) return null;
  if (error) console.log("error");
  if (data) console.log(data);

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

          <div className="bg-white w-full px-8 p-5 shadow-sm">
            <div className="grid grid-cols-2 mb-3">
              <h1 className="my-auto">Profile details</h1>
              <div className="flex justify-self-end hover:bg-blue-lightBlue px-4 py-2 rounded-lg" onClick={() => { setEditProfile(true); }}>
                <AiFillEdit className="my-auto mr-4" />
                <h1>Edit profile</h1>
              </div>

            </div>
            <hr className="mb-5" />

            <div className="grid grid-cols-4 gap-x-20">
              <div className="col-span-1">
                <h1 className="text-right text-sm py-4">Name</h1>
                <h1 className="text-right text-sm py-4">Email</h1>
                <h1 className="text-right text-sm py-4">Contact Number</h1>
                <h1 className="text-right text-sm py-4">Password</h1>
              </div>
              {
                (editProfile ?
                  <>
                    <div className="col-span-3">
                      <input className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue border rounded-lg outline-none px-5 h-12" value={data?.getUser.name}/>
                      <input className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue border rounded-lg outline-none px-5 h-12" value={data?.getUser.email}/>
                      <input className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue border rounded-lg outline-none px-5 h-12" value={data?.getUser.phoneNumber}/>
                      <input className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue border rounded-lg outline-none px-5 h-12" value={data?.getUser.password}/>
                      
                      <button className="bg-blue-darkBlue hover:shadow-md px-5 py-2 mt-4 font-poppins-regular flex ml-auto rounded-lg text-white text-sm" onClick={() => { setEditProfile(false);}}>Save</button>
                    </div>
                  </> :
                  <>
                    <div className="col-span-3">
                      <h1 className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue h-12">{data?.getUser.name}</h1>
                      <h1 className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue h-12">{data?.getUser.email}</h1>
                      <h1 className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue h-12">{data?.getUser.phoneNumber.includes("Anonymous") ? "Anonymous" : data?.getUser.phoneNumber.slice(0, 3) + " " + data?.getUser.phoneNumber.slice(3, 7) + " " + data?.getUser.phoneNumber.slice(7)}</h1>
                      <h1 className="flex text-sm py-4 my-1 font-poppins-regular w-full text-blue-darkBlue h-12 overflow-hidden">{data?.getUser.password}</h1>
                    </div>
                  </>)
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;