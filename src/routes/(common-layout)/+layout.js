import { getCurrentUser } from "$lib/utils/requestUtils.js";

export const load = async ({ fetch }) => {
  const [user] = await getCurrentUser(fetch, "/auth/user");

  return { user };
};
