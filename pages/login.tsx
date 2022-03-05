import { NextRouter, useRouter } from "next/router";
import { AuthContext } from "../components/context/AuthContext";
import { useEffect, useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/clientApp';

const auth = getAuth();

const onSubmit = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user: ", user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error: ", errorMessage)
  });
}

export default function Login() {
  const router: NextRouter = useRouter();
  const { getUserId, saveUserId } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    getUserId() && router.push("/home");
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <nav className="h-12">
        <img className="h-8 my-8 sm:mx-32 mx-10" alt="icon" src="/logo.png" />
      </nav>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:mx-32 mx-10 h-full">
        <div className="self-center sm:mt-10 lg:-mt-24 xl:-mt-44">
          <h1 className="font-poppins-semibold text-secondary lg:text-5xl text-2xl lg:mb-6 mb-2 mt-8">Sign in to</h1>
          <h1 className="font-poppins-medium text-secondary lg:text-3xl text-xl lg:mb-12 mb-5">our user platform</h1>
          <h1 className="font-poppins-regular text-sm sm:mb-10">If you don't have an account registered, <br /> You can register <a className="font-poppins-semibold text-blue-600 hover:underline" href="/register">here!</a></h1>
        </div>

        <img className="hidden xl:block w-7/12 mt-48" alt="login" src="/images/login.png" />

        <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end lg:self-center -mt-10 md:-mt-12 lg:mt-0 xl:-mt-32">
          <form>
            <h1 className="text-black hidden lg:block font-poppins-semibold text-2xl mb-8">Sign in</h1>
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-10 mb-6"
              placeholder="Email or contact number"
              value={email} 
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue lg:mb-11 mb-10"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <button className="h-14 rounded-lg bg-blue-darkBlue mx-auto text-white lg:w-10/12 w-full shadow-xl" onClick={() => {
              onSubmit(email, password);
              // saveUserId("6215b6f7836783021a4a585c");
              // router.push("/home");
            }}>Login</button>
          </form>
          <h1 className="text-gray-400 sm:my-8 mt-8 mb-4 text-center lg:w-10/12 w-full">or continue with</h1>
          <div className="flex lg:w-10/12 w-full">
            <div className="flex mx-auto">
              <img className="cursor-pointer h-10 mr-6" alt="icon" src="/images/apple.png" />
              <img className="cursor-pointer h-10" alt="icon" src="/images/google.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}