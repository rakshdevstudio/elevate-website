import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async (currentUser: User | null) => {
      if (!currentUser) {
        if (mounted) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      
      if (mounted) setUser(currentUser);
      
      try {
        const { data } = await supabase.rpc("has_role", {
          _user_id: currentUser.id,
          _role: "admin",
        });
        if (mounted) {
          setIsAdmin(!!data);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdmin(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        checkAdmin(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isAdmin, loading, signIn, signOut };
}
