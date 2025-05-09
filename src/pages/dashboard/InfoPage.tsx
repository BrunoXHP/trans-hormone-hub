
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface InfoResource {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
  fullContent?: string;
}

const INFO_RESOURCES: InfoResource[] = [
  {
    id: "1",
    title: "Direitos da População Trans",
    description: "Guia completo sobre direitos legais, incluindo mudança de nome, acesso à saúde e não-discriminação.",
    category: "legal",
    link: "#direitos-legais",
    fullContent: "A população transgênero possui diversos direitos garantidos, incluindo: \n\n- Direito ao nome social: Pode ser utilizado em todos os órgãos públicos, escolas e universidades. \n\n- Retificação de nome e gênero: Desde 2018, é possível alterar nome e gênero diretamente em cartório, sem necessidade de processo judicial ou cirurgia. \n\n- Acesso à saúde: O SUS garante atendimento especializado através do Processo Transexualizador, que inclui hormonioterapia e procedimentos cirúrgicos. \n\n- Não-discriminação: A discriminação por identidade de gênero é considerada ilegal em diversas cidades e estados, com base em interpretações do STF sobre a Lei de Racismo."
  },
  {
    id: "2",
    title: "Processo de Hormonização",
    description: "Informações detalhadas sobre o processo de terapia hormonal, efeitos e acompanhamento médico.",
    category: "saude",
    link: "#hormonizacao",
    fullContent: "A terapia hormonal é um componente importante do processo de afirmação de gênero. \n\n- Para mulheres trans: Geralmente envolve estrogênio e bloqueadores de testosterona, causando redistribuição de gordura, crescimento de mamas e diminuição de pelos corporais. \n\n- Para homens trans: A testosterona promove engrossamento da voz, crescimento de pelos faciais e corporais, redistribuição de gordura e aumento de massa muscular. \n\n- Acompanhamento médico: É essencial ter supervisão de um endocrinologista durante todo o processo. Exames regulares de sangue são necessários para monitorar os níveis hormonais e a saúde geral. \n\n- Acesso pelo SUS: A hormonioterapia está disponível pelo Sistema Único de Saúde através dos serviços especializados do Processo Transexualizador."
  },
  {
    id: "3",
    title: "Saúde Mental e Bem-estar",
    description: "Recursos e informações sobre apoio à saúde mental, incluindo grupos de apoio e terapias.",
    category: "saude",
    link: "#saude-mental",
    fullContent: "A saúde mental é um aspecto fundamental no processo de transição e na vida de pessoas transgênero: \n\n- Terapia: O acompanhamento psicológico pode ser muito benéfico, especialmente com profissionais que entendem questões de gênero. \n\n- Grupos de apoio: Conectar-se com outras pessoas trans pode reduzir sentimentos de isolamento e proporcionar troca de experiências. \n\n- Autocuidado: Práticas de autocuidado como meditação, exercícios físicos e atividades prazerosas são importantes para o bem-estar geral. \n\n- Sinais de alerta: É importante reconhecer sinais de depressão, ansiedade ou pensamentos suicidas e buscar ajuda imediatamente através do CVV (188) ou serviços de emergência."
  },
  {
    id: "4",
    title: "Exames Recomendados",
    description: "Lista de exames médicos recomendados e sua periodicidade para pessoas em processo de transição.",
    category: "saude",
    link: "#exames",
    fullContent: "Durante a terapia hormonal, diversos exames são recomendados para monitorar a saúde: \n\n- Hemograma completo: A cada 3-6 meses no início da TH, depois anualmente. \n\n- Perfil lipídico: Anualmente, para monitorar colesterol e triglicerídeos. \n\n- Função hepática: A cada 3-6 meses inicialmente, depois anualmente. \n\n- Glicemia: Anualmente. \n\n- Hormônios: Testosterona, estradiol, prolactina a cada 3 meses no início, depois a cada 6-12 meses. \n\n- Densitometria óssea: A cada 1-2 anos para pessoas em terapias que afetam a densidade óssea. \n\n- Exames específicos: Pessoas trans também devem manter rotina de exames preventivos relacionados aos órgãos presentes em seu corpo."
  },
  {
    id: "5",
    title: "Recursos Comunitários",
    description: "Diretório de organizações, grupos de apoio e eventos comunitários para pessoas transgênero.",
    category: "comunidade",
    link: "#comunidade",
    fullContent: "Estar conectado com a comunidade pode ser vital para pessoas transgênero: \n\n- ONGs especializadas: ANTRA (Associação Nacional de Travestis e Transexuais) e outras organizações oferecem apoio e informações. \n\n- Grupos de apoio: Existem grupos presenciais e online onde pessoas trans podem compartilhar experiências. \n\n- Eventos: Existem encontros, workshops e conferências específicas para a comunidade trans em diversas cidades. \n\n- Centros de referência LGBTQIA+: Várias cidades possuem centros que oferecem apoio jurídico, psicológico e social para pessoas trans. \n\n- Coletivos universitários: Muitas universidades têm grupos de apoio e discussão sobre diversidade de gênero."
  },
  {
    id: "6",
    title: "Retificação de Documentos",
    description: "Passo a passo para retificação de nome e gênero em documentos oficiais.",
    category: "legal",
    link: "#retificacao",
    fullContent: "O processo de retificação de documentos envolve: \n\n1. Reunir documentos: RG, CPF, certidão de nascimento, comprovante de residência, certidões negativas criminais. \n\n2. Escolher um cartório: Qualquer cartório de Registro Civil pode realizar o procedimento. \n\n3. Solicitar a alteração: Preencher o requerimento fornecido pelo cartório. \n\n4. Pagamento de taxas: O valor varia conforme o estado, e há possibilidade de gratuidade para pessoas de baixa renda. \n\n5. Emissão da nova certidão: Após aprovação, será emitida uma nova certidão de nascimento. \n\n6. Atualização dos demais documentos: Com a nova certidão, você poderá atualizar RG, CPF, título de eleitor, passaporte, etc. \n\n7. Sigilo: A alteração é sigilosa, não podendo constar nas certidões que houve modificação de nome/gênero."
  },
];

