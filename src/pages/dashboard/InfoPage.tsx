
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InfoResource {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
}

const INFO_RESOURCES: InfoResource[] = [
  {
    id: "1",
    title: "Direitos da População Trans",
    description: "Guia completo sobre direitos legais, incluindo mudança de nome, acesso à saúde e não-discriminação.",
    category: "legal",
    link: "#direitos-legais"
  },
  {
    id: "2",
    title: "Processo de Hormonização",
    description: "Informações detalhadas sobre o processo de terapia hormonal, efeitos e acompanhamento médico.",
    category: "saude",
    link: "#hormonizacao"
  },
  {
    id: "3",
    title: "Saúde Mental e Bem-estar",
    description: "Recursos e informações sobre apoio à saúde mental, incluindo grupos de apoio e terapias.",
    category: "saude",
    link: "#saude-mental"
  },
  {
    id: "4",
    title: "Exames Recomendados",
    description: "Lista de exames médicos recomendados e sua periodicidade para pessoas em processo de transição.",
    category: "saude",
    link: "#exames"
  },
  {
    id: "5",
    title: "Recursos Comunitários",
    description: "Diretório de organizações, grupos de apoio e eventos comunitários para pessoas transgênero.",
    category: "comunidade",
    link: "#comunidade"
  },
  {
    id: "6",
    title: "Retificação de Documentos",
    description: "Passo a passo para retificação de nome e gênero em documentos oficiais.",
    category: "legal",
    link: "#retificacao"
  },
];

const InfoPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Informações e Recursos</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Central de Conhecimento</CardTitle>
            <CardDescription>
              Recursos educacionais e informativos para apoiar sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar recursos..." className="pl-10" />
              </div>
              <Button variant="outline">Filtrar</Button>
            </div>

            <Tabs defaultValue="todos">
              <TabsList className="mb-4">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="saude">Saúde</TabsTrigger>
                <TabsTrigger value="legal">Legal</TabsTrigger>
                <TabsTrigger value="comunidade">Comunidade</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4 hover:bg-accent/40 transition-colors">
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">
                          {resource.category === "saude" && "Saúde"}
                          {resource.category === "legal" && "Legal"}
                          {resource.category === "comunidade" && "Comunidade"}
                        </span>
                        <Button variant="link" size="sm" className="p-0">
                          Ler mais
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saude" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.filter(r => r.category === "saude").map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4 hover:bg-accent/40 transition-colors">
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">Saúde</span>
                        <Button variant="link" size="sm" className="p-0">
                          Ler mais
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="legal" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.filter(r => r.category === "legal").map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4 hover:bg-accent/40 transition-colors">
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">Legal</span>
                        <Button variant="link" size="sm" className="p-0">
                          Ler mais
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="comunidade" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.filter(r => r.category === "comunidade").map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4 hover:bg-accent/40 transition-colors">
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">Comunidade</span>
                        <Button variant="link" size="sm" className="p-0">
                          Ler mais
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
            <CardDescription>
              Respostas para dúvidas comuns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Como solicitar a retificação de nome e gênero?</h3>
                <p className="text-sm text-muted-foreground">
                  A retificação de nome e gênero pode ser feita diretamente em cartório, sem necessidade 
                  de autorização judicial, conforme decisão do STF. Para isso, você precisará apresentar 
                  documentos pessoais e preencher uma solicitação específica.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Quais especialistas devo consultar para iniciar a transição?</h3>
                <p className="text-sm text-muted-foreground">
                  É recomendado o acompanhamento multidisciplinar, incluindo endocrinologista, 
                  psicólogo/psiquiatra e outros especialistas conforme suas necessidades específicas. 
                  O processo deve ser personalizado para cada pessoa.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Como ter acesso a medicamentos pelo SUS?</h3>
                <p className="text-sm text-muted-foreground">
                  O SUS oferece acesso a hormonioterapia através do Processo Transexualizador. 
                  Para acessar este serviço, procure uma Unidade Básica de Saúde para encaminhamento 
                  a um serviço especializado em saúde trans.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InfoPage;
