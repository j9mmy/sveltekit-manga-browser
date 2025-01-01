// place files you want to import through the `$lib` alias in this folder.
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { users_manga, users } from "./server/db/schema";
import { faker } from "@faker-js/faker";

async function main() {
  await db.delete(users);
  await db.delete(users_manga);
  console.log("Previous records deleted");

  const fakeUser = Array.from({ length: 1 }, () => ({
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 80 }),
  }));

  await db.insert(users).values(fakeUser);
  console.log(`Created ${fakeUser.length} fake user(s)!`);

  /*
  const fakeUserManga = {
    userId: 1,
    mangaId: 108556, // 108556 is the id of the manga "SPY x FAMILY"
    status: "reading",
    score: 10,
  } as typeof users_manga.$inferInsert;

  await db.insert(users_manga).values(fakeUserManga);
  console.log("Created a fake user manga record!");

  const userRecords = await db.select().from(users);
  console.log("Users in the database: ", userRecords);

  const userMangaRecords = await db.select().from(users_manga);
  console.log("User manga records in the database: ", userMangaRecords);
  */
}

main().catch(console.error);
