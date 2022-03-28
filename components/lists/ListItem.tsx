import { BiUserCircle } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { useMutation, gql } from "@apollo/client";

interface Props {
  isWhitelist: boolean
  number: string
}

const ListItem = (props: Props) => {
  const { isWhitelist, number } = props;

  return (
    <div className="dark:bg-secondary_dark text-xs md:text-sm py-4 px-7 flex justify-between">
      <div className="flex items-center gap-x-3">
        <BiUserCircle className="h-6 w-6 text-gray-500" />
        {number.slice(0, 3) + " " + number.slice(3, 7) + " " + number.slice(7)}
      </div>
      <div className="flex items-center">
        <HiOutlineTrash className="cursor-pointer w-5 h-5 text-red-400 hover:text-red-500" />
      </div>
    </div>
  )
}

export default ListItem