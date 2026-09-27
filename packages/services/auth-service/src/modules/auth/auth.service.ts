import bcrypt from "bcrypt";
import { database } from "../../database/database";
import { JwtService } from "../jwt/jwt.service";
import { UsersService } from "../users/users.service";
import { InvalidCredentialError, UserAlreadyExistsError } from "./auth.error";
import { LoginResponse, RegisterResponse } from "./auth.schema";

class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const candidate = await this.usersService.findUserByEmail(email);

    if (!candidate) {
      throw new InvalidCredentialError();
    }

    if (!bcrypt.compareSync(password, candidate.password)) {
      throw new InvalidCredentialError();
    }

    const tokens = this.jwtService.generateJWT(candidate.id);
    await this.jwtService.saveRefreshToken(candidate.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: candidate.id,
        email: candidate.email,
        name: candidate.name,
      },
    };
  }

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> {
    return await database.transaction(async (tx) => {
      const candidate = await this.usersService.findUserByEmail(email, tx);

      if (candidate) {
        throw new UserAlreadyExistsError();
      }

      const user = await this.usersService.createUser(
        email,
        bcrypt.hashSync(password, 10),
        name,
        tx
      );
      const tokens = this.jwtService.generateJWT(user.id);
      await this.jwtService.saveRefreshToken(user.id, tokens.refreshToken, tx);
      return {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    });
  }
}

export { AuthService };
