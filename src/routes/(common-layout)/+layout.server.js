import { getCurrentUser } from "$lib/utils/requestUtils.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, cookies }) => {
  const token = cookies.get("refreshToken");

  if (!token) throw redirect(302, "/login");

  const [user] = await getCurrentUser(fetch, "/auth/user", token);

  return { user };
};