const InfoPage = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
                    <Collapsible
                      key={resource.id}
                      open={expandedItems[resource.id]}
                      onOpenChange={() => toggleItem(resource.id)}
                      className="border rounded-lg p-4 hover:bg-accent/40 transition-colors"
                    >
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">
                          {resource.category === "saude" && "Saúde"}
                          {resource.category === "legal" && "Legal"}
                          {resource.category === "comunidade" && "Comunidade"}
                        </span>
                        <CollapsibleTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            {expandedItems[resource.id] ? (
                              <>Mostrar menos <ChevronUp className="ml-1 h-3 w-3" /></>
                            ) : (
                              <>Ler mais <ChevronDown className="ml-1 h-3 w-3" /></>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="mt-3 pt-3 border-t">
                        <p className="text-sm whitespace-pre-line">{resource.fullContent}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saude" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.filter(r => r.category === "saude").map((resource) => (
                    <Collapsible
                      key={resource.id}
                      open={expandedItems[resource.id]}
                      onOpenChange={() => toggleItem(resource.id)}
                      className="border rounded-lg p-4 hover:bg-accent/40 transition-colors"
                    >
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">Saúde</span>
                        <CollapsibleTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            {expandedItems[resource.id] ? (
                              <>Mostrar menos <ChevronUp className="ml-1 h-3 w-3" /></>
                            ) : (
                              <>Ler mais <ChevronDown className="ml-1 h-3 w-3" /></>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="mt-3 pt-3 border-t">
                        <p className="text-sm whitespace-pre-line">{resource.fullContent}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="legal" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.filter(r => r.category === "legal").map((resource) => (
                    <Collapsible
                      key={resource.id}
                      open={expandedItems[resource.id]}
                      onOpenChange={() => toggleItem(resource.id)}
                      className="border rounded-lg p-4 hover:bg-accent/40 transition-colors"
                    >
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">Legal</span>
                        <CollapsibleTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            {expandedItems[resource.id] ? (
                              <>Mostrar menos <ChevronUp className="ml-1 h-3 w-3" /></>
                            ) : (
                              <>Ler mais <ChevronDown className="ml-1 h-3 w-3" /></>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="mt-3 pt-3 border-t">
                        <p className="text-sm whitespace-pre-line">{resource.fullContent}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="comunidade" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INFO_RESOURCES.filter(r => r.category === "comunidade").map((resource) => (
                    <Collapsible
                      key={resource.id}
                      open={expandedItems[resource.id]}
                      onOpenChange={() => toggleItem(resource.id)}
                      className="border rounded-lg p-4 hover:bg-accent/40 transition-colors"
                    >
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">Comunidade</span>
                        <CollapsibleTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            {expandedItems[resource.id] ? (
                              <>Mostrar menos <ChevronUp className="ml-1 h-3 w-3" /></>
                            ) : (
                              <>Ler mais <ChevronDown className="ml-1 h-3 w-3" /></>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="mt-3 pt-3 border-t">
                        <p className="text-sm whitespace-pre-line">{resource.fullContent}</p>
                      </CollapsibleContent>
                    </Collapsible>
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
