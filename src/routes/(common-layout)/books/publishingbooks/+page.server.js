import { callBackendAPI } from "$lib/utils/requestUtils.js";

export const load = async ({ fetch, cookies }) => {
  const [books] = await callBackendAPI(
    fetch,
    cookies.get("refreshToken"),
    "/books",
    "GET"
  );

  return { books };
};
