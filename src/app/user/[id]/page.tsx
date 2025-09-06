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
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const [occupation, setOccupation] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [family, setFamily] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/users/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User = await res.json();
        setUser(data);
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
          hobbies: hobbies.split(",").map((h) => h.trim()).filter(Boolean),
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

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <Link href="/" className="text-sm underline">← Back</Link>
        <p className="mt-3">Loading…</p>
      </main>
    );
  }

  if (status === "error" || !user) {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <Link href="/" className="text-sm underline">← Back</Link>
        <p className="mt-3">User not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <Link href="/" className="text-sm underline">← Back</Link>

      <h1 className="mt-3 text-2xl font-semibold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>

      <section className="mt-4 space-y-2 rounded-lg border border-gray-200 p-4">
        <div>
          <div className="text-xs uppercase text-gray-500">Occupation</div>
          <div>{user.occupation || "—"}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-gray-500">Hobbies</div>
          <div>{user.hobbies?.join(", ") || "—"}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-gray-500">Family</div>
          <div>{user.family || "—"}</div>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-gray-200 p-4">
        <h2 className="mb-3 text-lg font-medium">Edit info</h2>

        <label className="mb-3 block">
          <span className="text-sm text-gray-700">Occupation</span>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-gray-400"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>

        <label className="mb-3 block">
          <span className="text-sm text-gray-700">Hobbies (comma-separated)</span>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-gray-400"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </label>

        <label className="mb-4 block">
          <span className="text-sm text-gray-700">Family</span>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-gray-400"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
        </label>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        {msg && (
          <div className={`mt-2 text-sm ${msg === "Saved!" ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </div>
        )}
      </section>
    </main>
  );
}
