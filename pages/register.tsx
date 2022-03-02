import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="flex flex-col h-min-screen overflow-y-hidden">
      <nav className="h-12">
        <img className="h-8 my-8 sm:mx-32 mx-10" alt="icon" src="/logo.png" />
      </nav>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:mx-32 mx-10 h-full">
        <div className="self-center sm:mt-10 lg:-mt-24 xl:-mt-44">
          <h1 className="font-poppins-semibold text-secondary lg:text-5xl text-2xl lg:mb-6 mb-2 mt-10">Sign up for</h1>
          <h1 className="font-poppins-medium text-secondary lg:text-3xl text-xl lg:mb-12 mb-5">our user platform</h1>
          <h1 className="font-poppins-regular text-sm  mb-2">If you already have an account, <br /> You can login <a className="font-poppins-semibold text-blue-600 hover:underline" href="/login">here!</a></h1>
        </div>

        <img className="hidden xl:block w-7/12 mt-48"  alt="login" src="/images/login.png" />

        <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end xl:self-center mt-6 lg:mt-12 xl:-mt-28">
          <form>
            <h1 className="text-black hidden lg:block font-poppins-semibold text-2xl mb-4">Sign Up</h1>
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Name"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Email"
              type="email"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Phone number"
            />
            <input className={`placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue mb-3 ${password !== "" && confirmPassword !== "" && password !== confirmPassword && "border border-red-400"}`}
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input className={`placeholder:text-blue-darkBlue focus:outline-none px-5 lg:w-10/12 w-full h-14 rounded-lg bg-blue-lightBlue ${password !== "" && confirmPassword !== "" && password !== confirmPassword && "border border-red-400"}`}
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {
              password !== "" && confirmPassword !== "" && password !== confirmPassword &&
              <div className="mt-2 -mb-2 text-red-400">The two passwords do not match.</div>
            }
            <button className="mt-7 h-14 rounded-lg bg-blue-darkBlue mx-auto text-white lg:w-10/12 w-full shadow-xl" onClick={() => router.push("/home")}>Register</button>

            <h1 className="text-gray-400 sm:my-6 mt-8 mb-4 text-center lg:w-10/12 w-full">or continue with</h1>
            <div className="flex lg:w-10/12 w-full">
              <div className="flex mx-auto mb-10">
                <img className="h-10 mr-6" alt="icon" src="/images/apple.png" />
                <img className="h-10" alt="icon" src="/images/google.png" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}