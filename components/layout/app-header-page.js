import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useCallback } from "react";
const AppHeaderPage = ({ title }) => {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <header>
      <div className="tw-flex tw-items-center tw-justify-between tw-py-2 tw-px-4">
        <div className="tw-text-xl tw-text-black tw-font-bold">
          <ChevronLeftIcon
            className="tw-w-6 tw-h-6 tw-cursor-pointer"
            onClick={goBack}
          />
        </div>
        <div className="tw-text-lg tw-font-bold">{title}</div>
        <div className="tw-w-6 tw-h-6"></div>
      </div>
    </header>
  );
};

export default AppHeaderPage;
