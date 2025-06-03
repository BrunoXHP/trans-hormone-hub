
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Shield, Target } from "lucide-react";

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] dark:text-shadow-lg">Sobre Nós</h1>
          <p className="text-lg text-foreground max-w-3xl mx-auto font-semibold dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
            Somos uma plataforma dedicada a apoiar pessoas trans em sua jornada hormonal,
            oferecendo informações confiáveis, recursos especializados e uma comunidade acolhedora.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">Nossa Missão</h2>
            <p className="text-lg text-foreground mb-4 font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              Acreditamos que toda pessoa trans merece acesso a informações precisas e suporte
              durante sua jornada de transição hormonal. Nossa plataforma foi criada para
              preencher essa lacuna, oferecendo recursos baseados em evidências científicas
              e experiências reais da comunidade.
            </p>
            <p className="text-lg text-foreground font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              Trabalhamos para criar um espaço seguro onde pessoas trans possam encontrar
              orientação, compartilhar experiências e construir conexões significativas
              com outras pessoas que passam ou passaram por jornadas similares.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Comunidade diversa e inclusiva"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-trans-blue/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-6 w-6 text-trans-blue" />
              </div>
              <h3 className="text-lg font-bold mb-2 dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Empatia</h3>
              <p className="text-sm text-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">
                Entendemos as dificuldades e celebramos as conquistas de cada jornada única.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-trans-pink/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-trans-pink" />
              </div>
              <h3 className="text-lg font-bold mb-2 dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Comunidade</h3>
              <p className="text-sm text-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">
                Promovemos conexões genuínas e redes de apoio entre nossa comunidade.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-trans-blue/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-trans-blue" />
              </div>
              <h3 className="text-lg font-bold mb-2 dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Segurança</h3>
              <p className="text-sm text-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">
                Mantemos um ambiente seguro e respeitoso para todas as pessoas.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-trans-pink/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Target className="h-6 w-6 text-trans-pink" />
              </div>
              <h3 className="text-lg font-bold mb-2 dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Precisão</h3>
              <p className="text-sm text-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">
                Fornecemos informações baseadas em evidências científicas e práticas médicas.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-trans-blue/10 to-trans-pink/10 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">Nossa História</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-foreground mb-4 font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              O Transcare nasceu em 2024 de um grupo de estudantes de desenvolvimento web 
              com o propósito de ajudar pessoas trans a ter mais informações a respeito da 
              terapia hormonal e atender as necessidades desta comunidade.
            </p>
            <p className="text-lg text-foreground mb-4 font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              Percebemos que existia uma lacuna significativa entre as informações médicas
              técnicas e as necessidades práticas das pessoas que estavam iniciando ou
              passando por transição hormonal. Nossa plataforma foi criada para preencher
              essa lacuna de forma acessível e acolhedora.
            </p>
            <p className="text-lg text-foreground font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              Hoje, contamos com uma equipe multidisciplinar que inclui endocrinologistas,
              psicólogos, desenvolvedores e membros ativos da comunidade trans, todos
              comprometidos em oferecer o melhor suporte possível.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">Junte-se à Nossa Comunidade</h2>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto font-semibold dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
            Seja você uma pessoa em transição, um aliado ou um profissional de saúde,
            todos são bem-vindos em nossa comunidade inclusiva e acolhedora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-trans-blue to-trans-pink rounded-md hover:from-trans-blue/90 hover:to-trans-pink/90 transition-all"
            >
              Cadastre-se Gratuitamente
            </a>
            <a 
              href="/info" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-trans-blue border-2 border-trans-blue rounded-md hover:bg-trans-blue hover:text-white transition-all"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
