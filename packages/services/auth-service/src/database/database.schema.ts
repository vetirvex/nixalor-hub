import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role").$type<"owner" | "admin" | "member">().notNull(),
});

const tokensTable = pgTable("tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  refreshToken: varchar("refresh_token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

type UserDB = typeof usersTable.$inferSelect;
type NewUserDB = typeof usersTable.$inferInsert;
type TokenDB = typeof tokensTable.$inferSelect;
type NewTokenDB = typeof tokensTable.$inferInsert;

export {
  usersTable,
  tokensTable,
  type UserDB,
  type NewUserDB,
  type TokenDB,
  type NewTokenDB,
};
