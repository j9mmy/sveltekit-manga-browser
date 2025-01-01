import { db } from "$lib/server/db";
import { users, users_manga } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";

export const load = (async () => {
  const promise = async () => {
    const [user] = await db.select().from(users).limit(1);
    if (!user) error(404, { message: "User was not found" });
    console.log(user);

    const listEntries = await db
      .select()
      .from(users_manga)
      .where(eq(users_manga.userId, user.id));
    if (!listEntries) error(404, { message: "List entries were not found" });
    console.log(listEntries);

    return {
      listEntries,
      user,
    };
  };

  return {
    promise: promise(),
  };
}) satisfies PageServerLoad;
