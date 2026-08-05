"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "../actions";

const initialState: LoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Panel de administración
        </h1>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-orange-400"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-neutral-200">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-orange-400"
          />
        </div>

        {state.error && (
          <p role="alert" className="text-sm font-medium text-red-400">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 text-base font-semibold text-white transition hover:from-orange-400 hover:to-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </main>
  );
}
