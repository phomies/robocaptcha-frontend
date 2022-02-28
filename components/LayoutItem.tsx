import { useRouter } from "next/router";
import { ReactElement } from "react";

interface Props {
  title: string
  icon: ReactElement
}

function LayoutItem(props: Props) {
  const router = useRouter();
  const focused = router.pathname !== "" && router.pathname.includes(props.title.toLowerCase());

  return (
    <button onClick={() => router.push(`/${props.title.toLowerCase()}`)}
      className={`w-full px-10 flex items-center py-5 text-base gap-5 hover:bg-gray-100 hover:text-blue-600 border-l-4 border-transparent hover:font-poppins-semibold hover:border-blue-600 ${focused && "border-l-4 bg-gray-100 text-blue-600 border-blue-600 font-poppins-semibold"}`}
    >
      {props.icon}
      <div className="text-sm">{props.title}</div>
    </button>
  );
}

export default LayoutItem;