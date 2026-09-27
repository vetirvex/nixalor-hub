import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import ms from "ms";
import { database } from "../../database/database";
import { NewTokenDB, tokensTable } from "../../database/database.schema";
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
} from "../../model/env";
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

  async saveRefreshToken(userId: string, refreshToken: string) {
    const token: NewTokenDB = {
      userId,
      refreshToken,
      expiresAt: new Date(Date.now() + ms(JWT_REFRESH_TOKEN_EXPIRES_IN)),
    };
    await database.insert(tokensTable).values(token);
  }
}

export { JwtService };
