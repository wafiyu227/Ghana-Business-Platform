// utils/logout.js
import { supabase } from "../supabaseClient";

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout failed:", error.message);
  } else {
    console.log("Logged out successfully");
  }
};
