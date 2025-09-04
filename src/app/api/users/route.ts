import { getUsers } from "../../../lib/users";

export async function GET() {
  return Response.json(getUsers());
}