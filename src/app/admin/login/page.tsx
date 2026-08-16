import { hasAdminConfiguration, isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAction } from "../actions";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) redirect("/admin/briefings");
  const { error } = await searchParams;
  const configured = hasAdminConfiguration();
  return <section className="admin-login-card">
    <p className="eyebrow">Fortunato Brands</p>
    <h1>Acesso interno</h1>
    <p>Consulte os briefings recebidos com acesso restrito à equipe.</p>
    {!configured ? <p className="admin-error">O acesso administrativo não está configurado.</p> : null}
    {error ? <p className="admin-error" role="alert">Não foi possível validar estas credenciais.</p> : null}
    <form action={loginAction} className="admin-form">
      <label>Usuário<input name="username" autoComplete="username" required /></label>
      <label>Senha<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="button" type="submit" disabled={!configured}>Entrar</button>
    </form>
  </section>;
}
