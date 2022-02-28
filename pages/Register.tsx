export default function Register() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="h-12">
                <img className="h-8 m-4" alt="icon" src="/logo.png" />
            </nav>
            <div className="grid grid-cols-3 mx-44 h-full">
                <div className="mt-44">
                    <h1 className="font-poppins-semibold text-secondary text-5xl mb-6">Sign up to</h1>
                    <h1 className="font-poppins-medium text-secondary text-3xl mb-12">Lorem Ipsum is simply</h1>
                    <h1 className="font-poppins-regular text-sm mb-1">If you already have an account <br /> You can Login here!</h1>
                </div>
                
                <img className="w-7/12 mt-48" alt="login" src="/images/login.png"/>

                <div className="justify-end mt-24">
                    <form>
                        <h1 className="flex font-poppins-semibold text-2xl mb-5">Sign Up</h1>
                        <input className="placeholder:text-blue-darkBlue focus:outline-none font-poppins-regular text-sm text-blue-darkBlue pl-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-4"
                            placeholder="Enter user name"
                            type="email"
                        />
                        <input className="font-poppins-regular placeholder:text-blue-darkBlue focus:outline-none text-sm text-blue-darkBlue pl-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-4"
                            placeholder="Contact number"
                            type="number"
                        />
                        <input className="font-poppins-regular placeholder:text-blue-darkBlue focus:outline-none text-sm text-blue-darkBlue pl-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-4"
                            placeholder="Password"
                            type="password"
                        />
                        <input className="font-poppins-regular placeholder:text-blue-darkBlue focus:outline-none text-sm text-blue-darkBlue pl-5 w-10/12 h-14 rounded-lg bg-blue-lightBlue mb-8"
                            placeholder="Confirm password"
                            type="password"
                        />
                        <button className="h-14 rounded-lg bg-blue-darkBlue mx-auto text-white w-10/12 shadow-2xl">Register</button>
                    </form>
                </div>

            </div>
        </div>
    )
}