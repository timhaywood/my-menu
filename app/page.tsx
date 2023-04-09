import { groq } from "next-sanity";
import { clientFetch } from "../lib/clientFetch";
import { MenuList } from "./MenuList";
import type { Meal } from "@/schemas/meal";

const query = groq`*[_type == 'meal']`;

export default async function Home() {
  const data: Meal[] = await clientFetch(query, { next: { revalidate: 60 } });

  return (
    <main className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl pb-6">My Menu</h1>
      <MenuList data={data} />
    </main>
  );
}
