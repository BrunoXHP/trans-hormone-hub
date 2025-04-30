
import PageLayout from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";

const faqItems = [
  {
    question: "Como começo a terapia hormonal?",
    answer: "Para iniciar a terapia hormonal, recomenda-se consultar um médico especializado, como um endocrinologista com experiência em saúde trans. O processo geralmente inclui avaliação médica inicial, exames laboratoriais e desenvolvimento de um plano de tratamento personalizado. Em muitos casos, é necessário um acompanhamento psicológico e uma carta de recomendação, embora isso varie conforme o local e o profissional."
  },
  {
    question: "Quanto tempo leva para ver os efeitos da terapia hormonal?",
    answer: "Os efeitos da terapia hormonal variam significativamente entre indivíduos. Alguns efeitos podem começar a ser notados dentro de algumas semanas (como mudanças de humor ou na pele), enquanto outros podem levar meses ou anos para se desenvolver completamente. Por exemplo, em terapias feminizantes, o desenvolvimento das mamas pode levar 2-3 anos, enquanto em terapias masculinizantes, o engrossamento da voz pode ocorrer nos primeiros 3-6 meses."
  },
  {
    question: "Quais são os riscos associados à terapia hormonal?",
    answer: "Como qualquer tratamento médico, a terapia hormonal apresenta riscos que devem ser discutidos com seu médico. Estes variam conforme o tipo de terapia e incluem potenciais impactos na fertilidade, saúde cardiovascular e óssea, entre outros. Por isso é fundamental o acompanhamento médico regular para monitorar possíveis efeitos adversos."
  },
  {
    question: "A terapia hormonal é coberta pelos planos de saúde?",
    answer: "A cobertura de terapia hormonal para pessoas trans pelos planos de saúde varia bastante. No Brasil, o Sistema Único de Saúde (SUS) oferece o Processo Transexualizador que inclui terapia hormonal, mas há filas de espera. Alguns planos privados também oferecem cobertura, mas frequentemente exigem laudos e justificativas médicas. Verifique com seu plano de saúde quais são as políticas específicas."
  },
  {
    question: "Preciso parar a terapia hormonal antes de cirurgias?",
    answer: "A necessidade de interromper a terapia hormonal antes de procedimentos cirúrgicos depende do tipo de cirurgia e dos hormônios utilizados. Em alguns casos, especialmente antes de cirurgias de afirmação de gênero, pode ser necessário interromper certos hormônios (principalmente estrogênios) algumas semanas antes para reduzir riscos de complicações como tromboembolismo. Sempre siga as orientações específicas da sua equipe médica."
  },
  {
    question: "A terapia hormonal afeta a saúde mental?",
    answer: "Sim, a terapia hormonal pode afetar a saúde mental de diversas formas. Para muitas pessoas trans, iniciar a terapia hormonal resulta em melhora significativa da disforia de gênero e do bem-estar psicológico geral. No entanto, as flutuações hormonais também podem influenciar o humor e as emoções, especialmente no início do tratamento. Por isso, o acompanhamento psicológico durante esse processo é recomendado."
  },
  {
    question: "É possível engravidar durante a terapia hormonal masculinizante?",
    answer: "Embora a testosterona geralmente reduza a fertilidade, ela não é um método contraceptivo confiável. Pessoas que utilizam testosterona ainda podem engravidar se tiverem relações sexuais sem proteção. Se a gravidez não é desejada, é importante utilizar métodos contraceptivos adequados. Se você deseja engravidar no futuro, converse com seu médico sobre opções de preservação de fertilidade."
  },
  {
    question: "Quais são as opções para pessoas não-binárias que desejam iniciar terapia hormonal?",
    answer: "Pessoas não-binárias têm diversas opções para terapia hormonal, dependendo dos efeitos desejados. Isso pode incluir doses mais baixas de hormônios, terapia intermitente ou combinações específicas para alcançar resultados mais alinhados com sua identidade de gênero. É fundamental encontrar um profissional de saúde que compreenda e respeite identidades não-binárias para desenvolver um plano personalizado."
  },
  {
    question: "É seguro comprar hormônios online sem prescrição médica?",
    answer: "Não é recomendado comprar hormônios online sem prescrição médica. A automedicação sem supervisão médica apresenta diversos riscos: dosagem incorreta, produtos falsificados ou contaminados, e falta de monitoramento para detectar possíveis efeitos colaterais. A terapia hormonal segura requer acompanhamento médico regular, incluindo exames para verificar os níveis hormonais e a saúde geral."
  },
  {
    question: "Se eu parar a terapia hormonal, quais efeitos serão revertidos?",
    answer: "A reversibilidade dos efeitos da terapia hormonal varia. Em terapias feminizantes, efeitos como redução da libido e alterações emocionais podem se reverter, mas o desenvolvimento das mamas é permanente. Em terapias masculinizantes, efeitos como o engrossamento da voz e crescimento do clitóris são permanentes, enquanto a redistribuição de gordura pode se reverter. A fertilidade pode ou não retornar após a interrupção do tratamento."
  }
];

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = faqItems.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(filtered);
  };

  return (
    <PageLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Perguntas Frequentes</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Respostas para dúvidas comuns sobre terapia hormonal e transição
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tem uma dúvida?</CardTitle>
              <CardDescription>
                Busque nas perguntas frequentes ou envie uma nova pergunta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Digite sua dúvida..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit">Buscar</Button>
              </form>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-medium py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-lg font-medium">Nenhum resultado encontrado</p>
                <p className="text-muted-foreground mt-2">
                  Tente buscar com outras palavras ou envie sua pergunta para nossa equipe
                </p>
                <Button className="mt-4">Enviar Nova Pergunta</Button>
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
};

export default FaqPage;
