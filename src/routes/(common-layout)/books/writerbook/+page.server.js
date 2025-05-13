import { callBackendAPI } from "$lib/utils/requestUtils.js";

export const load = async ({ fetch, cookies, url }) => {
  const bookId = url.searchParams.get("book_id");

  const [books] = await callBackendAPI(
    fetch,
    cookies.get("refreshToken"),
    "/books",
    "GET"
  );

  let topics = [];

  const currentBookId = bookId ? parseInt(bookId) : books[0].BookID;

  if (books.length > 0)
    [topics] = await callBackendAPI(
      fetch,
      cookies.get("refreshToken"),
      `/chapters/get_all_by_book_id/${currentBookId}`,
      "GET"
    );

  return { books, topics, currentBookId };
};
