import { callBackendAPI } from "$lib/utils/requestUtils.js";

export const updateUserData = async (userData, file) => {
  // Preparing form data for API call
  const formData = new FormData();
  formData.append(
    "info",
    JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      newPassword: userData.newPassword,
      confirmPassword: userData.confirmPassword,
    })
  );
  if (file) formData.append("file", file);

  // Making API call to update user data
  return await callBackendAPI(fetch, null, "/authors", "PUT", formData);
};
