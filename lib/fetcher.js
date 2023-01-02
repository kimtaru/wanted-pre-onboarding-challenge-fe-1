export const fetcher = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("user-token"),
    },
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};
