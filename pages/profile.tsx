import Layout from "../components/layout/Layout";

function Profile() {
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