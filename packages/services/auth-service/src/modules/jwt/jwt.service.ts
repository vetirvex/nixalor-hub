import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import ms from "ms";
import { database, DB } from "../../database/database";
import { NewTokenDB, TokenDB, tokensTable } from "../../database/database.schema";
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
} from "../../model/env";
import { InvalidTokenError, TokenExpiredError } from "../auth/auth.error";
import { Tokens } from "./jwt.schema";

class JwtService {
  constructor() {}

  generateJWT(userId: string): Tokens {
    const accessToken = jwt.sign({ userId }, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as StringValue,
    });
    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN as StringValue,
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string, db: DB = database) {
    const expiresAt = new Date(Date.now() + ms(JWT_REFRESH_TOKEN_EXPIRES_IN));

    const candidate = (
      await db.select().from(tokensTable).where(eq(tokensTable.userId, userId))
    )[0];

    if (candidate) {
      await db
        .update(tokensTable)
        .set({ refreshToken, expiresAt })
        .where(eq(tokensTable.userId, userId));
    } else {
      const token: NewTokenDB = {
        userId,
        refreshToken,
        expiresAt,
      };
      await db.insert(tokensTable).values(token);
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<void> {
    try {
      jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredError();
      }
      if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.NotBeforeError) {
        throw new InvalidTokenError();
      }
      throw err;
    }
  }

  async getTokenByRefreshToken(
    refreshToken: string,
    db: DB = database
  ): Promise<TokenDB | undefined> {
    return (
      await db
        .select()
        .from(tokensTable)
        .where(eq(tokensTable.refreshToken, refreshToken))
    )[0];
  }

  async deleteToken(tokenId: string, db: DB = database): Promise<void> {
    await db.delete(tokensTable).where(eq(tokensTable.id, tokenId));
  }
}

export { JwtService };
