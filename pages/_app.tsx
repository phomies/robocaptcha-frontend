import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import AuthProvider from '../components/context/AppContext'
// import WebSocket from 'ws'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const isBrowser = typeof window !== "undefined";
  // const wsInstance = isBrowser ? new Websocket(...) : null;


  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const ws = new WebSocket('ws://localhost:2999/1');

    // ws.on('message', function message(data) {
    //   console.log('received: %s', data);
    // });
    if (ws !== null) {

      ws.onmessage = ((message:any) => {
        console.log('received: ', message);

      })
    }

  }, [])

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp