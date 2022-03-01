import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <nav className="h-12">
        <img className="h-8 my-8 mx-32" alt="icon" src="/logo.png" />
      </nav>
      <div className="grid grid-cols-3 mx-32 h-full">
        <div className="self-center -mt-60">
          <h1 className="font-poppins-semibold text-secondary text-5xl mb-6">Sign up for</h1>
          <h1 className="font-poppins-medium text-secondary text-3xl mb-12">our user platform</h1>
          <h1 className="font-poppins-regular text-sm mb-1">If you already have an account, <br /> You can login <a className="font-poppins-semibold text-blue-600 hover:underline" href="/login">here!</a></h1>
        </div>

        <img className="w-7/12 mt-48" alt="login" src="/images/login.png" />

        <div className="font-poppins-regular text-blue-darkBlue text-sm justify-end self-center -mt-40">
          <form>
            <h1 className="text-black flex font-poppins-semibold text-2xl mb-7">Sign Up</h1>
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Name"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Username"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Email"
              type="email"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Phone number"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-3"
              placeholder="Password"
              type="password"
            />
            <input className="placeholder:text-blue-darkBlue focus:outline-none px-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-7"
              placeholder="Confirm password"
              type="password"
            />
            <button className="h-14 rounded-lg bg-blue-darkBlue mx-auto text-white w-10/12 shadow-xl" onClick={() => router.push("/home")}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}