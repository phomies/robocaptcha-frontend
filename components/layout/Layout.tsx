import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import LayoutItem from './LayoutItem';
import { FaUserCircle } from 'react-icons/fa';
import {
  MdNotificationsNone,
  MdPayment,
  MdOutlineListAlt,
  MdNotificationsActive,
  MdOutlineNotificationsOff,
} from 'react-icons/md';
import { FiHome, FiSettings } from 'react-icons/fi';
import { CgUserList } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import { TiThMenu } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import DayNightToggle from 'react-day-and-night-toggle';
import { Drawer } from 'antd';
import useDeviceSize from '../../utils/useDeviceSize';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../../data/queries';
import { READ_NOTIFS } from '../../data/mutations';
import toast, { Toaster } from 'react-hot-toast';
import client from '../../apollo-client';

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { getTheme, saveTheme, signOut, getFirebaseToken, resetProvider } =
    useContext(AppContext);
  const [title, setTitle] = useState<string>('');
  const router: NextRouter = useRouter();
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState<boolean>(false);
  const [width] = useDeviceSize();

  const [getNotifs, { data }] = useLazyQuery(GET_USER, {
    context: {
      headers: {
        fbToken: getFirebaseToken(),
      },
    },
  });

  const [readIndivNotif] = useMutation(READ_NOTIFS, {
    context: {
      headers: {
        fbToken: getFirebaseToken()
      }
    }
  })

  const readNotifs = () => {
    if (data) {
      data.getUser.notifications.map((item: any) => (
        readIndivNotif({
          variables: {
            id: item._id
          }
        })
      ))
    }
  }

  // useMemo(() => {
  //   if (data) console.log('notifsData', data);
  // }, [data])

  useMemo(() => {
    if (router.pathname.includes('home')) {
      setTitle('Home');
    } else if (router.pathname.includes('profile')) {
      setTitle('Profile');
    } else if (router.pathname.includes('lists')) {
      setTitle('Call Lists');
    } else if (router.pathname.includes('subscription')) {
      setTitle('Subscription');
    } else if (router.pathname.includes('settings')) {
      setTitle('Settings');
    }
  }, [router.pathname]);

  const logout = async () => {
    await signOut();
    await resetProvider();
    await client.clearStore();
  };

  const notify = (notification: any) => {
    // console.log('notification', notification);
    const dateTime = new Date(notification.dateTime);

    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <MdNotificationsActive className="h-7 w-7 rounded-full" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.content}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {dateTime.toDateString() + ' ' + dateTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }

    let ws: WebSocket | null = null;
    let autoReload = setInterval(() => {
      // console.log('checking connection');

      if (ws === null || ws.readyState !== ws.OPEN) {
        // TODO - Shift into env variable
        ws = new WebSocket('wss://notification.robocaptcha.xyz/' + userId);
        ws.onmessage = (message: any) => {
          // console.log('received: ', message);
          notify(JSON.parse(message.data));
        };
      }
    }, 1000);

    // notify({
    //   content: 'Successful call from +6597774381',
    //   dateTime: new Date('2022-03-23T12:25:41.723Z'),
    //   read: false,
    //   url: 'https://google.com'
    // });

    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(autoReload);
    };
  }, []);

  return (
    <div className={`font-poppins-medium text-gray-700 dark:text-gray-50 ${getTheme() === 'dark' && 'dark'}`}>
      {/* menu drawer */}
      <Drawer
        className={`${getTheme() === 'dark' && 'dark'}`}
        placement="left"
        visible={width < 1280 && visibleDrawer}
        width={width < 700 ? '70%' : '40%'}
        closable={false}
      >
        <div className="dark:bg-secondary_dark h-screen">
          <div className="dark:text-gray-50 pt-9 flex items-center px-12 mb-7 gap-x-8">
            <ImCross
              className="h-4 w-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-200"
              onClick={() => setVisibleDrawer(false)}
            />
            <div className="font-poppins-semibold text-secondary text-xl">
              Menu
            </div>
          </div>
          <LayoutItem title="Home" icon={<FiHome className="h-5 w-5" />} />
          <LayoutItem
            title="Profile"
            icon={<CgUserList className="h-6 w-6" />}
          />
          <LayoutItem
            title="Lists"
            icon={<MdOutlineListAlt className="h-6 w-6" />}
          />
          <LayoutItem
            title="Subscription"
            icon={<MdPayment className="h-5 w-5" />}
          />
          <LayoutItem
            title="Settings"
            icon={<FiSettings className="h-5 w-5" />}
          />
          <hr className="mb-2 dark:opacity-30" />
          <button
            onClick={async () => await logout()}
            className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 hover:text-blue-600 dark:text-gray-50 dark:hover:text-blue-200 hover:font-poppins-semibold"
          >
            <BiLogOut className="h-5 w-5" />
            <div className="text-sm">Logout</div>
          </button>
        </div>
      </Drawer>

      {/* notifs drawer */}
      <Drawer
        className={`${getTheme() === 'dark' && 'dark'}`}
        placement="right"
        visible={isNotifsOpen}
        width={width < 900 ? '80%' : '40%'}
        closable={false}
      >
        <div className="dark:bg-secondary_dark h-screen overflow-y-scroll scrollbar-hide">
          <div className="px-12 bg-white absolute z-50 h-20 dark:bg-secondary_dark dark:text-gray-50 pt-9 pb-7 w-full flex items-center gap-x-8">
            <ImCross
              className="h-4 w-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-200"
              onClick={() => {
                setIsNotifsOpen(false);
                readNotifs();
              }}
            />
            <div className="font-poppins-semibold text-secondary text-xl">
              Notifications
            </div>
          </div>
          <div className="mt-24 mb-11 flex flex-col gap-y-4 px-12">
            {data?.getUser.notifications.length === 0 ?
              <div className="flex flex-col h-full w-full items-center justify-center text-base dark:text-gray-200">
                <MdOutlineNotificationsOff className="w-12 h-12 mt-12 mb-4" />
                No notifications
              </div> :
              data?.getUser.notifications.map((item: any) => (
                <div
                  key={item._id}
                  className="text-sm dark:hover:bg-gray-900 dark:text-gray-50 bg-primary_light hover:bg-gray-200 dark:bg-tertiary_dark shadow-lg rounded-lg w-full px-6 py-5"
                >
                  <div className="font-poppins-medium flex justify-between">
                    {item.content}
                    <div className={`flex flex-none -mt-3 -mr-4 bg-red-400 w-[8px] h-[8px] rounded-full ${item.read && 'hidden'}`} />
                  </div>
                  <div className="font-poppins-regular mt-2 text-sm text-gray-400">
                    {new Date(item.dateTime).toDateString()}{' '}
                    {new Date(item.dateTime).toLocaleTimeString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Drawer>

      <div className="flex h-screen w-screen">
        <div className="hidden xl:flex z-50 h-screen fixed w-72 bg-white dark:bg-secondary_dark dark:text-gray-50 shadow-xl justify-center">
          <div className="flex-col w-full">
            <button
              className="flex my-8 self-start gap-x-4 items-center px-11"
              onClick={() => router.push('/home')}
            >
              <img
                src={`/images/logo_${getTheme() || 'light'}.png`}
                alt="Logo"
                className="h-8 w-8"
              />
              <div className="font-poppins-semibold text-xl text-gray-700 dark:text-gray-50">
                robo
                <span className="text-blue-600 dark:text-blue-200">
                  CAPTCHA
                </span>
              </div>
            </button>
            <LayoutItem title="Home" icon={<FiHome className="h-5 w-5" />} />
            <LayoutItem
              title="Profile"
              icon={<CgUserList className="h-6 w-6" />}
            />
            <LayoutItem
              title="Lists"
              icon={<MdOutlineListAlt className="h-6 w-6" />}
            />
            <LayoutItem
              title="Subscription"
              icon={<MdPayment className="h-5 w-5" />}
            />
            <LayoutItem
              title="Settings"
              icon={<FiSettings className="h-5 w-5" />}
            />
            <hr className="mb-2 dark:opacity-30" />
            <button
              onClick={async () => await logout()}
              className="w-full px-10 flex items-center py-4 text-base gap-5 text-gray-700 dark:text-gray-50 dark:hover:text-blue-200 hover:text-blue-600 hover:font-poppins-semibold"
            >
              <BiLogOut className="h-5 w-5" />
              <div className="text-sm">Logout</div>
            </button>
          </div>
        </div>
        <div className="xl:ml-72 bg-primary_light dark:bg-primary_dark dark:text-gray-50 w-full">
          <div className="z-40 bg-primary_light dark:bg-primary_dark sticky top-0 px-9 md:px-12 pt-9 pb-5 justify-between flex items-center">
            <div className="flex items-center gap-x-8">
              <TiThMenu
                className="xl:hidden h-5 w-5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-200"
                onClick={() => setVisibleDrawer(true)}
              />
              <div className="font-poppins-semibold text-secondary text-lg xl:text-2xl pr-4">
                {title}
              </div>
            </div>
            <div className="flex items-center gap-x-5 xl:gap-x-9 xl:-mt-1 xl:mb-1">
              <DayNightToggle
                size={18}
                checked={getTheme() === 'dark'}
                onChange={() =>
                  saveTheme(getTheme() === 'dark' ? 'light' : 'dark')
                }
              />
              <MdNotificationsNone
                className="w-6 h-6 xl:h-8 xl:w-8 text-gray-600 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-200 cursor-pointer"
                onClick={() => {
                  getNotifs();
                  setIsNotifsOpen(true);
                }}
              />
              <FaUserCircle
                className="w-7 h-7 xl:w-8 xl:h-8 text-blue-600 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-300 cursor-pointer"
                onClick={() => router.push('/profile')}
              />
            </div>
          </div>
          <div className="bg-primary_light dark:bg-primary_dark -mt-5 overflow-y-scroll scrollbar-hide">
            {props.children}
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default Layout;