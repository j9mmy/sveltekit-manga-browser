import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age"),
});

export const users_manga = sqliteTable("user_manga", {
  userId: integer("user_id").references(() => users.id).notNull(),
  mangaId: integer("manga_id").notNull(),
  title: text("title").notNull(),
  status: text("status", { enum: ["planning", "reading", "completed", "dropped"], }),
  score: integer("score"),
}, (table) =>  ({
  pk: primaryKey({columns: [table.userId, table.mangaId]})
}));
