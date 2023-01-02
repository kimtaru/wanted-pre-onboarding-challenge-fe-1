import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function useTodo() {
  const { data, mutate, error } = useSWR(
    "http://localhost:8080/todos",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const loading = !data && !error;
  return {
    loading,
    todos: data,
    mutate,
  };
}
