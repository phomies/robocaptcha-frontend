import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  })

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
