import { z } from "zod";
import { Tokens } from "../jwt/jwt.schema";

type SafeUser = {
  id: string;
  email: string;
  name: string;
};

const loginSchema = {
  body: z.object({
    email: z.email("Invalid email address"),
    password: z
      .string("Password cannot be empty")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be at most 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  }),
};

const registerSchema = {
  body: z.object({
    email: z.email("Invalid email address"),
    password: z
      .string("Password cannot be empty")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be at most 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    name: z.string("User name cannot be empty"),
  }),
};

const refreshSchema = {
  body: z.object({
    refreshToken: z
      .string("Refresh token cannot be empty")
      .regex(
        /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
        "Invalid refresh token format"
      ),
  }),
};

type LoginBody = z.infer<typeof loginSchema.body>;
type LoginResponse = Tokens & {
  user: SafeUser;
};
type RegisterBody = z.infer<typeof registerSchema.body>;
type RegisterResponse = Tokens & {
  user: SafeUser;
};

type RefreshBody = z.infer<typeof refreshSchema.body>;
type RefreshResponse = Tokens;

export {
  loginSchema,
  registerSchema,
  refreshSchema,
  type LoginBody,
  type LoginResponse,
  type RegisterBody,
  type RegisterResponse,
  type RefreshBody,
  type RefreshResponse,
  type SafeUser,
};
