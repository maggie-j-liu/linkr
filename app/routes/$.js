import db from "~/utils/database.mjs";
import { json, redirect } from "remix";
export const loader = async ({ request, params }) => {
  const parts = params["*"].split("/");
  const [slug, ...rest] = parts;
  const item = await db.get(slug);
  if (!item) {
    return json("Not found", 404);
  }
  return redirect(
    `${item.url}/${rest.join("/")}${new URL(request.url).search ?? ""}`
  );
};
