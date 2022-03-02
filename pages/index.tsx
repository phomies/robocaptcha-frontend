import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../components/context/AuthContext'

const Index: NextPage = () => {
  const router = useRouter();
  const { getUserId } = useContext(AuthContext);
  const id = getUserId();

  useEffect(() => {
    console.log("id:", id)
    router.push(id ? "/home" : "/login");
  }, [])

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