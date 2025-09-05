"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  occupation?: string;
  hobbies?: string[];
  family?: string;
};

export default function UserPage() {
  // Read the dynamic route param /user/[id]
  const params = useParams<{ id: string }>();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  // Loading / data state
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Form state
  const [occupation, setOccupation] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [family, setFamily] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Fetch the user once when we have an id
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/users/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User = await res.json();
        setUser(data);
        // initialize the form fields
        setOccupation(data.occupation ?? "");
        setHobbies((data.hobbies ?? []).join(", "));
        setFamily(data.family ?? "");
        setStatus("ready");
      } catch (e) {
        console.error("Failed to load user", e);
        setStatus("error");
      }
    })();
  }, [id]);

  async function save() {
    if (!user) return;
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occupation: occupation.trim(),
          hobbies: hobbies
            .split(",")
            .map((h) => h.trim())
            .filter(Boolean),
          family: family.trim(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated: User = await res.json();
      setUser(updated);
      setMsg("Saved!");
    } catch (e) {
      console.error("Save failed", e);
      setMsg("Save failed");
    } finally {
      setSaving(false);
    }
  }

  // Loading & error UI
  if (status === "loading") {
    return (
      <main style={{ padding: 24 }}>
        <Link href="/" style={{ textDecoration: "underline", fontSize: 13 }}>
          ← Back
        </Link>
        <p style={{ marginTop: 12 }}>Loading…</p>
      </main>
    );
  }

  if (status === "error" || !user) {
    return (
      <main style={{ padding: 24 }}>
        <Link href="/" style={{ textDecoration: "underline", fontSize: 13 }}>
          ← Back
        </Link>
        <p style={{ marginTop: 12 }}>User not found.</p>
      </main>
    );
  }

  // Main UI
  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <Link href="/" style={{ textDecoration: "underline", fontSize: 13 }}>
        ← Back
      </Link>

      <h1 style={{ fontSize: 24, fontWeight: 600, marginTop: 12 }}>
        {user.name}
      </h1>
      <p style={{ color: "#666" }}>{user.email}</p>

      <section
        style={{
          marginTop: 16,
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <div>
          <strong>Occupation:</strong> {user.occupation || "—"}
        </div>
        <div>
          <strong>Hobbies:</strong> {user.hobbies?.join(", ") || "—"}
        </div>
        <div>
          <strong>Family:</strong> {user.family || "—"}
        </div>
      </section>

      <section
        style={{
          marginTop: 16,
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Edit info
        </h2>

        <label style={{ display: "block", marginBottom: 8 }}>
          <div>Occupation</div>
          <input
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <div>Hobbies (comma-separated)</div>
          <input
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          <div>Family</div>
          <input
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          />
        </label>

        <button
          onClick={save}
          disabled={saving}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            cursor: "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        {msg && (
          <div
            style={{
              marginTop: 8,
              color: msg === "Saved!" ? "green" : "crimson",
              fontSize: 13,
            }}
          >
            {msg}
          </div>
        )}
      </section>
    </main>
  );
}
