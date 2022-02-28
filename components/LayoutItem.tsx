import { useRouter } from "next/router";

interface Props {
  title: string
  link: string
}

function LayoutItem(props: Props) {
  const router = useRouter();
  const focused = router.pathname !== "" && router.pathname.includes(props.link);

  return (
    <button onClick={() => router.push(`/${props.link}`)}
      className={`w-full px-10 flex items-center py-4 text-base gap-5 hover:bg-highlight border-l-4 border-transparent hover:border-white ${focused && "border-l-4 bg-highlight border-white"}`}
    >
      <img src={`${props.link}.png`} alt="icon" className="h-5 w-5" />
      <div className="text-white">{props.title}</div>
    </button>
  );
}

export default LayoutItem;