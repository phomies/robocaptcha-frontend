/* eslint-disable @next/next/no-img-element */
import { NextRouter, useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { AppContext } from '../components/context/AppContext';
import Head from 'next/head';
import { Steps, Button, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function Register() {
  const router: NextRouter = useRouter();
  const [isNewGoogleUser, setIsNewGoogleUser] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isFileDropped, setIsFileDropped] = useState<boolean>(false);

  const { registerWithEmailPassword } = useContext(AppContext);
  useEffect(() => {
    console.log(router.query);
    const {
      isNewGoogleUser: isNewUser,
      googleName,
      googleEmail,
    } = router.query;

    setIsNewGoogleUser(isNewUser ? true : false);
    if (isNewUser) {
      console.log(googleName, googleEmail);
      setName(googleName as string);
      setEmail(googleEmail as string);
    }
  }, [router.isReady]);

  const handleClick = async () => {
    try {
      await registerWithEmailPassword(email, password, name, phoneNumber);
      message.success('Registration successful');
    } catch (error: any) {
      console.log(error.code);
      var msg = error.code.split('/')[1].replaceAll('-', ' ');
      setCurrent(0);
      message.error(msg);
    }
  };

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: 'Register',
    },
    {
      title: 'Verify',
    },
    {
      title: 'Done',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { Dragger } = Upload;

  const dummyRequest = ({ file, onSuccess }: { file: any; onSuccess: any }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name: 'file',
    multiple: false,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: dummyRequest,
    accept: '.png, .jpeg, .jpg, .pdf',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setIsFileDropped(true);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
      setIsFileDropped(true);
    },
  };

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <Head>
        <title>roboCAPTCHA | Register</title>
      </Head>
      <div className="flex flex-col h-screen overflow-y-hidden">
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

          <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end md:mt-8 mt-8">
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>

            <div className="steps-content pt-5 mx-auto">
              {current == 0 && (
                <form className="my-4 h-max">
                  <div className="text-black font-poppins-semibold text-xl lg:text-2xl mb-4">
                    Sign Up
                  </div>
                  <input
                    className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isNewGoogleUser}
                  />

                  <input
                    required
                    className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isNewGoogleUser}
                  />
                  <input
                    required
                    className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3"
                    placeholder="Phone number"
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                  <input
                    required
                    className={`placeholder:text-blue-darkBlue focus:outline-none px-5 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue mb-3 ${(password !== '' &&
                        confirmPassword !== '' &&
                        password !== confirmPassword) ||
                      (password !== '' &&
                        password.length < 6 &&
                        'border border-red-400')
                      }`}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    className={`placeholder:text-blue-darkBlue focus:outline-none px-5 w-full h-12 lg:h-14 rounded-lg bg-blue-lightBlue ${password !== '' &&
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

                  {password !== '' && password.length < 6 && (
                    <div className="mt-2 -mb-2 text-red-400">
                      Password should be at least 6 characters
                    </div>
                  )}

                  <div className="text-gray-400 my-4 mt-8 text-center w-full">
                    or continue with
                  </div>
                  <div className="flex w-full">
                    <div className="flex mx-auto">
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
              )}

              {current == 1 && (
                <div className="my-2 md:my-10 h-max">
                  <div className="text-black font-poppins-semibold text-xl lg:text-2xl mb-4">
                    Upload IC
                  </div>
                  <h1 className="text-gray-500 mb-8">
                    We will require some additional information to verify your
                    identity.
                  </h1>

                  <Dragger className="mb-2" {...props}>
                    <div className="my-5 mx-5 md:mx-0">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Your IC will only be used for verification purposes
                      </p>
                    </div>
                  </Dragger>
                </div>
              )}

              {current == 2 && (
                <div className="md:mt-10 md:mb-8 h-max">
                  <div className="text-black font-poppins-semibold text-xl lg:text-2xl mb-4">
                    Last step!
                  </div>
                  <img
                    className="w-4/5 mx-auto"
                    alt="registration successful"
                    src="/images/done.png"
                  />
                  <h1 className="text-gray-600 font-poppins-medium mt-5 mb-2">
                    Click on the submit button to complete your registration.
                  </h1>
                  <h1 className="text-gray-500 mb-5">
                    Please wait 1 to 3 business days for us to verify your
                    identity. You will receive a confirmation email once it has
                    been completed. In the meantime, feel free to contact us at
                    abc.email.com if you have any enquiries.
                  </h1>
                </div>
              )}
            </div>

            <div className="flex justify-end mb-16 md:mb-0">
              {current === 1 && (
                <Button
                  className="h-8 border border-blue-darkBlue text-blue-darkBlue bg-blue-lightBlue hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500 rounded-sm shadow-lg"
                  style={{ margin: '0 8px' }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  className="h-8 border bg-blue-darkBlue rounded-sm hover:bg-blue-60 text-white shadow-lg"
                  type="primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleClick();
                  }}
                >
                  Submit
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button
                  className="h-8 border bg-blue-darkBlue rounded-sm hover:bg-blue-600text-white shadow-lg focus:bg-blue-darkBlue"
                  type="primary"
                  onClick={() => next()}
                  disabled={
                    (current === 0 &&
                      (name === '' ||
                        email === '' ||
                        phoneNumber === '' ||
                        password === '' ||
                        confirmPassword === '' ||
                        password.length < 6 ||
                        password !== confirmPassword)) ||
                    (current === 1 && !isFileDropped)
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
