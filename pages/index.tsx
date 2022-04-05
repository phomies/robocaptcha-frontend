import type { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AppContext } from '../components/context/AppContext';

const Index: NextPage = () => {
  const router: NextRouter = useRouter();
  const { getFirebaseToken } = useContext(AppContext);

  useEffect(() => {
    router.push(getFirebaseToken() ? '/home' : '/login');
  }, [getFirebaseToken()]);

  return (
    <div />
  );
};

export default Index;
