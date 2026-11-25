"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { signIn } from "@/lib/session";

const inputClass =
    "min-h-13 rounded-2xl border-3 border-ink bg-paper px-4 text-lg outline-none focus-visible:shadow-hard-sm";

export function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setSending(true);
        setError(null);
        const problem = await signIn(String(form.get("username")), String(form.get("password")));
        setSending(false);
        if (problem) {
            setError(problem);
            return;
        }
        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 font-bold">
                Usuario
                <input name="username" autoComplete="username" required className={inputClass} />
            </label>
            <label className="flex flex-col gap-2 font-bold">
                Contraseña
                <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={inputClass}
                />
            </label>
            {error && (
                <p role="alert" className="rounded-2xl border-3 border-ink bg-coral px-4 py-3 font-bold">
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={sending}
                className="min-h-14 cursor-pointer rounded-full border-3 border-ink bg-ink px-7.5 text-lg font-bold text-paper disabled:cursor-wait disabled:opacity-70"
            >
                {sending ? "Entrando…" : "Entrar"}
            </button>
        </form>
    );
}
