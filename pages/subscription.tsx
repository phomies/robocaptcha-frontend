import Layout from '../components/layout/Layout';
import { MdDone } from 'react-icons/md';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useContext, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AppContext } from '../components/context/AppContext';
import { NextRouter, useRouter } from "next/router";
import { UPSERT_PAYMENT, DELETE_PAYMENT } from '../data/mutations';
import { GET_USER } from "../data/queries";
import { Modal, message } from 'antd';
import Head from 'next/head';
import moment from 'moment'

function Subscription() {
  const { getFirebaseToken } = useContext(AppContext);
  const router: NextRouter = useRouter();

  const [amount, setAmount] = useState<number>(7);
  const [dateEnd, setDateEnd] = useState<string>('');
  const [plan, setPlan] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const { data } = useQuery(GET_USER, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    }
  })

  const [upsertPayment] = useMutation(UPSERT_PAYMENT, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  const [deletePayment] = useMutation(DELETE_PAYMENT, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  const handleToken = async (token: any) => {
    await upsertPayment({
      variables: {
        upsertPaymentInput: {
          amount: amount,
          dateStart: moment(),
          dateEnd: moment().add(1, 'months'),
          plan: "PREMIUM",
          transactionId: token.id,
        },
      },
    });
    router.reload();
  };

  useMemo(() => {
    if (data) {
      // console.log('subscriptionData', data);
      setPlan(data?.getUser.payments[0]?.plan);
      setDateEnd(data?.getUser.payments[0]?.dateEnd);
      setIsCancelled(data?.getUser.payments[0]?.isCancelled);
    }
  }, [data])

  return (
    <Layout>
      <Head>
        <title>roboCAPTCHA | Subscription</title>
      </Head>

      <div className="w-full px-9 md:px-12 pt-6 pb-12">
        {plan === 'PREMIUM' &&
          <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg p-6 mb-12 md:w-72 w-full mt-2">

            {isCancelled === true ? (
              <h1 className="font-poppins-regular text-gray-500 dark:text-gray-400">
                Subscription ends on
              </h1>
            ) : (
              <h1 className="font-poppins-regular text-gray-500 dark:text-gray-400">
                Next payment
              </h1>
            )
            }

            <h1 className="font-poppins-semibold text-gray-700 dark:text-white">
              {new Date(dateEnd).toDateString()}
            </h1>

            <StripeCheckout
              token={handleToken}
              stripeKey="pk_test_51JWxIgJomapQlvkOKjy27IVPV75f4t6LyEU6NxqtjawVAJTwS5s3ghrQevyGrUXI3vs5RHGGkEfyHbGU0aazJyik00TbOClJ64"
              amount={amount * 100}
              name="Payment"
            >
              <button className="border border-blue-darkBlue text-blue-darkBlue bg-blue-lightBlue hover:bg-blue-100 dark:bg-blue-200 dark:hover:bg-blue-300  dark:text-gray-800 dark:border-0 w-full rounded-lg py-2  mt-5 shadow-sm">
                Manage payment
              </button>
            </StripeCheckout>
          </div>

        }

        <h1 className="text-gray-800 text-base md:text-lg dark:text-white font-poppins-medium mt-4">
          Subscription models
        </h1>
        <h1 className="font-poppins-regular text-sm mb-6 text-gray-500 dark:text-gray-400">
          Choose a plan that works best for you
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg p-6">
            <div className="flex">
              <div className="bg-blue-darkBlue dark:bg-blue-200 h-12 w-12 rounded-xl mr-5"></div>
              <div className="my-auto">
                <h1 className="text-base dark:text-white">Premium</h1>
                <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-400">
                  ${amount} / month
                </h1>

              </div>
            </div>

            <hr className="my-5 dark:opacity-30" />
            <div className="flex mb-2">
              <MdDone className="flex my-auto mr-3 flex-none" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">
                Filter calls using customised blacklist and whitelist
              </h1>
            </div>
            <div className="flex mb-2">
              <MdDone className="flex my-auto mr-3 flex-none" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">
                Automated verification of calls
              </h1>
            </div>
            <div className="flex mb-2">
              <MdDone className="flex my-auto mr-3 flex-none" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">
                Customisable verification level
              </h1>
            </div>
            <div className="flex mb-2">
              <MdDone className="flex my-auto mr-3 flex-none" />
              <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">
                Call analysis
              </h1>
            </div>
            {plan === 'PREMIUM' ? (
              <div>
                <Modal
                  title="Are you sure?"
                  visible={isModalVisible}
                  closable={false}
                  centered={true}
                  footer={null}
                >
                  <div className="font-poppins-regular text-sm flex">
                    Your subscription will end on <p className="font-poppins-semibold">&nbsp; {new Date(dateEnd).toDateString()}.</p>
                  </div>
                  <div className="flex items-center mt-7">
                    <button onClick={async () => {
                      await deletePayment();
                      router.reload();
                      message.success("Plan cancelled");
                      setIsModalVisible(false);
                    }}
                      className="text-white  bg-blue-darkBlue rounded-lg py-2 px-5 shadow-sm mr-4 hover:bg-blue-600">
                      Confirm
                    </button>
                    <button onClick={() => { setIsModalVisible(false); }} className="bg-blue-lightBlue hover:bg-blue-100 dark:bg-blue-200 dark:hover:bg-blue-300  dark:text-gray-800 dark:border-0  py-2 px-5 border rounded-lg border-blue-darkBlue text-blue-darkBlue ">
                      Cancel
                    </button>
                  </div>
                </Modal>

                <button onClick={() => { setIsModalVisible(true); }} className="border border-blue-darkBlue text-blue-darkBlue bg-blue-lightBlue hover:bg-blue-100 dark:bg-blue-200 dark:hover:bg-blue-300  dark:text-gray-800 dark:border-0 w-full rounded-lg py-3 mt-5 shadow-sm">
                  Cancel plan
                </button>
              </div>
            ) : (
              <StripeCheckout
                token={handleToken}
                stripeKey={process.env.NEXT_PUBLIC_STRIPE_API_KEY || ''}
                amount={amount * 100}
                name="Payment"
              >
                <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 dark:hover:bg-blue-300 text-white dark:text-gray-800 w-full rounded-lg py-3 mt-5 shadow-sm">
                  Choose plan
                </button>
              </StripeCheckout>
            )}
          </div>
          <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex">
                <div className="bg-blue-darkBlue dark:bg-blue-200 h-12 w-12 rounded-xl mr-5"></div>
                <div className="my-auto">
                  <h1 className="text-base dark:text-white">Beginner</h1>
                  <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-400">
                    Free
                  </h1>
                </div>
              </div>
              <hr className="my-5 dark:opacity-30" />
              <div className="flex mb-2">
                <MdDone className="flex my-auto mr-3 flex-none" />
                <h1 className="font-poppins-regular text-sm text-gray-500 dark:text-gray-300">
                  Filter calls using customised blacklist and whitelist
                </h1>
              </div>
            </div>
            {plan === 'FREE' ? (
              <button disabled className="border border-blue-darkBlue text-blue-darkBlue bg-blue-lightBlue dark:bg-blue-50  dark:text-gray-800 dark:border-0 w-full rounded-lg py-3 mt-5 shadow-sm">
                Current plan
              </button>
            ) : (
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 dark:hover:bg-blue-300 text-white dark:text-gray-800 w-full rounded-lg py-3 mt-5 shadow-sm">
                Choose plan
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout >
  );
}

export default Subscription;
