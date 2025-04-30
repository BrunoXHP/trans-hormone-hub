
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const InfoPage = () => {
  return (
    <PageLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Informações sobre Terapia Hormonal</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Guias e recursos confiáveis sobre terapia hormonal para pessoas trans
          </p>

          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="transfem">Feminizante</TabsTrigger>
              <TabsTrigger value="transmasc">Masculinizante</TabsTrigger>
              <TabsTrigger value="nonbinary">Não-Binário</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                  <CardDescription>
                    O que você precisa saber sobre terapia hormonal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    A terapia hormonal (TH) é um componente importante no processo de afirmação de gênero para muitas pessoas trans. Ela envolve a administração de hormônios para induzir características físicas que se alinham com a identidade de gênero de uma pessoa.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Antes de Iniciar</h3>
                  <p>
                    Antes de iniciar a terapia hormonal, é fundamental consultar um profissional de saúde especializado, como um endocrinologista com experiência em saúde trans. O acompanhamento médico regular é essencial para garantir a segurança e eficácia do tratamento.
                  </p>

                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Considerações Importantes</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>A terapia hormonal deve sempre ser supervisionada por profissionais de saúde qualificados.</li>
                          <li>Os efeitos variam de pessoa para pessoa e algumas mudanças podem ser permanentes.</li>
                          <li>É importante ter expectativas realistas sobre as mudanças corporais e o tempo necessário.</li>
                          <li>O acompanhamento psicológico pode ser benéfico durante esse processo.</li>
                          <li>Exames regulares são necessários para monitorar a saúde geral e os níveis hormonais.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Riscos e Benefícios</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Como qualquer tratamento médico, a terapia hormonal tem riscos e benefícios que devem ser discutidos com seu médico.</p>
                        <p className="mb-2"><strong>Benefícios potenciais:</strong> redução da disforia de gênero, melhor alinhamento entre aparência física e identidade de gênero, melhora na qualidade de vida e saúde mental.</p>
                        <p><strong>Riscos potenciais:</strong> dependendo do tipo de terapia, podem incluir alterações na fertilidade, risco cardiovascular, alterações hepáticas, entre outros. É fundamental discutir estes riscos individualmente com seu médico.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transfem">
              <Card>
                <CardHeader>
                  <CardTitle>Terapia Hormonal Feminizante</CardTitle>
                  <CardDescription>
                    Informações sobre terapia hormonal para mulheres trans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    A terapia hormonal feminizante geralmente envolve a administração de estrogênio e bloqueadores de testosterona para desenvolver características físicas femininas.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">Possíveis Efeitos</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Redistribuição da gordura corporal (quadris, coxas, nádegas)</li>
                    <li>Desenvolvimento das mamas</li>
                    <li>Redução da massa muscular e força</li>
                    <li>Diminuição de pelos corporais</li>
                    <li>Pele mais macia</li>
                    <li>Redução de ereções espontâneas e volume dos testículos</li>
                    <li>Alterações emocionais</li>
                  </ul>

                  <p className="mt-4">
                    Alguns efeitos começam a ser notados dentro de meses, enquanto outros podem levar anos para se desenvolver completamente. É importante ter expectativas realistas.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Medicamentos Comuns</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Estrogênios:</strong> estradiol (oral, transdérmico, injetável)</li>
                    <li><strong>Antiandrógenos:</strong> espironolactona, acetato de ciproterona, bloqueadores de GnRH</li>
                    <li><strong>Progesterona:</strong> pode ser adicionada posteriormente no tratamento</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transmasc">
              <Card>
                <CardHeader>
                  <CardTitle>Terapia Hormonal Masculinizante</CardTitle>
                  <CardDescription>
                    Informações sobre terapia hormonal para homens trans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    A terapia hormonal masculinizante envolve principalmente a administração de testosterona para desenvolver características físicas masculinas.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">Possíveis Efeitos</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Engrossamento da voz</li>
                    <li>Crescimento de pelos faciais e corporais</li>
                    <li>Aumento da massa muscular</li>
                    <li>Redistribuição da gordura corporal (região abdominal)</li>
                    <li>Cessação ou redução da menstruação</li>
                    <li>Crescimento do clitóris</li>
                    <li>Aumento da oleosidade da pele e possibilidade de acne</li>
                    <li>Calvície de padrão masculino (dependendo da genética)</li>
                  </ul>

                  <p className="mt-4">
                    A maioria das mudanças começa nos primeiros meses de terapia, com alguns efeitos (como o crescimento de pelos e mudanças na voz) podendo levar de 1 a 2 anos para se desenvolver completamente.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Formas de Administração</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Injetável:</strong> cipionato ou enantato de testosterona (aplicações semanais ou quinzenais)</li>
                    <li><strong>Gel/creme:</strong> aplicação diária na pele</li>
                    <li><strong>Adesivos:</strong> aplicação diária na pele</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nonbinary">
              <Card>
                <CardHeader>
                  <CardTitle>Terapia Hormonal para Pessoas Não-Binárias</CardTitle>
                  <CardDescription>
                    Abordagens para afirmação de gênero não-binário
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Para pessoas não-binárias, a terapia hormonal pode seguir diferentes abordagens, dependendo das características físicas desejadas e objetivos individuais.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">Opções Disponíveis</h3>
                  <p>
                    Pessoas não-binárias podem optar por:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Terapia hormonal padrão feminizante ou masculinizante</li>
                    <li>Doses mais baixas de hormônios para efeitos menos pronunciados</li>
                    <li>Terapia intermitente (ciclos de uso e pausa)</li>
                    <li>Combinações específicas de hormônios para obter efeitos personalizados</li>
                  </ul>

                  <p className="mt-4">
                    É especialmente importante trabalhar com profissionais de saúde que compreendam e respeitem identidades não-binárias, para criar um plano de tratamento que se alinhe com seus objetivos específicos.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Considerações Especiais</h3>
                  <p>
                    Devido à natureza personalizada deste tipo de abordagem, é fundamental manter um diálogo aberto com seus profissionais de saúde sobre suas expectativas e objetivos de afirmação de gênero. A terapia hormonal para pessoas não-binárias pode exigir mais ajustes e monitoramento para alcançar os resultados desejados.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default InfoPage;
