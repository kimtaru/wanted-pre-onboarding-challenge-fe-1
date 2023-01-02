import TodoItem from "./todo-item";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import useTodo from "../hooks/useTodo";
import { deleteTodo } from "../lib/apis";

export default function TodoList() {
  const { todos, loading, mutate } = useTodo();

  if (loading) {
    return false;
  }

  const deleteItem = async (id) => {
    const result = await deleteTodo(id);

    if (result) {
      mutate();
    }
  };

  return (
    <div className="tw-w-full tw-px-4 tw-pt-16 tw-relative">
      <h1 className="tw-font-bold">할 일 목록</h1>
      {todos.data.length > 0
        ? todos.data.map((v) => {
            return <TodoItem key={v.id} todo={v} deleteItem={deleteItem} />;
          })
        : null}

      <div className="tw-mx-auto tw-w-full tw-max-w-md tw-rounded-2xl tw-bg-white p-2"></div>

      <Link href="/new-todo">
        <PlusCircleIcon className="tw-cursor-pointer tw-absolute tw-top-5 tw-right-4 tw-w-12 tw-h-12 tw-rounded-full tw-text-gray-400 tw-text-center tw-align-middle" />
      </Link>
    </div>
  );
}
