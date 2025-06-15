
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type UserRole = "admin" | "moderator" | "user";

export const useUserRoles = () => {
  const { profile, loading } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id || loading) {
      setRoles([]);
      setRolesLoading(false);
      return;
    }
    setRolesLoading(true);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", profile.id)
      .then(({ data, error }) => {
        if (!error && data) setRoles(data.map((r) => r.role as UserRole));
        setRolesLoading(false);
      });
  }, [profile?.id, loading]);

  const hasRole = (role: UserRole) => roles.includes(role);

  return { roles, hasRole, loading: rolesLoading };
};
