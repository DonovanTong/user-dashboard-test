import { NextRequest } from "next/server";
import { getUserById, updateUser, User } from "@/lib/users";

export async function GET(_: NextRequest, ctx: { params: { id: string } }) {
  const u = getUserById(ctx.params.id);
  if (!u) return new Response("Not found", { status: 404 });
  return Response.json(u);
}

export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  const patch = (await req.json()) as Partial<User>;
  if ("id" in patch) delete (patch as any).id;
  const updated = updateUser(ctx.params.id, patch);
  if (!updated) return new Response("Not found", { status: 404 });
  return Response.json(updated);
}