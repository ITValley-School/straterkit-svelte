import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { notificationData } from "$lib/store/notificationStore";
import { userData } from "$lib/store/userStore";
import { variables } from "$lib/utils/constants";
import { formatText } from "$lib/formats/formatString";
import { redirect } from "@sveltejs/kit";

/**
 * Retrieve a value from localStorage if running in the browser.
 * @param {string} key - The key to retrieve from localStorage.
 * @returns {string|undefined} - The value from localStorage or undefined if not found.
 */
export const browserGet = (key) => {
  if (browser) {
    const item = localStorage.getItem(key);
    return item || undefined;
  }
  return undefined;
};

/**
 * Set a value in localStorage if running in the browser.
 * @param {string} key - The key to set in localStorage.
 * @param {string} value - The value to set in localStorage.
 */
export const browserSet = (key, value) => {
  if (browser) {
    localStorage.setItem(key, value);
  }
};

/**
 * Call a backend API with optional authentication and request body.
 * @param {Function} fetch - The fetch function.
 * @param {string} authToken - The authentication token.
 * @param {string} url - The API endpoint.
 * @param {string} [method="GET"] - The HTTP method.
 * @param {Object} [body] - The request body.
 * @returns {Promise<[Object|null, Object|null]>} - The response and error objects.
 */
export const callBackendAPI = async (
  fetch,
  authToken,
  url,
  method = "GET",
  body
) => {
  try {
    const headers = { Authorization: "" };

    if (body && !(body instanceof FormData)) {
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
    return res.ok ? [response, null] : [null, response];
  } catch (error) {
    console.error(error);
    return [{}, { detail: `${error}` }];
  }
};

/**
 * Fetch the current user data from the backend.
 * @param {Function} fetch - The fetch function.
 * @param {string} userUrl - The user endpoint.
 * @param {string} token - The authentication token.
 * @returns {Promise<[Object, Array]>} - The user data and errors.
 */
export const getCurrentUser = async (fetch, userUrl) => {
  const token = browserGet("refreshToken");

  const res = await fetch(`${variables.BASE_API_URI}${userUrl}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw redirect(302, "/login");

  const response = await res.json();
  return [response, []];
};

/**
 * Log out the user by invalidating tokens and clearing localStorage.
 */
export const logOutUser = async () => {
  try {
    const refreshToken = browserGet("refreshToken");

    // Refresh the access token
    const res = await fetch(`${variables.BASE_API_URI}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    const accessRefresh = await res.json();

    // Log out the user
    const jres = await fetch(`${variables.BASE_API_URI}/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessRefresh.access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (jres.status !== 204) {
      const data = await jres.json();
      throw { id: data.user.error[0].id, message: data.user.error[0] };
    }

    localStorage.removeItem("refreshToken");
    userData.set({});
    notificationData.update(() => "You have successfully logged out...");
    await goto("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

/**
 * Handle POST or PATCH requests with permissions.
 * @param {Function} fetch - The fetch function.
 * @param {string} targetUrl - The target API endpoint.
 * @param {Object} body - The request body.
 * @param {string} [method="POST"] - The HTTP method.
 * @returns {Promise<[Object, Array]>} - The response and errors.
 */
export const handlePostRequestsWithPermissions = async (
  fetch,
  targetUrl,
  body,
  method = "POST"
) => {
  try {
    // Refresh the access token
    const res = await fetch(`${variables.BASE_API_URI}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: browserGet("refreshToken") }),
    });
    const accessRefresh = await res.json();

    // Make the actual request
    const jres = await fetch(targetUrl, {
      method,
      headers: {
        Authorization: `Bearer ${accessRefresh.access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await jres.json();
    if (
      (method === "PATCH" && jres.status !== 200) ||
      (method === "POST" && jres.status !== 201)
    ) {
      return [{}, response.errors || []];
    }
    return [response, []];
  } catch (error) {
    console.error("Request failed:", error);
    return [{}, [{ error: "An unknown error occurred." }]];
  }
};

/**
 * Update a specific field for a user or other entity.
 * @param {string} fieldName - The name of the field to update.
 * @param {string} fieldValue - The new value for the field.
 * @param {string} url - The API endpoint.
 * @returns {Promise<[Object, Array]>} - The response and errors.
 */
export const UpdateField = async (fieldName, fieldValue, url) => {
  const formData = url.includes("/user/")
    ? { user: { [fieldName]: fieldValue } }
    : { [fieldName]: fieldValue };

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
