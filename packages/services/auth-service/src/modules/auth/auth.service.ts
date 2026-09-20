import bcrypt from "bcrypt";
import { JwtService } from "../jwt/jwt.service";
import { UsersService } from "../users/users.service";

class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const candidate = await this.usersService.findUserByEmail(email);

    if (!candidate) {
      throw new Error(`User ${email} not found`);
    }

    if (!bcrypt.compareSync(candidate.password, password)) {
      throw new Error(`Invalid password: ${password}`);
    }

    await this.jwtService.revokeUserTokens(candidate.id);
    const tokens = this.jwtService.generateJWT(candidate.id);

    return tokens;
  }
}

export { AuthService };
