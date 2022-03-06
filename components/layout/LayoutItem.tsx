import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";

interface Props {
  title: string
  icon: ReactElement
}

function LayoutItem(props: Props) {
  const router: NextRouter = useRouter();
  const focused = router.pathname == `/${props.title.toLowerCase()}`;

  return (
    <button onClick={() => router.push(`/${props.title.toLowerCase()}`)}
      className={`w-full px-10 flex items-center py-5 text-base gap-5 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-primary_dark dark:hover:text-blue-200 border-l-4 border-transparent hover:font-poppins-semibold hover:border-blue-600 dark:hover:border-blue-200 ${focused && "bg-gray-100 dark:bg-primary_dark text-blue-600 border-blue-600 dark:text-blue-200 dark:border-blue-200 font-poppins-semibold"}`}
    >
      {props.icon}
      <div className="text-sm">{props.title}</div>
    </button>
  );
}

export default LayoutItem;