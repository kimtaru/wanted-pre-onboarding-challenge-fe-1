import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import AppFooterBasic from "../../components/layout/app-footer-basic";
import AppHeaderPage from "../../components/layout/app-header-page";
import { login } from "../../lib/apis";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useCallback(async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      alert("패스워드를 입력해주세요.");
      return;
    }

    const result = await login(email, password);

    if (result?.token) {
      if (confirm("로그인이 완료되었습니다.")) {
        localStorage.setItem("user-token", result.token);
        router.replace("/");
      } else {
        router.replace("/");
      }
    } else {
      alert(result?.details);
    }
  }, [email, password, router]);

  return (
    <>
      <div className=" tw-py-36">
        <div className="tw-text-center tw-p-2"></div>
        <div className="tw-text-center tw-p-1">
          <input
            className="tw-border tw-border-black tw-p-2 tw-w-3/4 tw-rounded-lg"
            placeholder="이메일을 입력해주세요."
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="tw-text-center tw-p-1">
          <input
            className="tw-border tw-border-black tw-p-2 tw-w-3/4 tw-rounded-lg"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className=" tw-text-center tw-p-4">
          <button
            className="tw-border tw-border-black tw-px-12 tw-py-2"
            onClick={userLogin}
          >
            로그인
          </button>
        </div>

        <div className="tw-text-center tw-underline tw-text-blue-600">
          <Link href="/auth/join">아직 가입 안하셨나요?</Link>
        </div>
      </div>
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return (
    <>
      <AppHeaderPage title="로그인" />
      <main>{page}</main>
      <AppFooterBasic />
    </>
  );
};

export default Login;
