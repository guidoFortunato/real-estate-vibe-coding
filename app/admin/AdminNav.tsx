"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminNav({ userName, userAvatar }: { userName: string; userAvatar?: string }) {
  const pathname = usePathname();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navItems = [
    { label: "Properties", href: "/admin/properties" },
    { label: "Users", href: "/admin/users" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-nordic/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-8 md:gap-12">
          <Link href="/admin/properties" className="shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-mosque text-2xl">apartment</span>
            <span className="font-bold text-lg text-nordic tracking-tight">LuxeEstate Admin</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-1 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-mosque border-b-2 border-mosque"
                      : "text-nordic/60 hover:text-mosque"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/" title="Go to Website Home" className="text-nordic/60 hover:text-mosque transition-colors flex items-center">
            <span className="material-symbols-outlined text-xl">home</span>
          </Link>
          <button className="text-nordic/60 hover:text-mosque transition-colors flex items-center">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button className="text-nordic/60 hover:text-mosque transition-colors relative flex items-center">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-nordic">{userName}</span>
              <span className="text-xs text-mosque font-medium">Administrator</span>
            </div>
            
            <div className="h-8 w-8 rounded-full bg-nordic/5 flex items-center justify-center overflow-hidden border border-nordic/10">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-nordic/60 text-lg">person</span>
              )}
            </div>

            <button title="Sign Out" onClick={handleSignOut} className="ml-1 h-8 w-8 rounded-lg hover:bg-red-50 text-nordic/60 hover:text-red-500 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
