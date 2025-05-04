
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, UserRound, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const CommunityPage = () => {
  const [newPost, setNewPost] = useState("");
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
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <UserRound className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Grupos em breve</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Estamos trabalhando para adicionar grupos à nossa comunidade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <UserRound className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Eventos em breve</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Estamos trabalhando para adicionar eventos à nossa comunidade.
                  </p>
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
