import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <nav className="h-12">
        <img className="h-8 my-8 mx-32" alt="icon" src="/logo.png" />
      </nav>
      <div className="grid grid-cols-3 mx-32 h-full">
        <div className="self-center -mt-60">
          <h1 className="font-poppins-semibold text-secondary text-5xl mb-6">Sign in to</h1>
          <h1 className="font-poppins-medium text-secondary text-3xl mb-12">our user platform</h1>
          <h1 className="font-poppins-regular text-sm mb-1">If you don't have an account registered, <br /> You can register <a className="font-poppins-semibold text-blue-600 hover:underline" href="/register">here!</a></h1>
        </div>

        <img className="w-7/12 mt-48" alt="login" src="/images/login.png" />

        <div className="text-sm text-blue-darkBlue font-poppins-regular justify-end self-center -mt-44">
          <form>
            <h1 className="text-black flex font-poppins-semibold text-2xl mb-9">Sign in</h1>
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-10"
              placeholder="Email or username"
              type="email"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-11"
              placeholder="Password"
              type="password"
            />
            <button className="h-14 rounded-lg bg-blue-darkBlue mx-auto text-white w-10/12 shadow-xl" onClick={() => router.push("/home")}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}