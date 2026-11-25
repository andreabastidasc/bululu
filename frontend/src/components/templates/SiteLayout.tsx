import type { ReactNode } from "react";
import { AdminBar } from "@/components/organisms/AdminBar";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { getSession } from "@/lib/api";

export async function SiteLayout({ children }: { children: ReactNode }) {
    const session = await getSession();

    return (
        <>
            {session.is_staff && <AdminBar username={session.username} />}
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
