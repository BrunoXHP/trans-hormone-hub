
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CommunityEvent {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  category: string; // We'll infer or leave empty since it's not present in the table
  organizer: string | null;
  attendees?: number; // Not stored in db, keep for compat
  image?: string; // Not stored in db, keep for compat
}

export const useCommunityEvents = () => {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("community_events")
        .select("*")
        .order("date", { ascending: true });
      if (data) {
        setEvents(
          data.map((event) => ({
            ...event,
            category: event.location && event.location.toLowerCase().includes("online") ? "Online" : "Presencial",
            // We'll assign dummy images for compatibility (e.g., use the first 2 chars of the title)
            image: event.title ? event.title.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "EV",
          }))
        );
      } else {
        setEvents([]);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return { events, loading };
};
