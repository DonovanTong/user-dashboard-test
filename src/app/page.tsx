"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const users = [
    { id: "1", name: "Ava", occupation: "Designer" },
    { id: "2", name: "Ben", occupation: "Engineer" },
    { id: "3", name: "Morgan", occupation: "Teacher" },
  ];

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) => u.name.toLowerCase().includes(term));
  }, [q, users]);

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
        User Dashboard
      </h1>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 16 }}>
        Type to filter by name
      </p>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search users..."
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          padding: 12,
          fontSize: 14,
          width: "100%",
          boxSizing: "border-box",
          marginBottom: 24,
        }}
      />

      <ul style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        {filtered.map((u) => (
          <li
            key={u.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <a href={`/user/${u.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ fontWeight: 500 }}>{u.name}</div>
              <div style={{ color: "#666", fontSize: 14 }}>{u.occupation}</div>
              <div style={{ marginTop: 8, fontSize: 13, textDecoration: "underline" }}>
                View details →
              </div>
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ color: "#666", fontSize: 14 }}>No users found</li>
        )}
      </ul>
    </main>
  );
}
