import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { notificationData } from "$lib/store/notificationStore";
import { userData } from "$lib/store/userStore";

import { variables } from "$lib/utils/constants";
import { formatText } from "$lib/formats/formatString";
import { redirect } from "@sveltejs/kit";

export const browserGet = (key) => {
  if (browser) {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    }
  }
  return undefined;
};

export const browserSet = (key, value) => {
  if (browser) {
    localStorage.setItem(key, value);
  }
};

export const callBackendAPI = async (
  fetch,
  authToken,
  url,
  method = "GET",
  body
) => {
  try {
    const headers = {
      Authorization: "",
    };
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    const token = browserGet("refreshToken") || authToken;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${variables.BASE_API_URI}${url}`, {
      method,
      body,
      headers,
    });
    if (res.status === 401) await goto("/login");

    const response = await res.json();

    if (!res.ok) return [null, response];

    return [response, null];
  } catch (error) {
    console.log(error);
    const errors = [
      { error: "An unknown error occurred." },
      { error: `${error} ` },
    ];
    return [{}, errors];
  }
};

export const getCurrentUser = async (fetch, userUrl, token) => {
  const res = await fetch(`${variables.BASE_API_URI}${userUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw redirect(302, "/login");
  }
  const response = await res.json();
  return [response, []];
};

export const logOutUser = async () => {
  const res = await fetch(`${variables.BASE_API_URI}/token/refresh/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: `${browserGet("refreshToken")}`,
    }),
  });
  const accessRefresh = await res.json();
  const jres = await fetch(`${variables.BASE_API_URI}/logout/`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${accessRefresh.access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: `${browserGet("refreshToken")}`,
    }),
  });
  if (jres.status !== 204) {
    const data = await jres.json();
    const error = data.user.error[0];
    throw { id: error.id, message: error };
  }
  localStorage.removeItem("refreshToken");
  userData.set({});
  notificationData.update(() => "You have successfully logged out...");
  await goto("/login");
};

export const handlePostRequestsWithPermissions = async (
  fetch,
  targetUrl,
  body,
  method = "POST"
) => {
  const res = await fetch(`${variables.BASE_API_URI}/token/refresh/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: `${browserGet("refreshToken")}`,
    }),
  });
  const accessRefresh = await res.json();
  const jres = await fetch(targetUrl, {
    method: method,
    mode: "cors",
    headers: {
      Authorization: `Bearer ${accessRefresh.access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (method === "PATCH") {
    if (jres.status !== 200) {
      const data = await jres.json();
      console.error(`Data: ${data}`);
      const errs = data.errors;
      console.error(errs);
      return [{}, errs];
    }
    return [await jres.json(), []];
  } else if (method === "POST") {
    if (jres.status !== 201) {
      const data = await jres.json();
      console.error(`Data: ${data}`);
      const errs = data.errors;
      console.error(errs);
      return [{}, errs];
    }
    return [jres.json(), []];
  }
};

export const UpdateField = async (fieldName, fieldValue, url) => {
  const userObject = { user: {} };
  let formData;
  if (url.includes("/user/")) {
    formData = userObject;
    formData["user"][`${fieldName}`] = fieldValue;
  } else {
    formData[`${fieldName}`] = fieldValue;
  }

  const [response, err] = await handlePostRequestsWithPermissions(
    fetch,
    url,
    formData,
    "PATCH"
  );
  if (err.length > 0) {
    return [{}, err];
  }
  notificationData.update(
    () => `${formatText(fieldName)} has been updated successfully.`
  );
  return [response, []];
};
