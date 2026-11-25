import { SignOutButton } from "@/components/molecules/SignOutButton";
import { backOfficeUrl } from "@/lib/api";

export function AdminBar({ username }: { username: string | null }) {
    return (
        <div className="border-b-3 border-ink bg-lemon text-[15px]">
            <div className="wrap flex flex-wrap items-center gap-x-5 gap-y-1 py-2">
                <p className="font-medium">
                    <strong>Modo equipo{username && ` · ${username}`}</strong>: también ves los borradores.
                </p>
                <a href={backOfficeUrl} className="ml-auto font-bold underline">
                    Back office
                </a>
                <SignOutButton />
            </div>
        </div>
    );
}
