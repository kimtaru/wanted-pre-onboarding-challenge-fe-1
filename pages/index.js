import Link from "next/link";
import { useEffect, useState } from "react";
import AppFooterBasic from "../components/layout/app-footer-basic";
import AppHeaderBasic from "../components/layout/app-header-basic";
import TodoList from "../components/todo-list";
import { deleteTodo } from "../lib/apis";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <TodoList />
      ) : (
        <div
          className="tw-py- tw-py-64
       tw-text-center tw-text-5xl"
        >
          TODO LIST :)
          <div className="tw-text-xl">
            시작하시려면{" "}
            <Link href="/auth/login" style={{ color: "blue" }}>
              로그인
            </Link>{" "}
            해주세요!
          </div>
        </div>
      )}
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <>
      <AppHeaderBasic />
      <main>{page}</main>
      <AppFooterBasic />
    </>
  );
};
