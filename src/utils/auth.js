import { hash, compare } from "bcryptjs";

async function hashPassword(password) {
  const hashedPass = await hash(password, 12);
  return hashedPass;
}

async function verifyPassword(pass, hashedPass) {
  const isValid = await compare(pass, hashedPass);
  return isValid;
}

export { hashPassword, verifyPassword };
