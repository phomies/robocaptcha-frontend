/* eslint-disable @next/next/no-img-element */
import { NextRouter, useRouter } from 'next/router';
import { AppContext } from '../components/context/AppContext';
import { Fragment, useEffect, useContext, useState } from 'react';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import app from '../firebase/clientApp';
import { Modal } from 'antd';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const router: NextRouter = useRouter();
  const {
    getFirebaseToken,
    getGapiModule,
    loginWithEmailPassword,
    loginWithPhoneNumber,
    validatePhoneToken,
    refreshGoogleToken,
    getGoogleToken,
    initGapiModule,
    setAppVerifier,
  } = useContext(AppContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEmailLogin, setIsEmailLogin] = useState<boolean>(true);
  const [isTokenLogin, setIsTokenLogin] = useState<boolean>(false);
  const firebaseAuth = getAuth(app);

  useEffect(() => {
    getFirebaseToken() && router.push('/home');

    const initAuthDoms = async () => {
      if (firebaseAuth) {
        // Instantiate recaptcha
        const verifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response: any) => {
              // Success response -> move on to token validation
              setIsTokenLogin(true);
            },
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
            },
          },
          firebaseAuth
        );
        setAppVerifier(verifier);

        // Recreate google login API
        if (!getGoogleToken()) {
          let gapiModule = getGapiModule();
          if (!gapiModule) {
            gapiModule = await initGapiModule();
          }
          attachSignIn(document.getElementById('google-sign-in'), gapiModule);
        }
      }
    };
    initAuthDoms();
  }, []);

  const attachSignIn = (element: HTMLElement | null, auth: any) => {
    auth.attachClickHandler(
      element,
      {},
      (user: any) => {
        refreshGoogleToken(user);
        // router.push('/home');
      },
      (error: any) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  const handleEmailLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
    } catch (error) {
      console.log('Error with logging in', error);
      setIsModalVisible(true);
    }
  };

  const handlePhoneLogin = async () => {
    try {
      await loginWithPhoneNumber(contactNumber);
    } catch (error) {
      console.log('Error with logging in with phone', error);
    }
  };

  const handleTokenLogin = async () => {
    try {
      await validatePhoneToken(token);
    } catch (error) {
      console.log('Error with logging in with token', error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>roboCAPTCHA | Login</title>
      </Head>

      <Modal
        title="Error"
        visible={isModalVisible}
        closable={false}
        centered={true}
        footer={null}
      >
        <div className="font-poppins-regular text-sm">
          Invalid email or password entered. Please try again.
        </div>
        <button
          className="mt-6 py-2 px-7 rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsModalVisible(false)}
        >
          OK
        </button>
      </Modal>
      <div className="flex flex-col h-screen overflow-y-scroll scrollbar-hide">
        <nav className="flex my-8 sm:mx-32 mx-10 gap-x-4 items-center mt-10 -mb-5">
          <img src={`/images/logo_light.png`} alt="Logo" className="h-8 w-8" />
          <div className="font-poppins-semibold text-xl text-gray-700 dark:text-gray-50">
            robo
            <span className="text-blue-600 dark:text-blue-200">CAPTCHA</span>
          </div>
        </nav>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:mx-32 mx-10 h-full">
          <div className="self-center sm:mt-10 lg:-mt-24">
            <div className="font-poppins-semibold text-secondary lg:text-5xl text-2xl lg:mb-6 mb-2 mt-8 lg:mt-16">
              Sign in to
            </div>
            <div className="font-poppins-medium text-secondary lg:text-3xl text-xl lg:mb-12 mb-5">
              our user platform
            </div>
            <div className="font-poppins-regular text-sm sm:mb-10">
              If you don&apos;t have an account registered, <br /> You can
              register{' '}
              <Link href="/register">
                <a className="font-poppins-semibold text-blue-600 hover:underline">
                  here!
                </a>
              </Link>
            </div>
          </div>

          <img
            className="hidden xl:block w-7/12 mt-56"
            alt="login"
            src="/images/login.png"
          />

          <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end lg:self-center -mt-10 md:-mt-12 lg:-mt-3">
            <form>
              <div className="text-black hidden lg:block font-poppins-semibold text-2xl mb-8">
                Sign in
              </div>
              <div className="flex lg:w-10/12 items-center justify-evenly mb-9">
                <div
                  className={`cursor-pointer hover:font-poppins-semibold ${
                    isEmailLogin && 'font-poppins-semibold'
                  }`}
                  onClick={() => setIsEmailLogin(true)}
                >
                  Email
                </div>
                <div className="h-6 w-px bg-gray-300" />
                <div
                  className={`cursor-pointer hover:font-poppins-semibold ${
                    !isEmailLogin && 'font-poppins-semibold'
                  }`}
                  onClick={() => setIsEmailLogin(false)}
                >
                  Phone
                </div>
              </div>
              {isEmailLogin ? (
                <Fragment>
                  <input
                    className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-10 mb-6"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                  <input
                    className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-11 mb-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <button
                    className="h-14 rounded-lg bg-blue-darkBlue hover:bg-blue-700 mx-auto text-white lg:w-10/12 w-full shadow-xl"
                    onClick={async (e) => {
                      e.preventDefault();
                      await handleEmailLogin();
                    }}
                  >
                    Login
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  {isTokenLogin ? (
                    <input
                      className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-11 mb-10"
                      placeholder="Token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  ) : (
                    <input
                      className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-10 mb-6"
                      placeholder="Contact Number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  )}

                  <button
                    className="h-14 rounded-lg bg-blue-darkBlue hover:bg-blue-700 mx-auto text-white lg:w-10/12 w-full shadow-xl"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (isTokenLogin) {
                        await handleTokenLogin();
                      } else {
                        await handlePhoneLogin();
                      }
                    }}
                  >
                    {isTokenLogin ? 'Login' : 'Send OTP'}
                  </button>
                </Fragment>
              )}
            </form>
            <div className="text-gray-400 sm:my-8 mt-8 mb-4 text-center lg:w-10/12 w-full">
              or continue with
            </div>
            <div className="flex lg:w-10/12 w-full">
              <div className="flex mx-auto">
                <img
                  className="cursor-pointer h-10 mr-6"
                  alt="icon"
                  src="/images/apple.png"
                />
                <div id="google-sign-in">
                  <img
                    className="cursor-pointer h-10"
                    alt="icon"
                    src="/images/google.png"
                  />
                </div>
                <div id="recaptcha-container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
