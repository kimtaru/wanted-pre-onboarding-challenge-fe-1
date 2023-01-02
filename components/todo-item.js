import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

const TodoItem = ({ todo, deleteItem }) => {
  const router = useRouter();
  return (
    <>
      <Disclosure as="div" className="tw-mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="tw-flex tw-w-full tw-justify-between tw-rounded-lg tw-bg-purple-100 tw-px-4 tw-py-2 tw-text-left tw-text-sm tw-font-medium tw-text-purple-900 tw-hover:bg-purple-200 tw-focus:outline-none tw-focus-visible:ring tw-focus-visible:ring-purple-500 tw-focus-visible:ring-opacity-75">
              <p>
                {todo.title} <span></span>
              </p>

              <ChevronUpIcon
                className={`${
                  open ? "tw-rotate-180 tw-transform" : ""
                } tw-h-5 tw-w-5 tw-text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className=" tw-relative tw-px-4 tw-pt-4 tw-pb-2 tw-text-sm tw-text-gray-500">
              <XMarkIcon
                onClick={() => {
                  deleteItem(todo.id);
                }}
                className="tw-cursor-pointer tw-absolute tw-right-6 tw-top-5 tw-w-6 tw-h-6"
              />
              <PencilSquareIcon
                onClick={() => {
                  router.push(`/edit-todo?todoId=${todo.id}`);
                }}
                className="tw-cursor-pointer tw-absolute tw-right-12 tw-top-5 tw-w-6 tw-h-6"
              />
              <div className=" tw-w-3/4 tw-break-all">{todo.content}</div>
              <br />
              <p className=" tw-text-xs">
                {new Intl.DateTimeFormat("ko", { timeStyle: "medium" }).format(
                  new Date(todo.updatedAt)
                )}
              </p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default TodoItem;
