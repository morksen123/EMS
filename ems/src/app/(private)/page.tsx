import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Home() {
  const supabase = createClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">VibeVault</h1>
      <Button className="px-10">Hello</Button>
    </main>
  );
}
