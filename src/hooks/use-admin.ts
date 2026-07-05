import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DEMO_ADMIN_EMAIL = import.meta.env.VITE_DEMO_ADMIN_EMAIL || "admin@nerdup.local";
export const DEMO_ADMIN_PASSWORD = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "Admin@123456";
export const DEMO_ADMIN_STORAGE_KEY = "nerdup:demo-admin";

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export const useAdmin = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [demoAdmin, setDemoAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    const storedDemoAdmin = window.localStorage.getItem(DEMO_ADMIN_STORAGE_KEY) === "true";
    setDemoAdmin(storedDemoAdmin);

    const handleDemoAdminChange = () => {
      setDemoAdmin(window.localStorage.getItem(DEMO_ADMIN_STORAGE_KEY) === "true");
    };

    window.addEventListener("storage", handleDemoAdminChange);
    window.addEventListener("nerdup-demo-admin-change", handleDemoAdminChange);

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setEmail(data.user?.email?.toLowerCase() ?? null);
      setRole((data.user?.user_metadata?.role as string | undefined) ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email?.toLowerCase() ?? null);
      setRole((session?.user.user_metadata?.role as string | undefined) ?? null);
    });

    return () => {
      mounted = false;
      window.removeEventListener("storage", handleDemoAdminChange);
      window.removeEventListener("nerdup-demo-admin-change", handleDemoAdminChange);
      listener.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = useMemo(() => {
    if (demoAdmin) return true;
    if (!email) return false;
    return role === "admin" || adminEmails.includes(email);
  }, [demoAdmin, email, role]);

  return { email: demoAdmin ? DEMO_ADMIN_EMAIL : email, isAdmin };
};
