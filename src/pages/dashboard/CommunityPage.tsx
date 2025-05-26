import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserRound, Heart, Calendar, Users, CalendarDays, Share, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  liked: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  joined: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  organizer: string;
  attendees: number;
  image: string;
  attending: boolean;
}

const CommunityPage = () => {
  const [newPost, setNewPost] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [searchEvent, setSearchEvent] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupCategory, setNewGroupCategory] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventCategory, setNewEventCategory] = useState("");
  const { toast } = useToast();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Marina Costa",
      avatar: "MC",
      content: "Acabei de começar minha terapia hormonal! Alguém tem dicas para os primeiros meses?",
      timestamp: new Date(2025, 4, 3, 14, 35),
      likes: 24,
      comments: 7,
      liked: false
    },
    {
      id: "2",
      author: "Pedro Almeida",
      avatar: "PA",
      content: "Encontrei um grupo de apoio incrível na minha cidade. Estou muito feliz por ter uma comunidade que me entende!",
      timestamp: new Date(2025, 4, 2, 9, 12),
      likes: 18,
      comments: 4,
      liked: true
    },
    {
      id: "3",
      author: "Julia Mendes",
      avatar: "JM",
      content: "Alguém aqui já passou pelo processo de retificação de documentos? Estou precisando de orientação sobre os procedimentos.",
      timestamp: new Date(2025, 4, 1, 16, 22),
      likes: 31,
      comments: 12,
      liked: false
    }
  ]);
  
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Apoio à Transição",
      description: "Grupo dedicado ao compartilhamento de experiências durante a transição e suporte mútuo entre pessoas trans.",
      members: 156,
      category: "Suporte",
      image: "AT",
      joined: false
    },
    {
      id: "2",
      name: "Direitos Trans",
      description: "Grupo focado em discussões sobre direitos legais, retificação de documentos e combate à discriminação.",
      members: 89,
      category: "Direitos",
      image: "DT",
      joined: true
    },
    {
      id: "3",
      name: "Saúde Trans",
      description: "Compartilhamento de informações sobre hormonização, procedimentos de afirmação de gênero e saúde mental.",
      members: 112,
      category: "Saúde",
      image: "ST",
      joined: false
    },
    {
      id: "4",
      name: "Arte e Criatividade Trans",
      description: "Espaço para artistas trans compartilharem obras e discutirem representatividade nas artes.",
      members: 74,
      category: "Arte",
      image: "AC",
      joined: true
    }
  ]);
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Encontro de Conscientização Trans",
      description: "Evento presencial para conscientização e celebração da comunidade trans, com palestras e atividades culturais.",
      date: new Date(2025, 5, 29, 14, 0),
      location: "Centro Cultural da Diversidade - São Paulo",
      category: "Presencial",
      organizer: "Associação TransVida",
      attendees: 87,
      image: "EC",
      attending: false
    },
    {
      id: "2",
      title: "Workshop Online: Direitos e Saúde",
      description: "Workshop online sobre direitos legais e acesso à saúde para pessoas trans, com especialistas da área.",
      date: new Date(2025, 5, 15, 19, 0),
      location: "Online - Plataforma Zoom",
      category: "Online",
      organizer: "Instituto TransFormação",
      attendees: 124,
      image: "WO",
      attending: true
    },
    {
      id: "3",
      title: "Grupo de Conversa Mensal",
      description: "Encontro mensal para compartilhar experiências e construir redes de apoio entre pessoas trans.",
      date: new Date(2025, 6, 10, 18, 30),
      location: "Café Diverso - Rio de Janeiro",
      category: "Presencial",
      organizer: "Coletivo TransReal",
      attendees: 32,
      image: "GC",
      attending: false
    }
  ]);

  const handleCreatePost = () => {
    if (newPost.trim() === "") return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: "Você",
      avatar: "VC",
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLikePost = (id: string) => {
    setPosts(
      posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked
          };
        }
        return post;
      })
    );
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const newJoined = !group.joined;
        toast({
          title: newJoined ? "Grupo participado!" : "Saiu do grupo",
          description: newJoined ? `Você agora faz parte do grupo "${group.name}"` : `Você saiu do grupo "${group.name}"`
        });
        return {
          ...group,
          joined: newJoined,
          members: newJoined ? group.members + 1 : group.members - 1
        };
      }
      return group;
    }));
  };

  const handleShareGroup = (groupName: string) => {
    navigator.clipboard.writeText(`Confira este grupo: ${groupName} - Transcare Community`);
    toast({
      title: "Link copiado!",
      description: "O link do grupo foi copiado para a área de transferência"
    });
  };

  const handleAttendEvent = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const newAttending = !event.attending;
        toast({
          title: newAttending ? "Participação confirmada!" : "Participação cancelada",
          description: newAttending ? `Você confirmou presença no evento "${event.title}"` : `Você cancelou sua participação no evento "${event.title}"`
        });
        return {
          ...event,
          attending: newAttending,
          attendees: newAttending ? event.attendees + 1 : event.attendees - 1
        };
      }
      return event;
    }));
  };

  const handleShareEvent = (eventTitle: string) => {
    navigator.clipboard.writeText(`Confira este evento: ${eventTitle} - Transcare Community`);
    toast({
      title: "Link copiado!",
      description: "O link do evento foi copiado para a área de transferência"
    });
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || !newGroupDescription.trim() || !newGroupCategory) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      description: newGroupDescription,
      members: 1,
      category: newGroupCategory,
      image: newGroupName.substring(0, 2).toUpperCase(),
      joined: true
    };

    setGroups([newGroup, ...groups]);
    setNewGroupName("");
    setNewGroupDescription("");
    setNewGroupCategory("");
    setIsCreateGroupOpen(false);
    
    toast({
      title: "Grupo criado!",
      description: `O grupo "${newGroupName}" foi criado com sucesso`
    });
  };

  const handleCreateEvent = () => {
    if (!newEventTitle.trim() || !newEventDescription.trim() || !newEventDate || !newEventLocation.trim() || !newEventCategory) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDescription,
      date: new Date(newEventDate),
      location: newEventLocation,
      category: newEventCategory,
      organizer: "Você",
      attendees: 1,
      image: newEventTitle.substring(0, 2).toUpperCase(),
      attending: true
    };

    setEvents([newEvent, ...events]);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventDate("");
    setNewEventLocation("");
    setNewEventCategory("");
    setIsCreateEventOpen(false);
    
    toast({
      title: "Evento criado!",
      description: `O evento "${newEventTitle}" foi criado com sucesso`
    });
  };

  const filteredGroups = searchGroup
    ? groups.filter(group => 
        group.name.toLowerCase().includes(searchGroup.toLowerCase()) || 
        group.description.toLowerCase().includes(searchGroup.toLowerCase()))
    : groups;

  const filteredEvents = searchEvent
    ? events.filter(event => 
        event.title.toLowerCase().includes(searchEvent.toLowerCase()) || 
        event.description.toLowerCase().includes(searchEvent.toLowerCase()) ||
        event.location.toLowerCase().includes(searchEvent.toLowerCase()))
    : events;

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Comunidade</h1>

        <Tabs defaultValue="feed" className="mb-6">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="groups">Grupos</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="mt-4">
            <Card className="mb-6 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Compartilhe algo com a comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center">
                        VC
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="O que você está pensando?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[100px] resize-none mb-2"
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleCreatePost}>Publicar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <ScrollArea className="max-h-[600px]">
                {posts.map(post => (
                  <Card key={post.id} className="mb-4 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center">
                            {post.avatar}
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">{post.author}</p>
                            <span className="text-xs text-muted-foreground">
                              {post.timestamp.toLocaleString()}
                            </span>
                          </div>
                          <p className="mb-4">{post.content}</p>
                          <div className="flex gap-4">
                            <button 
                              className={`flex items-center gap-1 text-sm ${post.liked ? 'text-primary' : 'text-muted-foreground'}`}
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart size={18} className={post.liked ? 'fill-primary' : ''} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MessageSquare size={18} />
                              <span>{post.comments}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-4">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Grupos da comunidade</CardTitle>
                <CardDescription>
                  Participe de grupos para compartilhar experiências e conhecimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input 
                    placeholder="Buscar grupos..." 
                    value={searchGroup}
                    onChange={(e) => setSearchGroup(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGroups.map(group => (
                    <Card key={group.id} className="overflow-hidden border">
                      <div className="flex">
                        <div className="bg-primary/10 w-20 h-20 flex items-center justify-center text-xl font-medium text-primary">
                          {group.image}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-base">{group.name}</h3>
                            <Badge variant="outline" className="text-xs">{group.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{group.description}</p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Users size={14} className="mr-1" />
                            <span>{group.members} membros</span>
                          </div>
                        </div>
                      </div>
                      <CardFooter className="bg-muted/30 py-2 px-4 flex justify-between">
                        <Button 
                          variant={group.joined ? "outline" : "default"} 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleJoinGroup(group.id)}
                        >
                          <Users size={14} className="mr-1" />
                          {group.joined ? "Sair" : "Participar"}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleShareGroup(group.name)}
                        >
                          <Share size={14} className="mr-1" />
                          Compartilhar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6">
                  <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full max-w-xs">
                        <Plus size={18} className="mr-2" />
                        Criar um novo grupo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Criar novo grupo</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="groupName">Nome do grupo</Label>
                          <Input
                            id="groupName"
                            placeholder="Digite o nome do grupo"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="groupDescription">Descrição</Label>
                          <Textarea
                            id="groupDescription"
                            placeholder="Descreva o propósito do grupo"
                            value={newGroupDescription}
                            onChange={(e) => setNewGroupDescription(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="groupCategory">Categoria</Label>
                          <Select value={newGroupCategory} onValueChange={setNewGroupCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Suporte">Suporte</SelectItem>
                              <SelectItem value="Direitos">Direitos</SelectItem>
                              <SelectItem value="Saúde">Saúde</SelectItem>
                              <SelectItem value="Arte">Arte</SelectItem>
                              <SelectItem value="Educação">Educação</SelectItem>
                              <SelectItem value="Trabalho">Trabalho</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateGroup}>
                          Criar grupo
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-4">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Eventos da comunidade</CardTitle>
                <CardDescription>
                  Encontre e participe de eventos relacionados à comunidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input 
                    placeholder="Buscar eventos..." 
                    value={searchEvent}
                    onChange={(e) => setSearchEvent(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <ScrollArea className="max-h-[600px]">
                    {filteredEvents.map(event => (
                      <Card key={event.id} className="mb-4 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-primary/10 w-full sm:w-32 h-24 sm:h-32 flex items-center justify-center text-xl font-medium text-primary rounded">
                              {event.image}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <h3 className="font-medium text-lg">{event.title}</h3>
                                <Badge variant="outline">{event.category}</Badge>
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <CalendarDays size={16} className="mr-2" />
                                <span>{event.date.toLocaleDateString()}, {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              </div>
                              
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Local:</span> {event.location}
                              </div>
                              
                              <p className="text-sm mt-2">{event.description}</p>
                              
                              <div className="flex items-center text-xs text-muted-foreground mt-2">
                                <Users size={14} className="mr-1" />
                                <span>{event.attendees} participantes</span>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button 
                                  size="sm" 
                                  className="text-xs"
                                  variant={event.attending ? "outline" : "default"}
                                  onClick={() => handleAttendEvent(event.id)}
                                >
                                  <Calendar size={14} className="mr-1" />
                                  {event.attending ? "Cancelar participação" : "Participar"}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs"
                                  onClick={() => handleShareEvent(event.title)}
                                >
                                  <Share size={14} className="mr-1" />
                                  Compartilhar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full max-w-xs">
                        <Plus size={18} className="mr-2" />
                        Criar novo evento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Criar novo evento</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="eventTitle">Título do evento</Label>
                          <Input
                            id="eventTitle"
                            placeholder="Digite o título do evento"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="eventDescription">Descrição</Label>
                          <Textarea
                            id="eventDescription"
                            placeholder="Descreva o evento"
                            value={newEventDescription}
                            onChange={(e) => setNewEventDescription(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="eventDate">Data e hora</Label>
                          <Input
                            id="eventDate"
                            type="datetime-local"
                            value={newEventDate}
                            onChange={(e) => setNewEventDate(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="eventLocation">Local</Label>
                          <Input
                            id="eventLocation"
                            placeholder="Local do evento"
                            value={newEventLocation}
                            onChange={(e) => setNewEventLocation(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="eventCategory">Categoria</Label>
                          <Select value={newEventCategory} onValueChange={setNewEventCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Presencial">Presencial</SelectItem>
                              <SelectItem value="Online">Online</SelectItem>
                              <SelectItem value="Híbrido">Híbrido</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateEvent}>
                          Criar evento
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
