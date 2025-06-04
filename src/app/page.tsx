import { redirect } from "next/navigation";

export default function Home() {
  redirect("/tribute");
  return null;
}
