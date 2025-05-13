import { callBackendAPI } from "$lib/utils/requestUtils.js";

export const load = async ({ fetch, cookies }) => {
  const [books] = await callBackendAPI(
    fetch,
    cookies.get("refreshToken"),
    "/books",
    "GET"
  );

  let topics = [];

  if (books.length > 0)
    [topics] = await callBackendAPI(
      fetch,
      cookies.get("refreshToken"),
      `/chapters/get_all_by_book_id/${books[0].BookID}`,
      "GET"
    );

  return { books, topics };
};
