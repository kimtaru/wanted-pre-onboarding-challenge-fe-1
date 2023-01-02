import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AppFooterBasic from "../components/layout/app-footer-basic";
import AppHeaderBasic from "../components/layout/app-header-basic";
import { getTodoById, updateTodo } from "../lib/apis";
import useTodo from "../hooks/useTodo";

const EditTodo = () => {
  const { mutate } = useTodo();
  const router = useRouter();
  const { todoId } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchTodo() {
      const response = await getTodoById(todoId);
      if (response.details) {
        router.push("/");
      } else {
        setTitle(response.data.title);
        setContent(response.data.content);
      }
    }
    fetchTodo();
  }, [todoId, router]);

  const init = useCallback(() => {
    setTitle("");
    setContent("");
  }, []);

  const updateItem = useCallback(async () => {
    if (!title) {
      alert("제목을 입력하세요.");
      return false;
    }
    if (!content) {
      alert("상세를 입력하세요.");
      return false;
    }

    const result = await updateTodo(todoId, title, content);
    if (result.data) {
      mutate();
      router.replace("/");
    }
  }, [title, content, router, mutate, todoId]);

  return (
    <div className="tw-py-8 tw-px-2">
      <div>
        <p className="tw-text-xl tw-px-2">할 일 수정하기</p>
      </div>
      <div className="tw-py-6 tw-px-2">
        <input
          className="tw-border tw-border-black tw-rounded-lg tw-p-2 tw-w-full"
          placeholder="할 일이 무엇인가요?"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="상세한 내용을 입력하세요."
          className="tw-border tw-border-black tw-w-full tw-p-2 tw-mt-4 tw-rounded-lg"
        />
      </div>
      <div className="tw-p-2">
        <button
          onClick={updateItem}
          className="tw-bg-black tw-text-white tw-font-bold tw-px-6 tw-py-2"
        >
          수정하기
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

EditTodo.getLayout = function getLayout(page) {
  return (
    <>
      <AppHeaderBasic />
      <main>{page}</main>
      <AppFooterBasic />
    </>
  );
};

export default EditTodo;

/*
 * F5로 새로고침 했을 시 쿼리스트링의 데이터 ID가 휘발되는 증상을 방지하기 위함
 */
export async function getServerSideProps({ query: { todoId } }) {
  return {
    props: {
      todoId,
    },
  };
}
