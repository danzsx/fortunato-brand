import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "fortunato_admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function configuration() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return username && password && secret ? { username, password, secret } : null;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function secureEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function hasAdminConfiguration() {
  return Boolean(configuration());
}

export async function isAdminAuthenticated() {
  const config = configuration();
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!config || !token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) return false;
  return secureEqual(signature, sign(expiresAt, config.secret));
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

export async function authenticateAdmin(username: string, password: string) {
  const config = configuration();
  if (!config || !secureEqual(username, config.username) || !secureEqual(password, config.password)) {
    return false;
  }

  const expiresAt = String(Date.now() + SESSION_SECONDS * 1000);
  const value = `${expiresAt}.${sign(expiresAt, config.secret)}`;
  (await cookies()).set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
  return true;
}

export async function endAdminSession() {
  (await cookies()).set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 0,
  });
}
