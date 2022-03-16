/* eslint-disable @next/next/no-img-element */
import { NextRouter, useRouter } from 'next/router';
import { AppContext } from '../components/context/AppContext';
import { Fragment, useEffect, useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/clientApp';
import { Modal } from 'antd';
import Link from 'next/link';

const auth = getAuth(app);

export default function Login() {
  const router: NextRouter = useRouter();
  const {
    getUserId,
    saveUserId,
    getCaptchaRef,
    loginWithEmailPassword,
    loginWithPhoneNumber,
    validatePhoneToken,
  } = useContext(AppContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    getUserId() && router.push('/home');
  }, []);

  const onSubmit = async (email: string, password: string) => {
    try {
      if (isDisabled) {
        await loginWithPhoneNumber(email);
        router.push('/home');
      } else {
        await loginWithEmailPassword(email, password);
      }
    } catch (error) {
      console.log('Error with logging in', error);
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    if (!isNaN(parseInt(email))) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email]);

  return (
    <Fragment>
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
      <div className="flex flex-col h-screen overflow-y-hidden">
        <nav className="flex my-8 sm:mx-32 mx-10 gap-x-4 items-center mt-10 -mb-5">
          <img src={`/images/logo_light.png`} alt="Logo" className="h-8 w-8" />
          <div className="font-poppins-semibold text-xl text-gray-700 dark:text-gray-50">
            robo
            <span className="text-blue-600 dark:text-blue-200">CAPTCHA</span>
          </div>
        </nav>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:mx-32 mx-10 h-full">
          <div className="self-center sm:mt-10 lg:-mt-24 xl:-mt-44">
            <div className="font-poppins-semibold text-secondary lg:text-5xl text-2xl lg:mb-6 mb-2 mt-8">
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
            className="hidden xl:block w-7/12 mt-48"
            alt="login"
            src="/images/login.png"
          />

          <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end lg:self-center -mt-10 md:-mt-12 lg:mt-0 xl:-mt-32">
            <form>
              <div className="text-black hidden lg:block font-poppins-semibold text-2xl mb-8">
                Sign in
              </div>
              <input
                className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-10 mb-6"
                placeholder="Email or contact number"
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
                disabled={isDisabled}
              />
              <input
                className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-11 mb-10"
                placeholder="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                type="string"
              />
              <div className="flex">
                <button
                  className="h-14 rounded-lg bg-blue-darkBlue mx-auto text-white lg:w-10/12 w-full shadow-xl"
                  onClick={async (e) => {
                    e.preventDefault();
                    await onSubmit(email, password);
                  }}
                >
                  Login
                </button>
                <button
                  className="h-14 rounded-lg bg-blue-darkBlue mx-auto text-white lg:w-10/12 w-full shadow-xl"
                  onClick={async (e) => {
                    e.preventDefault();
                    await validatePhoneToken(token);
                  }}
                >
                  Token
                </button>
              </div>
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
                <div
                  id="recaptcha-container"
                  ref={getCaptchaRef()}
                  className="w-3 h-3 bg-slate-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
