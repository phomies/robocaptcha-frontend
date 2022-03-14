import { gql, useQuery } from '@apollo/client'
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithCredential,
} from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import app from '../../firebase/clientApp'

interface Props {
  children: React.ReactNode
}

interface AppContextInterface {
  getUserId: () => string | null | undefined
  saveUserId: (id: string) => void
  getTheme: () => string | null | undefined
  saveTheme: (id: string) => void
  signOut: () => void
}

const appContextDefaults: AppContextInterface = {
  getUserId: () => null,
  saveUserId: () => null,
  getTheme: () => null,
  saveTheme: () => null,
  signOut: () => null,
}

export const AppContext = createContext<AppContextInterface>(appContextDefaults)
export const useAppContext = () => useContext(AppContext)

const LOGIN_USER = gql`
  query loginUser($token: String) {
    loginUser(token: $token)
  }
`
const firebaseAuth = getAuth(app)

function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string | null>(null)
  const [theme, setTheme] = useState<string | null>(null)
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null)
  const [googleToken, setGoogleToken] = useState<string | null>(null)
  const [gapiModule, setGapiModule] = useState<any>(null)

  const googleProvider = new GoogleAuthProvider()
  //   googleProvider.addScope('https://www.googleapis.com/auth/contacts')
  //   googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')

  const { refetch } = useQuery(LOGIN_USER, {
    variables: { token: firebaseToken },
  })

  useEffect(() => {
    const initGapi = async () => {
      // Dynamic imports
      const gapi = await import('gapi-script').then((pack) => pack.gapi)
      const loadAuth2 = await import('gapi-script').then(
        (pack) => pack.loadAuth2
      )

      const gapiAuth = await loadAuth2(
        gapi,
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        'https://www.googleapis.com/auth/contacts.readonly'
      )
      console.log(gapiAuth.isSignedIn)
      gapiAuth.isSignedIn.listen((isSignedIn: boolean) => {
        if (isSignedIn) {
          getGoogleToken()
        }
      })

      setGapiModule(gapiAuth)

      if (gapiAuth.isSignedIn.get()) {
        updateUser(gapiAuth.currentUser.get())
      } else {
        attachSignIn(document.getElementById('google-sign-in'), gapiAuth)
      }
    }
    initGapi()
  }, [])

  useEffect(() => {
    if (!googleToken && gapiModule) {
      attachSignIn(document.getElementById('google-sign-in'), gapiModule)
    }
  }, [googleToken])

  //   useEffect(() => {
  //     const unsubscribe = onIdTokenChanged(firebaseAuth, handleUser)

  //     return () => unsubscribe()
  //   }, [])

  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      const id = localStorage.getItem('id')
      setUserId(id)
    }
    if (localStorage.getItem('theme') !== null) {
      const th = localStorage.getItem('theme')
      setTheme(th)
    }
  }, [])

  const getGoogleToken = () => {
    const googleUser = gapiModule.currentUser.get()
    const authResponse = googleUser.getAuthResponse(true) // True -> Get access token
    console.log(authResponse)
  }

  const attachSignIn = (element: HTMLElement | null, auth: any) => {
    auth.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        // TODO - handle user here or listener state
      },
      (error: any) => {
        console.log(JSON.stringify(error))
      }
    )
  }

  const updateUser = (user: any) => {
    console.log('updating user', user)
  }

  const signOut = () => {
    try {
      if (gapiModule) {
        gapiModule.signOut()
      }
    } catch (error) {
      console.log('Error logging out', error)
    }
  }

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      console.log(rawUser)
      const idToken = await rawUser.getIdToken(true)
      localStorage.setItem('accessToken', idToken)

      setFirebaseToken(idToken) // Set firebase access token for communications with backend
      console.log('New access token', idToken, '\n', rawUser.accessToken)
      const credential = GoogleAuthProvider.credential(null, idToken)
      const googleOAuthToken = await signInWithCredential(
        firebaseAuth,
        credential
      )

      refetch() // Update user claims from backend server
      console.log('New google oauth token', googleOAuthToken)
    } else {
      localStorage.removeItem('accessToken')
      setFirebaseToken(null)
      setGoogleToken(null)
      setUserId(null)
    }
  }

  const getUserId = () => {
    return userId
  }

  const saveUserId = useCallback((id: string) => {
    localStorage.setItem('id', id)
    setUserId(id)
  }, [])

  const getTheme = () => {
    return theme
  }

  const saveTheme = useCallback((th: string) => {
    localStorage.setItem('theme', th)
    setTheme(th)
  }, [])

  return (
    <AppContext.Provider
      value={{
        getUserId,
        saveUserId,
        getTheme,
        saveTheme,
        signOut,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AuthProvider
