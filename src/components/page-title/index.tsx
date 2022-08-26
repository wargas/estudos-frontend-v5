import React from "react";
import { MdChevronLeft } from "react-icons/md";

type Props = {
  title: string;
  subtitle?: string;
  backAction?: () => void;
  children?: any;
  isLoading?: boolean;
};

const DEFAULT_TITLE =  `Gerenciador de Estudos`

export default function PageTitle({
  title,
  subtitle,
  children,
  backAction,
  isLoading = false,
}: Props) {

  React.useSyncExternalStore

  React.useEffect(() => {
    document.title = title || DEFAULT_TITLE;

    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])

  return (
    <div className="flex bg-white border-b border-gray-100  justify-between items-center px-5 p-3">
      <div className="flex">
        {backAction && (
          <button onClick={backAction} className="min-w-[30px] text-center">
            <MdChevronLeft />
          </button>
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-500">
            {isLoading ? (
              <div className="h-8 w-96 mb-2 rounded-full animate-pulse bg-gray-100"></div>
            ) : (
              title
            )}
          </h1>
          {isLoading ? (
            <div className="h-6 w-80 animate-pulse rounded-full bg-gray-100"></div>
          ) : (
            <span className="font-light">{subtitle}</span>
          )}
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="h-8 w-40 rounded-full animate-pulse bg-gray-100"></div>
        ) : children}
      </div>
    </div>
  );
}
