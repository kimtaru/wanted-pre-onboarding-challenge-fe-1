import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import AppFooterBasic from "../components/layout/app-footer-basic";
import AppHeaderBasic from "../components/layout/app-header-basic";
import { createTodo } from "../lib/apis";
import useTodo from "../hooks/useTodo";

const NewTodo = () => {
  const { mutate } = useTodo();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const init = () => {
    setTitle("");
    setContent("");
  };

  const addItem = useCallback(async () => {
    if (!title) {
      alert("할일 제목을 입력하세요.");
      return false;
    }

    if (!content) {
      alert("할일 상세를 입력하세요");
      return false;
    }

    const result = await createTodo(title, content);
    if (result.data) {
      mutate();
      router.replace("/");
    }
  }, [title, content, router, mutate]);

  return (
    <div className="tw-py-8 tw-px-2">
      <div className="">
        <p className="tw-text-xl tw-px-2">할 일 추가하기</p>
      </div>
      <div className="tw-py-6 tw-px-2">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className="tw-border tw-border-black tw-rounded-lg tw-p-2 tw-w-full"
          placeholder="할 일이 무엇인가요?"
          type="text"
        />

        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          placeholder="상세한 내용을 입력하세요."
          className="tw-border tw-border-black tw-w-full tw-p-2 tw-mt-4 tw-rounded-lg"
        />
      </div>
      <div className="tw-p-2">
        <button
          onClick={addItem}
          className="tw-bg-black tw-text-white tw-font-bold tw-px-6 tw-py-2"
        >
          추가하기
        </button>
        <button
          onClick={init}
          className="tw-bg-blue-700 tw-text-white tw-font-bold tw-ml-2 tw-px-6 tw-py-2"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

NewTodo.getLayout = function getLayout(page) {
  return (
    <>
      <AppHeaderBasic />
      <main>{page}</main>
      <AppFooterBasic />
    </>
  );
};

export default NewTodo;
