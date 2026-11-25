export function formatDate(iso: string | null): string {
    if (!iso) return "";
    return new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
