import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/organisms/LoginForm";
import { SiteLayout } from "@/components/templates/SiteLayout";
import { getSession } from "@/lib/api";

export const metadata: Metadata = {
    title: "Entrar",
    robots: { index: false, follow: false },
};

export default async function SignInPage() {
    const session = await getSession();
    if (session.is_staff) redirect("/");

    return (
        <SiteLayout>
            <section className="wrap mx-auto flex max-w-[480px] flex-col gap-6 py-14 md:py-20">
                <h1 className="font-display text-[48px] leading-none font-normal">Entrar</h1>
                <p className="text-ink-soft">Solo para el equipo del bululú.</p>
                <LoginForm />
            </section>
        </SiteLayout>
    );
}
