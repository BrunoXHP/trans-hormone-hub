
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
                src="https://images.unsplash.com/photo-1586814196770-93c85392bc27" 
                alt="Pessoa não-binária utilizando aplicativo de saúde"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold">Transforme dados em saúde</h2>
            <p className="text-lg">
              Nossa plataforma utiliza tecnologia avançada para transformar seus dados em 
              insights valiosos que ajudam a monitorar e melhorar sua jornada hormonal.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span>Acompanhamento visual do progresso</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <span>Alertas e lembretes personalizados</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <span>Relatórios detalhados para compartilhar</span>
              </li>
            </ul>
            <Link to="/register">
              <Button size="lg" className="mt-4">
                Experimente Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualSection;
