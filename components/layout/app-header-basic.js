import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function AppHeaderBasic() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user-token");
    router.reload();
  }, [router]);
  return (
    <header>
      <div className="tw-flex tw-items-center tw-justify-between tw-py-2 tw-px-4 tw-bg-blue-800">
        <div className="tw-text-xl tw-text-white tw-font-bold">
          <Link href="/">To do List</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="tw-text-white tw-font-bold" onClick={logout}>
              로그아웃
            </div>
          ) : (
            <Link href="/auth/login" className="tw-font-bold tw-text-white">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
