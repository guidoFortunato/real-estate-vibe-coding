import { createClient } from "@/lib/supabase/server";
import { UsersTable } from "../UsersTable";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('*')
    .order('created_at', { ascending: false });

  const totalUsers = userRoles?.length || 0;
  const adminUsers = userRoles?.filter(u => u.role === 'admin').length || 0;
  const standardUsers = userRoles?.filter(u => u.role === 'user').length || 0;

  return (
    <main className="grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic">User Directory</h1>
          <p className="text-nordic/60 mt-1 text-sm">Manage user access and roles for your properties.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-nordic/40 group-focus-within:text-mosque text-xl">search</span>
            </div>
            <input 
              readOnly
              className="block w-full pl-10 pr-3 py-2.5 border border-nordic/10 rounded-lg bg-white text-nordic shadow-sm focus:ring-2 focus:ring-mosque focus:border-transparent transition-all text-sm outline-none" 
              placeholder="Search is coming soon..." 
              type="text"
            />
          </div>
          <button className="inline-flex items-center justify-center px-4 py-2.5 border border-mosque text-sm font-medium rounded-lg text-mosque bg-transparent hover:bg-mosque/5 focus:outline-none transition-colors whitespace-nowrap opacity-50 cursor-not-allowed">
            <span className="material-symbols-outlined text-lg mr-2">add</span>
            Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-6 border-b border-nordic/10 overflow-x-auto">
        <button className="pb-3 text-sm font-semibold text-mosque border-b-2 border-mosque whitespace-nowrap">All Users ({totalUsers})</button>
        <button className="pb-3 text-sm font-medium text-nordic/60 hover:text-nordic transition-colors whitespace-nowrap">Admins ({adminUsers})</button>
        <button className="pb-3 text-sm font-medium text-nordic/60 hover:text-nordic transition-colors whitespace-nowrap">Standard ({standardUsers})</button>
      </div>

      {/* Users List Wrapper */}
      <div className="space-y-4">
        {/* Table Header (Desktop only) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic/50 mb-2">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Role &amp; Status</div>
          <div className="col-span-3">Engagement</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {/* Render the unified UI inside the client component to handle state/loading */}
         <UsersTable initialUsers={userRoles || []} />
      </div>

      {/* Pagination Footer */}
      {totalUsers > 0 && (
        <div className="mt-8 border-t border-nordic/5 py-6 flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-sm text-nordic/60">
              Showing <span className="font-medium text-nordic">1</span> to <span className="font-medium text-nordic">{totalUsers}</span> of <span className="font-medium text-nordic">{totalUsers}</span> users
            </p>
          </div>
          <div className="flex gap-2">
            <button disabled className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-nordic bg-white border border-nordic/10 disabled:opacity-50">
                Previous
            </button>
            <button disabled className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-nordic bg-white border border-nordic/10 disabled:opacity-50">
                Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
