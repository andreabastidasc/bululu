"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/session";

export function SignOutButton() {
    const router = useRouter();

    async function onClick() {
        await signOut();
        router.refresh();
    }

    return (
        <button type="button" onClick={onClick} className="cursor-pointer font-bold underline">
            Salir
        </button>
    );
}
