"use server";

import { authenticateAdmin, endAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  if (!(await authenticateAdmin(username, password))) redirect("/admin/login?error=1");
  redirect("/admin/briefings");
}

export async function logoutAction() {
  await endAdminSession();
  redirect("/admin/login");
}
