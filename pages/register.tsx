/* eslint-disable @next/next/no-img-element */
import { NextRouter, useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { AppContext } from '../components/context/AppContext';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../data/mutations';

export default function Register() {
  const router: NextRouter = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { registerWithEmailPassword, getFirebaseToken } =
    useContext(AppContext);

  const [createUser] = useMutation(CREATE_USER, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  const handleClick = async () => {
    await registerWithEmailPassword(email, password);
    await createUser({
      variables: {
        createUserInput: {
          email,
          name,
          phoneNumber,
        },
      },
    });
    router.push('/home');
  };

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <nav className="flex my-8 sm:mx-32 mx-10 gap-x-4 items-center mt-10 mb-0 sm:-mb-5">
        <img src={`/images/logo_light.png`} alt="Logo" className="h-8 w-8" />
        <div className="font-poppins-semibold text-xl text-gray-700 dark:text-gray-50">
          robo<span className="text-blue-600 dark:text-blue-200">CAPTCHA</span>
        </div>
      </nav>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:mx-32 mx-10 h-full">
        <div className="self-center sm:mt-10 lg:-mt-24 xl:-mt-44">
          <div className="font-poppins-semibold text-secondary lg:text-5xl text-2xl lg:mb-6 mb-2 mt-8 md:mt-5 lg:mt-0">
            Sign up for
          </div>
          <div className="font-poppins-medium text-secondary lg:text-3xl text-xl lg:mb-12 mb-5">
            our user platform
          </div>
          <div className="font-poppins-regular text-sm">
            If you already have an account, <br /> You can login{' '}
            <Link href="/login">
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

        <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end xl:self-center mt-6 lg:mt-20 xl:-mt-20">
          <form>
            <div className="text-black hidden lg:block font-poppins-semibold text-2xl mb-4">
              Sign Up
            </div>
            <input
              className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className={`placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3 ${
                password !== '' &&
                confirmPassword !== '' &&
                password !== confirmPassword &&
                'border border-red-400'
              }`}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={`placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue ${
                password !== '' &&
                confirmPassword !== '' &&
                password !== confirmPassword &&
                'border border-red-400'
              }`}
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password !== '' &&
              confirmPassword !== '' &&
              password !== confirmPassword && (
                <div className="mt-2 -mb-2 text-red-400">
                  The two passwords do not match.
                </div>
              )}
            <button
              className="mt-7 h-12 lg:h-14 rounded-lg bg-blue-darkBlue mx-auto text-white lg:w-10/12 w-full shadow-xl"
              onClick={async (e) => {
                e.preventDefault();
                await handleClick();
              }}
            >
              Register
            </button>

            <div className="text-gray-400 sm:my-6 mt-8 mb-4 text-center lg:w-10/12 w-full">
              or continue with
            </div>
            <div className="flex lg:w-10/12 w-full">
              <div className="flex mx-auto mb-10">
                <img
                  className="cursor-pointer h-10 mr-6"
                  alt="icon"
                  src="/images/apple.png"
                />
                <img
                  className="cursor-pointer h-10"
                  alt="icon"
                  src="/images/google.png"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
