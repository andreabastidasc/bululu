function csrfToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
}

async function sessionRequest(method: "GET" | "POST" | "DELETE", body?: object): Promise<Response> {
    return fetch("/api/session/", {
        method,
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            ...(method === "GET" ? {} : { "X-CSRFToken": csrfToken() }),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
}

export async function signIn(username: string, password: string): Promise<string | null> {
    if (!csrfToken()) await sessionRequest("GET");
    const response = await sessionRequest("POST", { username, password });
    if (response.ok) return null;
    const data = (await response.json().catch(() => null)) as { detail?: string } | null;
    return data?.detail ?? "No pudimos iniciar sesión. Prueba de nuevo.";
}

export async function signOut(): Promise<void> {
    await sessionRequest("DELETE");
}
