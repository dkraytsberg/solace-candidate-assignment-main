import { ilike, or } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const filterTerm = `%${filter}%`;
  const advocateFilter = filter
    ? or(
        ilike(advocates.firstName, filterTerm),
        ilike(advocates.lastName, filterTerm),
        ilike(advocates.city, filterTerm),
        ilike(advocates.degree, filterTerm)
        // TODO: filter specialties jsonb column
        // TODO: filter yearsOfExperience
      )
    : undefined;

  const data = await db.select().from(advocates).where(advocateFilter);

  return Response.json({ data });
}
