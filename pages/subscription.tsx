import Layout from "../components/layout/Layout";
import { MdDone } from "react-icons/md";
import StripeCheckout from 'react-stripe-checkout';

function Subscription() {

  return (
    <Layout>
      <div className="w-full px-12 pt-6 pb-12">
        <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg p-6 mb-12 md:w-72 w-full mt-2">
          <h1 className="font-poppins-regular text-gray-500 dark:text-gray-400">Next payment</h1>
          <h1 className="font-poppins-semibold text-gray-700 dark:text-white">on 30 November 2020</h1>

          <StripeCheckout 
            token={(token) => {
              console.log(token);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
            // amount={500}
            name="Payment"
            // description="survey credits"

          >
            <button className="border border-blue-darkBlue text-blue-darkBlue bg-blue-lightBlue hover:bg-blue-100 dark:bg-blue-200 dark:hover:bg-blue-300  dark:text-gray-800 dark:border-0 w-full rounded-lg py-2  mt-5 shadow-sm">Make payment</button>
          </StripeCheckout>
        </div>

        <h1 className="text-lg dark:text-white font-poppins-medium">Subscription models</h1>
        <h1 className="font-poppins-regular text-sm mb-6 text-gray-500 dark:text-gray-400">Choose a plan that works best for you</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg p-6">
            <div className="flex">
              <div className="bg-blue-darkBlue dark:bg-blue-200 h-12 w-12 rounded-xl mr-5"></div>
              <div className="my-auto">
                <h1 className="text-base dark:text-white">Premium</h1>
                <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-400">$7 / month</h1>
              </div>
            </div>

            <hr className="my-5 dark:opacity-30" />
            <div className="flex mb-2">
              <MdDone className="grid my-auto mr-3" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">Filter calls using customised blacklist and whitelist</h1>
            </div>
            <div className="flex mb-2">
              <MdDone className="grid my-auto mr-3" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">Automated verification of calls</h1>
            </div>
            <div className="flex mb-2">
              <MdDone className="grid my-auto mr-3" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">Customisable verification level</h1>
            </div>
            <div className="flex mb-2">
              <MdDone className="grid my-auto mr-3" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">Call analysis</h1>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 dark:hover:bg-blue-300 text-white dark:text-gray-800 w-full rounded-lg py-3 mt-5 shadow-sm">Choose plan</button>
          </div>
          <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex">
                <div className="bg-blue-darkBlue dark:bg-blue-200 h-12 w-12 rounded-xl mr-5"></div>
                <div className="my-auto">
                  <h1 className="text-base dark:text-white">Beginner</h1>
                  <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-400">Free</h1>
                </div>
              </div>
              <hr className="my-5 dark:opacity-30" />
              <div className="flex mb-2">
                <MdDone className="grid my-auto mr-3" />
                <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">Filter calls using customised blacklist and whitelist</h1>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 dark:hover:bg-blue-300 text-white dark:text-gray-800 w-full rounded-lg py-3  mt-5 shadow-sm">Choose plan</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Subscription;