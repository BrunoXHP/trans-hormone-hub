
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Search, User } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
              Transcare
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              Informações confiáveis e suporte para sua jornada de terapia hormonal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Começar Agora
                </Button>
              </Link>
              <Link to="/info">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="bg-card rounded-lg shadow-lg border p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Acompanhamento Personalizado</h2>
              <p className="text-muted-foreground mb-6 font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">
                Acompanhe sua jornada hormonal com recursos especializados para pessoas trans.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Agenda de consultas e aplicações</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Acesso a informações confiáveis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Perfil personalizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
