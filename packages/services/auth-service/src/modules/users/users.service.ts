import { eq } from "drizzle-orm";
import { database } from "../../database/database";
import { NewUserDB, UserDB, usersTable } from "../../database/database.schema";

class UsersService {
  constructor() {}

  async findUserByEmail(email: string): Promise<UserDB | undefined> {
    return (
      await database.select().from(usersTable).where(eq(usersTable.email, email))
    )[0];
  }

  async createUser(email: string, password: string, name: string): Promise<UserDB> {
    const user: NewUserDB = {
      email,
      password,
      name,
      role: "owner",
    };
    return (await database.insert(usersTable).values(user).returning())[0]!;
  }
}

export { UsersService };
