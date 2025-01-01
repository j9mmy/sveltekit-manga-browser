import { db } from "$lib/server/db";
import { users_manga, users } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

// prettier-ignore
export const load: PageServerLoad = (async ({ params }) => {
  const mangaId = parseInt(params.id);

  // Selecting the first user from the database to simulate a logged-in user because no authentication is implemented
  const [user] = await db.select({ id: users.id }).from(users).limit(1);
  if (!user) console.warn("User was not found");

  const [userManga] = await db
    .select()
    .from(users_manga)
    .where(
      and(
        eq(users_manga.userId, user.id), 
        eq(users_manga.mangaId, mangaId)
      )
    )
    .limit(1);

  return {
    userManga
  };
}) satisfies PageServerLoad;

// prettier-ignore
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);

    // Selecting the first user from the database to simulate a logged-in user because no authentication is implemented
    const [user] = await db.select({ id: users.id }).from(users).limit(1);
    if (!user) fail(404, { message: "User was not found" });

    const mangaId = parseInt(formData.get("mangaId") as string);
    const title = formData.get("title") as string;
    const score = formData.get("score") ? parseInt(formData.get("score") as string) : null;
    const status = formData.get("status") == ""
        ? null 
        : formData.get("status") as "planning" | "reading" | "completed" | "dropped";

    if (!score && !status) {
      await db
        .delete(users_manga)
        .where(
          and(
            eq(users_manga.userId, user.id),
            eq(users_manga.mangaId, mangaId)
          )
        );
      
      return;
    }

    await db
      .insert(users_manga)
      .values({
        userId: user.id,
        mangaId,
        title,
        status,
        score
      })
      .onConflictDoUpdate({
        target: [users_manga.userId, users_manga.mangaId],
        set: {
          status,
          score
        }
      })
    
    return { success: true }
  }
} satisfies Actions;
