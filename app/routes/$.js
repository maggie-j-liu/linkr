import db from "~/utils/database.mjs";
import { redirect } from "remix";
export const loader = async ({ request, params }) => {
  const parts = params["*"].split("/");
  const [slug, ...rest] = parts;
  const item = await db.get(slug);
  if (!item) {
    return redirect("/");
  }
  await db.update(
    {
      clicks: db.util.increment(1),
    },
    slug
  );
  return redirect(
    `${item.url}/${rest.join("/")}${new URL(request.url).search ?? ""}`
  );
};
