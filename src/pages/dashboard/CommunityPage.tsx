import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Users, CalendarDays, Share } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import CommentSection from "@/components/community/CommentSection";

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
}

const CommunityPage = () => {
  const [newPost, setNewPost] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [searchEvent, setSearchEvent] = useState("");
  const { posts, createPost, toggleLike, addComment, removeComment } = useCommunityPosts();
  
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Apoio à Transição",
      description: "Grupo dedicado ao compartilhamento de experiências durante a transição e suporte mútuo entre pessoas trans.",
      members: 156,
      category: "Suporte",
      image: "AT"
    },
    {
      id: "2",
      name: "Direitos Trans",
      description: "Grupo focado em discussões sobre direitos legais, retificação de documentos e combate à discriminação.",
      members: 89,
      category: "Direitos",
      image: "DT"
    },
    {
      id: "3",
      name: "Saúde Trans",
      description: "Compartilhamento de informações sobre hormonização, procedimentos de afirmação de gênero e saúde mental.",
      members: 112,
      category: "Saúde",
      image: "ST"
    },
    {
      id: "4",
      name: "Arte e Criatividade Trans",
      description: "Espaço para artistas trans compartilharem obras e discutirem representatividade nas artes.",
      members: 74,
      category: "Arte",
      image: "AC"
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
      image: "EC"
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
      image: "WO"
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
      image: "GC"
    }
  ]);

  const handleCreatePost = () => {
    if (newPost.trim() === "") return;
    createPost(newPost);
    setNewPost("");
  };

  const handleLikePost = (id: string) => {
    toggleLike(id);
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
                          <div className="flex gap-4 mb-2">
                            <button 
                              className={`flex items-center gap-1 text-sm ${post.liked ? 'text-primary' : 'text-muted-foreground'}`}
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart size={18} className={post.liked ? 'fill-primary' : ''} />
                              <span>{post.likes}</span>
                            </button>
                          </div>
                          <CommentSection 
                            postId={post.id}
                            comments={post.comments}
                            onAddComment={addComment}
                            onRemoveComment={removeComment}
                          />
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
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Users size={14} className="mr-1" />
                          Participar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Share size={14} className="mr-1" />
                          Compartilhar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button className="w-full max-w-xs">
                    <Users size={18} className="mr-2" />
                    Criar um novo grupo
                  </Button>
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
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button size="sm" className="text-xs">
                                  <Calendar size={14} className="mr-1" />
                                  Participar
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs">
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
                  <Button className="w-full max-w-xs">
                    <Calendar size={18} className="mr-2" />
                    Criar novo evento
                  </Button>
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

// ... keep existing code (CommentSection component)
