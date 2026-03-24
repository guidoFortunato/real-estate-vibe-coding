import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@/lib/properties";
import { UsersTable } from "./UsersTable";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: properties } = await getProperties({ pageSize: 10 });

  return (
    <div className="min-h-screen bg-background-light py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-nordic-dark">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 sm:p-8 rounded-2xl shadow-soft border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-nordic-dark/60 mt-1">Manage users and oversee real estate properties</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-mosque bg-hint-of-green/50 px-4 py-1.5 rounded-full border border-hint-of-green">Admin Mode</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 border border-gray-100 flex flex-col h-full">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">User Roles Management</h2>
                <p className="text-sm text-nordic-dark/60 mt-1">Promote users to admins</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <span className="material-icons">people</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
               <UsersTable initialUsers={userRoles || []} />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 border border-gray-100 flex flex-col h-full">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Recent Properties</h2>
                <p className="text-sm text-nordic-dark/60 mt-1">Overview of latest listings</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-mosque">
                <span className="material-icons">apartment</span>
              </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto max-h-125 pr-2 custom-scrollbar">
              {properties.map(property => (
                <div key={property.id} className="group flex gap-5 p-4 border border-gray-100 rounded-xl hover:border-hint-of-green hover:bg-hint-of-green/5 transition-all cursor-default">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-gray-100">
                    <Image 
                      src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} 
                      alt={property.title} 
                      fill 
                      sizes="(max-width: 96px) 100vw, 96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full">
                    <div className="flex justify-between items-start w-full">
                       <h3 className="font-semibold text-nordic-dark line-clamp-1 flex-1">{property.title}</h3>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-2 ${property.type === 'sale' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                         {property.type.toUpperCase()}
                       </span>
                    </div>
                    <p className="text-sm text-nordic-dark/60 mt-0.5 flex items-center gap-1">
                      <span className="material-icons text-[14px]">location_on</span>
                      <span className="line-clamp-1">{property.location}</span>
                    </p>
                    <p className="font-bold text-lg text-mosque mt-2">
                       ${property.price.toLocaleString()}
                       {property.price_per_month && <span className="text-xs text-nordic-dark/50 font-medium ml-1">/mo</span>}
                    </p>
                  </div>
                </div>
              ))}
              
              {properties.length === 0 && (
                <div className="py-10 text-center text-nordic-dark/50 flex flex-col items-center">
                  <span className="material-icons text-4xl mb-2 opacity-50">domain_disabled</span>
                  <p>No properties found</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
