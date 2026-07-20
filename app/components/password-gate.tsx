"use client";

import { useActionState } from "react";
import { FaLock } from "react-icons/fa";
import { unlockProject } from "../actions/unlock-project";

export function PasswordGate({
  slug,
  variant = "page",
}: {
  slug: string;
  variant?: "page" | "card";
}) {
  const action = unlockProject.bind(null, slug);
  const [state, formAction, pending] = useActionState<
    { error?: string } | undefined,
    FormData
  >(action, undefined);

  if (variant === "card") {
    return (
      <div className="relative aspect-[5/6] lg:aspect-[5/4] rounded-lg overflow-hidden border border-zinc-800/10 bg-zinc-900 flex items-center justify-center">
        <form
          action={formAction}
          className="flex flex-col items-center gap-3 px-6 w-full"
        >
          <FaLock className="size-5 text-zinc-500" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full max-w-[180px] text-center bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            disabled={pending}
            className="text-xs font-mono uppercase tracking-wide text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
          >
            {pending ? "Checking…" : "Unlock"}
          </button>
          {state?.error && (
            <p className="text-xs text-red-400">{state.error}</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <FaLock className="size-6 text-zinc-400" />
      <p className="text-lg font-medium">This case study is password-protected.</p>
      <form action={formAction} className="flex flex-col items-center gap-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          className="w-64 text-center bg-zinc-100 dark:bg-zinc-900 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button
          type="submit"
          disabled={pending}
          className="button text-sm disabled:opacity-50"
        >
          {pending ? "Checking…" : "Unlock"}
        </button>
        {state?.error && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}
      </form>
    </div>
  );
}
