export default function Home() {
  const users = [
    { id: "1", name: "Ava", occupation: "Designer" },
    { id: "2", name: "Ben", occupation: "Engineer" },
    { id: "3", name: "Morgan", occupation: "Teacher" },
  ];

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
        User Dashboard
      </h1>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 16 }}>
        Static list first. We’ll hook up the API after search works.
      </p>

      <ul style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        {users.map((u) => (
          <li
            key={u.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 500 }}>{u.name}</div>
            <div style={{ color: "#666", fontSize: 14 }}>{u.occupation}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
