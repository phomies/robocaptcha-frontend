import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutItem from "./LayoutItem";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("home")) {
      setTitle("Home");
    } else if (router.pathname.includes("profile")) {
      setTitle("Profile");
    } else if (router.pathname.includes("subscriptions")) {
      setTitle("Subscriptions");
    }
  }, [router.pathname]);

  return (
    <div className="font-poppins-semibold text-gray-700 flex h-screen w-screen">
      <div className="z-50 h-screen fixed flex w-72 bg-white shadow-xl justify-center">
        <div className="flex-col">
          <button
            className="flex my-8 self-start"
            onClick={() => router.push("/home")}>
            <img src="/logo.png" alt="Logo" className="px-9" />
          </button>
          <LayoutItem title="Overview" link="overview" />
          <LayoutItem title="Products" link="products" />
          <LayoutItem title="Orders" link="orders" />
          <LayoutItem title="Analytics" link="analytics" />
        </div>
      </div>
      <div className="ml-72 bg-gray-100 w-full">
        <div className="z-40 sticky top-0 px-11 pt-9 justify-between flex items-center">
          <div>
            <h1 className="text-secondary text-2xl">{title}</h1>
          </div>
          <div className="w-9 h-9 bg-blue-300 rounded-full" />
        </div>
        <div className="bg-background2 overflow-y-scroll">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
