
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface CommunityGroup {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  image: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  membersCount?: number;
  isMember?: boolean;
}

export function useCommunityGroups() {
  const { profile } = useAuth();
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [loading, setLoading] = useState(true);

  // Load groups and user memberships
  const fetchGroups = useCallback(async () => {
    setLoading(true);

    // Fetch all groups
    const { data: groupRows, error: groupError } = await supabase
      .from("community_groups")
      .select("*")
      .order("created_at", { ascending: false });

    if (groupError) {
      setGroups([]);
      setLoading(false);
      return;
    }

    // Get group IDs
    const groupIds = (groupRows || []).map(g => g.id);

    // Fetch number of members for each group
    let membersCounts: Record<string, number> = {};
    if (groupIds.length > 0) {
      const { data: counts, error: countError } = await supabase
        .from("group_members")
        .select("group_id", { count: "exact", head: false });

      if (!countError && counts) {
        // .select("group_id", {count: "exact"}) does not return .count, so use workaround
        counts.forEach((m: any) => {
          if (m.group_id && m.group_id in membersCounts) {
            membersCounts[m.group_id] += 1;
          } else if (m.group_id) {
            membersCounts[m.group_id] = 1;
          }
        });
      }
    }

    // Fetch memberships for the current user
    let myMembershipIds: string[] = [];
    if (profile?.id && groupIds.length > 0) {
      const { data: memberships } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", profile.id);
      myMembershipIds = (memberships || []).map(m => m.group_id);
    }

    const finalGroups = (groupRows || []).map((g) => ({
      ...g,
      membersCount: membersCounts[g.id] || 0,
      isMember: myMembershipIds.includes(g.id),
      image: g.image || (g.name ? g.name.split(" ").map((x: string) => x[0]).join("").toUpperCase().slice(0, 2) : "GR"),
    }));
    setGroups(finalGroups);
    setLoading(false);
  }, [profile?.id]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  // Join a group
  const joinGroup = async (groupId: string) => {
    if (!profile?.id) return;
    await supabase.from("group_members").insert({
      group_id: groupId,
      user_id: profile.id,
    });
    fetchGroups();
  };

  // Leave a group
  const leaveGroup = async (groupId: string) => {
    if (!profile?.id) return;
    await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", profile.id);
    fetchGroups();
  };

  // Create new group
  const createGroup = async (
    name: string,
    description: string,
    category: string,
    image: string | null = null
  ) => {
    if (!profile?.id) return;
    const { error } = await supabase.from("community_groups").insert({
      name,
      description,
      category,
      image,
      created_by: profile.id,
    });
    if (!error) fetchGroups();
    // If needed, add a toast here in the UI
  };

  return {
    groups,
    loading,
    joinGroup,
    leaveGroup,
    createGroup,
    reload: fetchGroups,
  };
}
