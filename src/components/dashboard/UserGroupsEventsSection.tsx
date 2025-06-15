
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { useUserGroupsEvents } from "@/hooks/useUserGroupsEvents";

const UserGroupsEventsSection = () => {
  const { myGroups, myEvents } = useUserGroupsEvents();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Grupos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Meus Grupos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myGroups.length === 0 ? (
            <div className="text-muted-foreground text-sm">Você ainda não participa de nenhum grupo.</div>
          ) : (
            <ul className="space-y-3">
              {myGroups.map(group => (
                <li key={group.id} className="flex gap-3 items-start border rounded-lg px-3 py-2">
                  <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded text-base font-bold shrink-0">{group.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{group.name}</span>
                      <Badge variant="outline" className="text-xs">{group.category}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{group.description}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Users className="h-3 w-3" /> {group.members} membros
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Meus Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myEvents.length === 0 ? (
            <div className="text-muted-foreground text-sm">Nenhum evento encontrado.</div>
          ) : (
            <ul className="space-y-3">
              {myEvents.map(event => (
                <li key={event.id} className="flex gap-3 items-start border rounded-lg px-3 py-2">
                  <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded text-base font-bold shrink-0">{event.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{event.title}</span>
                      <Badge variant="outline" className="text-xs">{event.category}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.date} {event.time ? `às ${event.time}` : ""}
                    </div>
                    <div className="text-xs text-muted-foreground">{event.location}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGroupsEventsSection;
