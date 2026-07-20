"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "protected_unlocked";
const ENV_VAR = "UNLOCK_PASSWORD";

function expectedToken(password: string) {
  return createHash("sha256").update(`protected:${password}`).digest("hex");
}

export async function isProjectUnlocked(_slug?: string) {
  const password = process.env[ENV_VAR];
  if (!password) return true;

  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  return token === expectedToken(password);
}

export async function unlockProject(
  slug: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const password = process.env[ENV_VAR];
  const attempt = formData.get("password");

  if (!password || typeof attempt !== "string" || attempt !== password) {
    return { error: "Incorrect password." };
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, expectedToken(password), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(`/${slug}`);
}
