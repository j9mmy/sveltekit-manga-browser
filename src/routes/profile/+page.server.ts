import { db } from "$lib/server/db";
import { users, users_manga } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { eq, desc } from "drizzle-orm";

export const load = (async () => {
  const promise = async () => {
    const [user] = await db.select().from(users).limit(1);
    if (!user) error(404, { message: "User was not found" });
    console.log(user);

    let listEntries = await db
      .select()
      .from(users_manga)
      .where(eq(users_manga.userId, user.id))
      .orderBy(desc(users_manga.score));
    if (!listEntries) error(404, { message: "List entries were not found" });

    listEntries.sort((a, b) => {
      const order = {
        planning: 1,
        reading: 2,
        completed: 3,
        dropped: 4,
        null: 5,
      };

      return order[a.status ?? "null"] - order[b.status ?? "null"];
    });

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
