
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Heart } from "lucide-react";

const VisualSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                alt="Grupo diverso utilizando tecnologia para acessar informações de saúde"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">Transforme dados em saúde</h2>
            <p className="text-lg font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              Nossa plataforma utiliza tecnologia avançada para transformar seus dados em 
              insights valiosos que ajudam a monitorar e melhorar sua jornada hormonal.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Acompanhamento visual do progresso</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Alertas e lembretes personalizados</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Relatórios detalhados para compartilhar</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link to="/register">
                <Button size="lg">
                  Experimente Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualSection;
