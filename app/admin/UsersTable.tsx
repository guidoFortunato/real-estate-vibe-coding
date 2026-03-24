"use client"
import { useState, useTransition, useEffect, useRef } from "react"
import { updateUserRole } from "./actions"

type UserRole = { id: string, email: string, role: string, created_at: string }

export function UsersTable({ initialUsers }: { initialUsers: UserRole[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [isPending, startTransition] = useTransition()
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking inside a dropdown container
      if ((e.target as HTMLElement).closest('.role-dropdown-container')) return;
      setOpenDropdownId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  
  // Sync state if server data changes
  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])
  
  const handleRoleChange = (userId: string, newRole: string) => {
    setOpenDropdownId(null);
    if (users.find(u => u.id === userId)?.role === newRole) return;
    
    // Optimistic UI update
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    
    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole)
      } catch (error) {
        // Revert on error
        alert("Failed to update role. Ensure you have admin permissions.")
        setUsers(initialUsers)
      }
    })
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  }

  if (users.length === 0) {
    return (
      <div className="py-12 text-center text-nordic/50 flex flex-col items-center bg-white rounded-xl border border-nordic/5 p-8">
        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">group_off</span>
        <p>No users found in the system.</p>
      </div>
    );
  }

  return (
    <>
      {users.map(u => {
        const isAdmin = u.role === 'admin';
        const isDropdownOpen = openDropdownId === u.id;
        
        return (
          <div key={u.id} className={`user-card group relative rounded-xl p-5 shadow-sm border flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-all ${isAdmin ? 'bg-hint-of-green/20 border-mosque/20 hover:shadow-soft' : 'bg-white border-nordic/5 hover:bg-hint-of-green/5'}`}>
            
            {/* User Details */}
            <div className="col-span-12 md:col-span-4 flex items-center w-full">
              <div className="relative shrink-0">
                <img 
                  alt="Avatar" 
                  className={`h-12 w-12 rounded-full object-cover border-2 ${isAdmin ? 'border-mosque' : 'border-white'}`}
                  src={`https://ui-avatars.com/api/?name=${u.email}&background=random`}
                />
                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${isAdmin ? 'bg-mosque' : 'bg-green-400'}`}></span>
              </div>
              <div className="ml-4 overflow-hidden">
                <div className="text-sm font-bold text-nordic truncate">{u.email.split('@')[0]}</div>
                <div className="text-xs text-nordic/70 truncate">{u.email}</div>
                <div className="mt-1 text-[10px] px-2 py-0.5 inline-block bg-nordic/5 rounded text-nordic/60">ID: #{u.id.substring(0,8)}</div>
              </div>
            </div>

            {/* Role & Status */}
            <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${isAdmin ? 'bg-mosque text-white' : 'bg-nordic/5 text-nordic/70'}`}>
                {isAdmin ? 'Administrator' : 'Standard User'}
              </span>
              <div className="flex items-center text-xs text-nordic/60">
                <span className={`material-symbols-outlined text-[14px] mr-1 ${isAdmin ? 'text-mosque' : 'text-green-500'}`}>check_circle</span>
                Active
              </div>
            </div>

            {/* Performance/Engagement (Mock Data since we don't have it in DB) */}
            <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-nordic-dark/50">Joined</div>
                <div className="text-sm font-semibold text-nordic-dark">
                  {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-nordic/50">Access</div>
                <div className="text-sm font-semibold text-nordic">{isAdmin ? 'Full' : 'Limited'}</div>
              </div>
            </div>

            {/* Actions (Custom Dropdown matching HTML Template precisely) */}
            <div className="role-dropdown-container col-span-12 md:col-span-2 w-full flex justify-end relative">
              <div className="relative w-full md:w-auto z-20">
                <button 
                  onClick={() => toggleDropdown(u.id)}
                  disabled={isPending}
                  className={`inline-flex items-center px-4 py-2 text-xs font-medium rounded-lg focus:outline-none transition-colors w-full md:w-auto justify-center cursor-pointer disabled:opacity-50 disabled:cursor-wait ${
                    isAdmin 
                      ? 'bg-mosque text-white shadow-md hover:bg-mosque/90' 
                      : 'border border-nordic-dark/10 bg-white shadow-sm text-nordic-dark hover:bg-nordic-dark hover:text-white'
                  }`}
                >
                  Change Role
                  <span className="material-symbols-outlined text-[16px] ml-2">{isDropdownOpen ? 'expand_less' : 'expand_more'}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 origin-top-right animate-in fade-in slide-in-from-top-2 ${isAdmin ? 'bg-mosque' : 'bg-white'}`}>
                    <div className="py-1" role="menu">
                      <button
                        onClick={() => handleRoleChange(u.id, "admin")}
                        className={`w-full text-left group flex items-center px-4 py-3 text-xs transition-colors cursor-pointer ${
                          isAdmin 
                            ? 'text-white hover:bg-white/20 font-medium bg-white/10' 
                            : 'text-nordic-dark/70 hover:bg-nordic-dark/5 hover:text-nordic-dark'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-sm mr-3 ${isAdmin ? 'text-white' : 'text-nordic-dark/50 group-hover:text-nordic-dark'}`}>shield</span>
                        Administrator
                      </button>
                      <button
                        onClick={() => handleRoleChange(u.id, "user")}
                        className={`w-full text-left group flex items-center px-4 py-3 text-xs transition-colors cursor-pointer ${
                          !isAdmin 
                            ? 'bg-hint-of-green/50 text-nordic-dark hover:bg-hint-of-green font-medium' 
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-sm mr-3 ${!isAdmin ? 'text-nordic-dark' : 'text-white/50 group-hover:text-white'}`}>person</span>
                        Standard User
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )
      })}
    </>
  )
}
