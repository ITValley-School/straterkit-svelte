import { callBackendAPI } from "$lib/utils/requestUtils.js";

export const changeOrder = async (
  sourcePath,
  destinationPath,
  bookId,
  index
) => {
  return await callBackendAPI(fetch, null, `/topics/change_order`, "POST", {
    sourcePath,
    destinationPath,
    bookId,
    index,
  });
};

export const improveWithAI = async (selectedTopicId, indexPath) => {
  return await callBackendAPI(
    fetch,
    null,
    `/topics/${selectedTopicId}/improve_with_ai`,
    "POST",
    { indexPath }
  );
};

export const uploadFile = async (file, indexPath, selectedTopicId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("info", JSON.stringify({ indexPath }));

  return await callBackendAPI(
    fetch,
    null,
    `/topics/${selectedTopicId}/upload_file`,
    "POST",
    formData
  );
};

export const topicInfoSave = async (selectedTopicId, data) => {
  return await callBackendAPI(
    fetch,
    null,
    `/topics/${selectedTopicId}`,
    "PUT",
    data
  );
};

export const getSelectedTopic = async (topicId, params) => {
  return await callBackendAPI(
    fetch,
    null,
    `/topics/${topicId}?${params.toString()}`,
    "GET"
  );
};

export const deleteTopic = async (topicId, data) => {
  return await callBackendAPI(
    fetch,
    null,
    `/topics/${topicId}`,
    "DELETE",
    data
  );
};

export const addTopic = async (topicId, data) => {
  return await callBackendAPI(fetch, null, `/topics/${topicId}`, "POST", data);
};
