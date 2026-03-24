"use client"
import { useState, useTransition, useEffect } from "react"
import { updateUserRole } from "./actions"

type UserRole = { id: string, email: string, role: string, created_at: string }

export function UsersTable({ initialUsers }: { initialUsers: UserRole[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [isPending, startTransition] = useTransition()
  
  // Sync state if server data changes
  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])
  
  const handleRoleChange = (userId: string, newRole: string) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-sm text-nordic-dark/60">
            <th className="py-3 font-medium">Email</th>
            <th className="py-3 font-medium w-24">Role</th>
            <th className="py-3 font-medium w-32">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-50">
          {users.map(u => (
            <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 text-nordic-dark font-medium truncate max-w-50" title={u.email}>{u.email}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-hint-of-green text-mosque' : 'bg-gray-100 text-gray-600'}`}>
                  {u.role.toUpperCase()}
                </span>
              </td>
              <td className="py-4">
                <select 
                  className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-mosque focus:ring-1 focus:ring-mosque cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  disabled={isPending}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
