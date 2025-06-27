import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setCurrentUser(data.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Derive first name from full_name or email
  const firstName =
    currentUser?.user_metadata?.full_name?.split(" ")[0] ||
    currentUser?.email?.split("@")[0] ||
    null;

  return (
    <AuthContext.Provider value={{ currentUser, firstName }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
