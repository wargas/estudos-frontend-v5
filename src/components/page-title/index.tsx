import { MdChevronLeft } from "react-icons/md";

type Props = {
  title: string;
  subtitle?: string;
  backAction?: () => void;
  children?: any;
};

export default function PageTitle({ title, subtitle, children, backAction }: Props) {
  return (
    <div className="flex bg-white border-b border-gray-100  justify-between items-center px-5 p-3">
      <div className="flex">
        {backAction && (
          <button onClick={backAction} className="min-w-[30px] text-center">
            <MdChevronLeft />
          </button>
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-500">{title}</h1>
          {subtitle && <span className="font-light">{subtitle}</span>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
