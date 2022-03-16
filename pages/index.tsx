import type { NextPage } from 'next';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AppContext } from '../components/context/AppContext';

const Index: NextPage = () => {
  const router: NextRouter = useRouter();
  const { getFirebaseToken } = useContext(AppContext);

  useEffect(() => {
      console.log(getFirebaseToken(), "here")
    router.push(getFirebaseToken() ? '/home' : '/login');
  }, [getFirebaseToken()]);

  return (
    <div>
      <Head>
        <title>roboCAPTCHA</title>
        <meta name="description" content="roboCAPTCHA Application" />
        <link rel="icon" href="/logo.ico" />
      </Head>
    </div>
  );
};

export default Index;
