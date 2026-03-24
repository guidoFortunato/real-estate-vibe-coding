"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateUserRole(userId: string, newRole: string) {
  const supabase = await createClient()
  
  // RLS will enforce that only admins can update this
  const { error } = await supabase
    .from('user_roles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  return true
}
