
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search, User } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Como Podemos Ajudar</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Nossa plataforma oferece recursos especializados para apoiar sua
            jornada hormonal com informações confiáveis e comunidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Informações Confiáveis</h3>
              <p className="text-muted-foreground font-medium">
                Acesso a conteúdos sobre terapia hormonal revisados por profissionais da saúde.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Acompanhamento</h3>
              <p className="text-muted-foreground font-medium">
                Ferramentas para acompanhar sua jornada, incluindo calendário e registro de mudanças.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Suporte Personalizado</h3>
              <p className="text-muted-foreground font-medium">
                Conteúdo adaptado à sua identidade e fase da jornada hormonal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
