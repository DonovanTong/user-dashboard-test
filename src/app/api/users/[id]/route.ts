import { NextRequest } from "next/server";
import { getUserById, updateUser, User } from "@/lib/users";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;              
  const u = getUserById(id);
  if (!u) return new Response("Not found", { status: 404 });
  return Response.json(u);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;              
  const patch = (await req.json()) as Partial<User>;
  if ("id" in patch) delete (patch as any).id;

  const updated = updateUser(id, patch);
  if (!updated) return new Response("Not found", { status: 404 });
  return Response.json(updated);
}
