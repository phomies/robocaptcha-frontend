import { ReactElement } from "react";

interface Props {
  title: string
  stats: string
  increase?: Number
  icon: ReactElement
}

function HomeItem(props: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full flex py-4 px-6 items-center gap-x-6">
      {props.icon}
      <div className="w-full flex flex-col gap-y-1">
        <h2 className="text-xs font-poppins-medium">
          {props.title}
        </h2>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-blue-700 text-lg">
            {props.stats}
          </h2>
          {
            props.increase &&
            <h3 className="text-gray-400 text-xs">
              {props.increase > 0 ? `+${props.increase}%` : `${props.increase}%`}
            </h3>
          }
        </div>
      </div>
    </div>
  );
}

export default HomeItem;