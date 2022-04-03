import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER } from '../../data/queries';
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithCredential,
  signOut as firebaseSignOut,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import app from '../../firebase/clientApp';
import { CREATE_USER } from '../../data/mutations';
import { SyncLoader } from 'react-spinners';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

interface Props {
  children: React.ReactNode;
}

interface AppContextInterface {
  getFirebaseToken: () => string | null | undefined;
  saveFirebaseToken: (token: string) => void;
  getTheme: () => string | null | undefined;
  saveTheme: (theme: string) => void;
  signOut: () => void;
  loginWithPhoneNumber: (phoneNumber: string) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  validatePhoneToken: (token: string) => void;
  resetProvider: () => void;
  refreshGoogleToken: (user: any) => void;
  getGoogleToken: () => string | null;
  getGapiModule: () => any;
  initGapiModule: () => any;
  setAppVerifier: (appVerifier: any) => void;
  getUserId: () => string | null;
  registerWithEmailPassword: (
    email: string,
    password: string,
    name: string,
    phoneNumber: string
  ) => void;
}

const appContextDefaults: AppContextInterface = {
  getFirebaseToken: () => null,
  saveFirebaseToken: () => null,
  getTheme: () => null,
  saveTheme: () => null,
  signOut: () => null,
  loginWithPhoneNumber: () => null,
  loginWithEmailPassword: () => null,
  validatePhoneToken: () => null,
  resetProvider: () => null,
  refreshGoogleToken: () => null,
  getGoogleToken: () => null,
  getGapiModule: () => null,
  initGapiModule: () => null,
  setAppVerifier: () => null,
  getUserId: () => null,
  registerWithEmailPassword: () => null,
};

export const AppContext =
  createContext<AppContextInterface>(appContextDefaults);
export const useAppContext = () => useContext(AppContext);

function AuthProvider(props: Props) {
  const [theme, setTheme] = useState<string | null>(null);
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);
  const [googleToken, setGoogleToken] = useState<any>(null);
  const [gapiModule, setGapiModule] = useState<any>(null);
  const [appVerifier, setAppVerifier] = useState<any>(null);
  const [tokenVerification, setTokenVerification] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const firebaseAuth = getAuth(app);

  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);
  const { refetch } = useQuery(LOGIN_USER, {
    context: {
      headers: {
        fbToken: firebaseToken,
      },
    },
  });

  // Local storage handlers
  useEffect(() => {
    if (localStorage.getItem('firebaseToken')) {
      const firebaseToken = localStorage.getItem('firebaseToken');
      setFirebaseToken(firebaseToken);
    }
    if (localStorage.getItem('theme')) {
      const th = localStorage.getItem('theme');
      setTheme(th);
    }
  }, []);

  // Google API handlers
  useEffect(() => {
    if (gapiModule) {
      if (gapiModule.isSignedIn.get()) {
        refreshGoogleToken(gapiModule.currentUser.get());
      }
    } else {
      initGapiModule();
    }
  }, []);

  // Firebase handler
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, handleUser, (error) =>
      console.log('Token listener', error)
    );

    setIsLoaded(true);
    return () => unsubscribe();
  }, []);

  //   useEffect(() => {
  //     const loginUser = async () => {
  //       if (firebaseToken && !isLoggedIn) {
  //         console.log('Creating account if not exist');
  //         await refetch();
  //         setIsLoggedIn(true);
  //         setIsLoaded(true);
  //       }
  //     };

  //     loginUser();
  //   }, [firebaseToken]);

  const initGapiModule = async () => {
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

    return gapiAuth;
  };

  const refreshGoogleToken = async (user: any) => {
    const authResponse = user.getAuthResponse(true); // True -> Get access token
    console.log('Refreshing google token');

    if (authResponse) {
      setGoogleToken({
        idToken: authResponse.id_token,
        firebaseToken: authResponse.access_token,
      });

      await loginToFirebase(authResponse.id_token, authResponse.access_token);
    }
  };

  const loginToFirebase = async (idToken: string, firebaseToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken, firebaseToken);

    // Users already linked to Firebase
    await signInWithCredential(firebaseAuth, credential);
    console.log('Signed in with credentials');

    await router.push('/');
  };

  const loginWithPhoneNumber = async (number: string) => {
    const confirmationResult = await signInWithPhoneNumber(
      firebaseAuth,
      number,
      appVerifier
    );
    setTokenVerification(confirmationResult);
  };

  const validatePhoneToken = async (token: string) => {
    if (tokenVerification) {
      const response = await tokenVerification.confirm(token);
      console.log('Validated phone token', response.user);
    }
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const resetProvider = async () => {
    setFirebaseToken(null);
    setGoogleToken(null);
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('userId');
    await router.push('/login');
  };

  const signOut = async () => {
    try {
      // Reset provider before pushing to /login, otherwise app will reroute back to home
      await resetProvider();

      if (gapiModule) {
        await gapiModule.signOut();
      }
      if (firebaseAuth) {
        await firebaseSignOut(firebaseAuth);
      }
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const handleUser = async (rawUser: any) => {
    setIsLoaded(false);
    if (rawUser) {
      const idToken = await rawUser.getIdToken(true);

      console.warn(idToken, rawUser);
      localStorage.setItem('firebaseToken', idToken);
      localStorage.setItem('userId', rawUser.uid);

      setUserId(rawUser.uid);
      setFirebaseToken(idToken); // Set firebase access token for communications with backend
      saveFirebaseToken(idToken);

      // Update claims for existing users
      if (rawUser.metadata.createdAt !== rawUser.metadata.lastLoginAt) {
        await refetch({
          context: {
            headers: {
              fbToken: idToken,
            },
          },
        }); // Update user claims from backend server
      }
      router.push('/home');
      setIsLoaded(true);
    } else {
      await resetProvider();
      router.push('/login');
      setIsLoaded(true);
    }
  };

  const getFirebaseToken = () => {
    return firebaseToken;
  };

  const saveFirebaseToken = useCallback((firebaseToken: string) => {
    localStorage.setItem('firebaseToken', firebaseToken);
    setFirebaseToken(firebaseToken);
  }, []);

  const getTheme = () => {
    return theme;
  };

  const saveTheme = useCallback((th: string) => {
    localStorage.setItem('theme', th);
    setTheme(th);
  }, []);

  const getGoogleToken = () => {
    return googleToken;
  };

  const getGapiModule = () => {
    return gapiModule;
  };

  const getUserId = () => {
    return userId;
  };

  const registerWithEmailPassword = async (
    email: string,
    password: string,
    name: string,
    phoneNumber: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    await createUser({
      context: {
        headers: {
          fbToken: token,
        },
      },
      variables: {
        createUserInput: {
          email,
          name,
          phoneNumber,
        },
      },
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-neutral-800">
        <SyncLoader color="#1FBCE7" size={30} margin={3} />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        getFirebaseToken,
        saveFirebaseToken,
        getTheme,
        saveTheme,
        signOut,
        loginWithPhoneNumber,
        loginWithEmailPassword,
        validatePhoneToken,
        resetProvider,
        refreshGoogleToken,
        getGoogleToken,
        getGapiModule,
        initGapiModule,
        setAppVerifier,
        getUserId,
        registerWithEmailPassword,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AuthProvider;
