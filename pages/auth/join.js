import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AppFooterBasic from "../../components/layout/app-footer-basic";
import AppHeaderPage from "../../components/layout/app-header-page";
import { signUp } from "../../lib/apis";

const Join = () => {
  const router = useRouter();
  const [joinButtonActive, setjoinButtonActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const emailCheckregex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (emailCheckregex.test(email) && password.length >= 8) {
      setjoinButtonActive(true);
    } else {
      setjoinButtonActive(false);
    }
  }, [email, password]);

  const createUser = useCallback(async () => {
    const result = await signUp(email, password);

    if (result?.token) {
      if (confirm("가입이 완료되었습니다. 로그인 하시겠습니까?")) {
        router.replace("/auth/login");
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
            disabled={!joinButtonActive}
            className={`tw-border ${
              joinButtonActive ? `tw-border-black` : `tw-text-gray-300`
            } tw-px-12 tw-py-2`}
            onClick={createUser}
          >
            가입하기
          </button>
        </div>
      </div>
    </>
  );
};

Join.getLayout = function getLayout(page) {
  return (
    <>
      <AppHeaderPage title="회원가입" />
      <main>{page}</main>
      <AppFooterBasic />
    </>
  );
};

export default Join;
