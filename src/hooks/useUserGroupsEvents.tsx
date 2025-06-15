
import { useMemo } from "react";

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
}

export interface UserEvent {
  id: string;
  title: string;
  date: string; // ISO string: yyyy-mm-dd
  time?: string;
  location: string;
  category: string;
  organizer: string;
  attendees: number;
  image: string;
}

export const useUserGroupsEvents = () => {
  // MOCKS: No futuro, substituir pelos dados vindos do backend filtrados por usuário!
  const myGroups: UserGroup[] = useMemo(() => [
    {
      id: "1",
      name: "Apoio à Transição",
      description: "Grupo de suporte entre pessoas trans.",
      members: 156,
      category: "Suporte",
      image: "AT"
    },
    {
      id: "3",
      name: "Saúde Trans",
      description: "Conversas sobre saúde trans.",
      members: 112,
      category: "Saúde",
      image: "ST"
    }
  ], []);

  const myEvents: UserEvent[] = useMemo(() => [
    {
      id: "2",
      title: "Workshop Online: Direitos e Saúde",
      date: "2025-06-15",
      time: "19:00",
      location: "Online",
      category: "Online",
      organizer: "Instituto TransFormação",
      attendees: 124,
      image: "WO"
    },
    {
      id: "3",
      title: "Grupo de Conversa Mensal",
      date: "2025-07-10",
      time: "18:30",
      location: "Rio de Janeiro",
      category: "Presencial",
      organizer: "Coletivo TransReal",
      attendees: 32,
      image: "GC"
    }
  ], []);

  return { myGroups, myEvents };
};
