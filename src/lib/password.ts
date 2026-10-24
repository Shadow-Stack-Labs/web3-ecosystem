
import "server-only";
import argon2 from "argon2";

const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_MAX_LENGTH = 128;

export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string") {
    return "Password must be a string.";
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return "Password must contain at least 12 characters.";
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return "Password must not exceed 128 characters.";
  }

  return null;
}

export async function hashPassword(
  password: string
): Promise<string> {
  const error = validatePassword(password);

  if (error) {
    throw new Error(error);
  }

  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return argon2.verify(hash, password);
}
