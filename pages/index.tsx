import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../components/context/AuthContext'

const Index: NextPage = () => {
  const router = useRouter();
  const { getUserId } = useContext(AuthContext);

  useEffect(() => {
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