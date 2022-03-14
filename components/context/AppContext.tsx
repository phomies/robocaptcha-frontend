import { gql, useQuery } from '@apollo/client';
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithCredential,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import app from '../../firebase/clientApp';

interface Props {
  children: React.ReactNode;
}

interface AppContextInterface {
  getUserId: () => string | null | undefined;
  saveUserId: (id: string) => void;
  getTheme: () => string | null | undefined;
  saveTheme: (id: string) => void;
  signOut: () => void;
}

const appContextDefaults: AppContextInterface = {
  getUserId: () => null,
  saveUserId: () => null,
  getTheme: () => null,
  saveTheme: () => null,
  signOut: () => null,
};

export const AppContext =
  createContext<AppContextInterface>(appContextDefaults);
export const useAppContext = () => useContext(AppContext);

const LOGIN_USER = gql`
  query loginUser($token: String) {
    loginUser(token: $token)
  }
`;
const firebaseAuth = getAuth(app);

function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);
  const [googleToken, setGoogleToken] = useState<object | null>(null);
  const [gapiModule, setGapiModule] = useState<any>(null);
  const router = useRouter();
  const { refetch } = useQuery(LOGIN_USER, {
    variables: { token: firebaseToken },
  });

  // Google API handlers
  useEffect(() => {
    const initGapi = async () => {
      // Dynamic imports
      const gapi = await import('gapi-script').then((pack) => pack.gapi);
      const loadAuth2 = await import('gapi-script').then(
        (pack) => pack.loadAuth2
      );

      const gapiAuth = await loadAuth2(
        gapi,
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        'https://www.googleapis.com/auth/contacts.readonly'
      );
      setGapiModule(gapiAuth);

      //   gapiAuth.currentUser.listen(async (currentUser: any) => {
      //     if (currentUser) {
      //       await refreshGoogleToken(currentUser);
      //     }
      //   });

      if (gapiAuth.isSignedIn.get()) {
        await refreshGoogleToken(gapiAuth.currentUser.get());
      } else {
        console.log('attaching new');
        attachSignIn(document.getElementById('google-sign-in'), gapiAuth);
      }
    };
    initGapi();
  }, []);

  useEffect(() => {
    if (!googleToken && gapiModule) {
      console.log('here reloading');
      attachSignIn(document.getElementById('google-sign-in'), gapiModule);
    }
  }, [googleToken]);

  // Firebase handler
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, handleUser);

    return () => unsubscribe();
  }, []);

  // Theme handler
  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      const id = localStorage.getItem('id');
      setUserId(id);
    }
    if (localStorage.getItem('theme') !== null) {
      const th = localStorage.getItem('theme');
      setTheme(th);
    }
  }, []);

  const attachSignIn = (element: HTMLElement | null, auth: any) => {
    auth.attachClickHandler(
      element,
      {},
      (user: any) => {
        refreshGoogleToken(user);
      },
      (error: any) => {
        // TODO - fix mounting issue
        console.log(JSON.stringify(error));
      }
    );
  };

  const refreshGoogleToken = async (user: any) => {
    const authResponse = user.getAuthResponse(true); // True -> Get access token
    console.log('refresh google', authResponse);

    if (authResponse) {
      setGoogleToken({
        idToken: authResponse.id_token,
        accessToken: authResponse.access_token,
      });

      await loginToFirebase(authResponse.id_token, authResponse.access_token);
    }
  };

  const loginToFirebase = async (idToken: string, accessToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken, accessToken);

    // Users already linked to Firebase
    const response = await signInWithCredential(firebaseAuth, credential);
    handleUser(response.user);
    console.log('Signed in with credentials', response);
    // if (firebaseAuth && firebaseAuth.currentUser) {
    //   try {
    //     // Link provider to Firebase
    //     const response = await linkWithCredential(
    //       firebaseAuth.currentUser,
    //       credential
    //     );
    //     console.log('Linked provider', response);
    //   } catch (error) {
    //   }
    // }
    await router.push('/');
  };

  const resetProvider = () => {
    setFirebaseToken(null);
    setGoogleToken(null);
    setGapiModule(null);
    setUserId('');
    localStorage.removeItem('id');
    localStorage.removeItem('accessToken');
  };

  const signOut = async () => {
    try {
      if (gapiModule) {
        // Push to login page first, otherwise HTML element will not be found after attaching gAPI clicker
        await router.push('/login');
        await firebaseSignOut(firebaseAuth);
        await gapiModule.signOut();
        resetProvider();
      }
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      saveUserId(rawUser.uid);
      const idToken = await rawUser.getIdToken(true);
      localStorage.setItem('accessToken', idToken);

      setFirebaseToken(idToken); // Set firebase access token for communications with backend
      refetch(); // Update user claims from backend server
    } else {
      localStorage.removeItem('accessToken');
      resetProvider();
    }
  };

  const getUserId = () => {
    return userId;
  };

  const saveUserId = useCallback((id: string) => {
    localStorage.setItem('id', id);
    setUserId(id);
  }, []);

  const getTheme = () => {
    return theme;
  };

  const saveTheme = useCallback((th: string) => {
    localStorage.setItem('theme', th);
    setTheme(th);
  }, []);

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
  );
}

export default AuthProvider;
