import { eq } from "drizzle-orm";
import { database } from "../../database/database";
import { UserDB, usersTable } from "../../database/database.schema";

class UsersService {
  constructor() {}

  async findUserByEmail(email: string): Promise<UserDB | undefined> {
    return (
      await database.select().from(usersTable).where(eq(usersTable.email, email))
    )[0];
  }
}

export { UsersService };
