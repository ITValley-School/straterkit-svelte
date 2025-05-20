import { callBackendAPI } from "$lib/utils/requestUtils.js";

export const getBooks = async () => {
  return await callBackendAPI(fetch, null, "/books", "GET");
};

export const getChaptersByBookId = async (bookId) => {
  return await callBackendAPI(
    fetch,
    null,
    `/chapters/get_all_by_book_id/${bookId}`,
    "GET"
  );
};

export const addChapter = async (bookId) => {
  return await callBackendAPI(fetch, null, "/chapters", "POST", { bookId });
};

export const createBook = async (formData) => {
  const formDataToSend = new FormData(); // Create FormData object
  formDataToSend.append(
    "info",
    JSON.stringify({
      Title: formData.titulo,
      SubTitle: formData.subtitulo,
      CategoryID: formData.categoria,
      LanguageID: formData.idioma,
      Audience: formData.publico,
      Description: formData.descricao,
      CoAuthors: formData.coautores,
    })
  );
  formDataToSend.append("file", formData.capa); // Append cover image

  return await callBackendAPI(fetch, null, "/books", "POST", formDataToSend);
};

export const changeStatus = async (bookId, status) => {
  return await callBackendAPI(
    fetch,
    null,
    `/books/${bookId}/change_status`,
    "POST",
    { status }
  );
};

export const deleteBook = async (bookId) => {
  return await callBackendAPI(fetch, null, `/books/${bookId}`, "DELETE");
};
