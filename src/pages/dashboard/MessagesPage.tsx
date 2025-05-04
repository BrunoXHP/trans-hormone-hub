
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Dra. Ana Silva",
      avatar: "AS",
      content: "Olá, seus exames estão prontos para retirada. Podemos marcar uma consulta para revisão?",
      timestamp: new Date(2025, 4, 1, 14, 35),
      read: false
    },
    {
      id: "2",
      sender: "Dr. Carlos Mendes",
      avatar: "CM",
      content: "Confirmando sua consulta para amanhã às 10h. Por favor, chegue com 15 minutos de antecedência.",
      timestamp: new Date(2025, 4, 28, 9, 10),
      read: true
    },
    {
      id: "3",
      sender: "Farmácia Central",
      avatar: "FC",
      content: "Sua medicação já está disponível para retirada. Estamos abertos das 8h às 20h.",
      timestamp: new Date(2025, 4, 27, 16, 22),
      read: true
    }
  ]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Minhas Mensagens</h1>

        <Card className="border shadow-sm">
          <Tabs defaultValue="inbox" className="h-[600px]">
            <div className="flex h-full">
              {/* Sidebar with message list */}
              <div className="w-full md:w-1/3 border-r">
                <CardHeader>
                  <TabsList className="flex border-b w-full">
                    <TabsTrigger value="inbox" className="flex-1">Caixa de Entrada</TabsTrigger>
                    <TabsTrigger value="sent" className="flex-1">Enviados</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="p-0">
                  <TabsContent value="inbox" className="mt-0 h-[500px] border-0">
                    <ScrollArea className="h-full">
                      {messages.map((message) => (
                        <button
                          key={message.id}
                          className={`w-full flex items-start gap-3 p-4 text-left border-b hover:bg-accent/50 transition-colors ${
                            activeConversation === message.id ? "bg-accent" : ""
                          } ${!message.read ? "font-medium" : ""}`}
                          onClick={() => setActiveConversation(message.id)}
                        >
                          <Avatar className="h-10 w-10 mt-1">
                            <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center">
                              {message.avatar}
                            </div>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-sm font-medium truncate">{message.sender}</p>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                          </div>
                          {!message.read && (
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                          )}
                        </button>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="sent" className="mt-0 h-[500px] border-0">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">Nenhuma mensagem enviada</p>
                    </div>
                  </TabsContent>
                </CardContent>
              </div>

              {/* Message content */}
              <div className="hidden md:flex md:flex-col md:w-2/3">
                {activeConversation ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center">
                            {messages.find(m => m.id === activeConversation)?.avatar}
                          </div>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {messages.find(m => m.id === activeConversation)?.sender}
                          </CardTitle>
                          <CardDescription>
                            Última mensagem: {messages.find(m => m.id === activeConversation)?.timestamp.toLocaleString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-4">
                      <div className="space-y-4">
                        <div className="bg-accent p-3 rounded-lg max-w-[80%]">
                          <p>{messages.find(m => m.id === activeConversation)?.content}</p>
                          <p className="text-xs text-right text-muted-foreground mt-1">
                            {messages.find(m => m.id === activeConversation)?.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-3">
                      <div className="flex w-full gap-2">
                        <Textarea placeholder="Digite sua mensagem..." className="min-h-[40px] flex-1" />
                        <Button>Enviar</Button>
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">Selecione uma conversa para visualizar</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
