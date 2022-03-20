import { ReactElement } from "react";

interface Props {
  title: string
  stats: string
  increase?: string
  icon: ReactElement
}

function HomeItem(props: Props) {
  return (
    <div className="bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full flex py-3 md:py-4 px-7 md:px-6 items-center gap-x-7 md:gap-x-6">
      {props.icon}
      <div className="w-full flex flex-col gap-y-1">
        <div className="text-xs font-poppins-semibold">
          {props.title}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="text-blue-600 dark:text-blue-200 text-base xl:text-lg">
            {props.stats}
          </div>
          {
            props.increase &&
            <div className="text-gray-400 text-xs">
              {props.increase}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default HomeItem;