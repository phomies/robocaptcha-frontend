import Layout from "../components/layout/Layout";
import { useQuery, gql } from "@apollo/client";

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
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserId: "6215b6f7836783021a4a585c" }
  })

  if (loading) console.log("loading");
  if (error) console.log("error");
  if (data) console.log(data);

  return (
    <Layout>
      <div className="flex items-center gap-x-8 bg-background w-full px-12 py-7 pb-12">
        <div className="w-14 h-14 bg-blue-600 rounded-full" />
        <h2 className="font-poppins-medium text-xl">Jane Doe</h2>
      </div>
    </Layout>
  );
}

export default Profile;