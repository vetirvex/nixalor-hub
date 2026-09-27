import { eq } from "drizzle-orm";
import { database, DB } from "../../database/database";
import { NewUserDB, UserDB, usersTable } from "../../database/database.schema";

class UsersService {
  constructor() {}

  async findUserByEmail(email: string, db: DB = database): Promise<UserDB | undefined> {
    return (await db.select().from(usersTable).where(eq(usersTable.email, email)))[0];
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    db: DB = database
  ): Promise<UserDB> {
    const user: NewUserDB = {
      email,
      password,
      name,
      role: "owner",
    };
    return (await db.insert(usersTable).values(user).returning())[0]!;
  }
}

export { UsersService };
