"use client";

export default function UserPage({ params }: { params: { id: string } }) {
  return <ClientUser id={params.id} />;
}

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  occupation?: string;
  hobbies?: string[];
  family?: string;
};

function ClientUser({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/users/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User = await res.json();
        setUser(data);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    })();
  }, [id]);

  if (status === "loading") {
    return <main style={{ padding: 24 }}>Loading…</main>;
  }
  if (status === "error" || !user) {
    return <main style={{ padding: 24 }}>User not found.</main>;
  }

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <a href="/" style={{ textDecoration: "underline", fontSize: 13 }}>← Back</a>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginTop: 12 }}>{user.name}</h1>
      <p style={{ color: "#666" }}>{user.email}</p>

      <section style={{ marginTop: 16, border: "1px solid #e5e5e5", borderRadius: 8, padding: 16 }}>
        <div><strong>Occupation:</strong> {user.occupation || "—"}</div>
        <div><strong>Hobbies:</strong> {user.hobbies?.join(", ") || "—"}</div>
        <div><strong>Family:</strong> {user.family || "—"}</div>
      </section>
    </main>
  );
}
