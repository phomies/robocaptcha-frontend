import Layout from "../components/layout/Layout";
import { useQuery, gql } from "@apollo/client";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";

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

function Profile() {
  const { getUserId } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserId: getUserId() }
  })

  if (loading) return null;
  if (error) console.log("error");
  if (data) console.log(data);

  return (
    <Layout>
      <div className="flex items-center gap-x-8 bg-background w-full px-12 py-7 pb-12">
        <div className="w-14 h-14 bg-blue-600 rounded-full" />
        <h2 className="font-poppins-medium text-xl">{data?.getUser.name}</h2>
        <h2 className="font-poppins-regular text-lg text-gray-500">{data?.getUser.email}</h2>
      </div>
    </Layout>
  );
}

export default Profile;