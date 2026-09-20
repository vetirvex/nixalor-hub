import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
} from "../../model/env";

class JwtService {
  constructor() {}

  async revokeUserTokens(userId: string) {}

  generateJWT(userId: string) {
    const accessToken = jwt.sign(userId, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as StringValue,
    });
    const refreshToken = jwt.sign(userId, JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN as StringValue,
    });

    return { accessToken, refreshToken };
  }
}

export { JwtService };
