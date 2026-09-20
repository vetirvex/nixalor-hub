import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../model/env";

const database = drizzle(DATABASE_URL);

export { database };
