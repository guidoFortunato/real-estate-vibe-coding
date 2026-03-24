import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "./AdminNav";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin";
  const userAvatar = user.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen bg-background-light font-sans antialiased text-nordic-dark flex flex-col">
      <AdminNav userName={userName} userAvatar={userAvatar} />
      {children}
    </div>
  );
}
