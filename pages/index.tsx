import type { NextPage } from 'next'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AppContext } from '../components/context/AppContext'

const Index: NextPage = () => {
  const router: NextRouter = useRouter();
  const { getUserId } = useContext(AppContext);

  useEffect(() => {
      console.log(getUserId())
    router.push(getUserId() ? "/home" : "/login");
  }, [getUserId()])

  return (
    <div>
      <Head>
        <title>roboCAPTCHA</title>
        <meta name="description" content="roboCAPTCHA Application" />
        <link rel="icon" href="/logo.ico" />
      </Head>
    </div>
  )
}

export default Index