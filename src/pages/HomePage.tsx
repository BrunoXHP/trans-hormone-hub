
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search, User, Transgender } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomePage = () => {
  return (
    <PageLayout fullWidth>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
                Transcare
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/80">
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
                <h2 className="text-2xl font-bold mb-4">Acompanhamento Personalizado</h2>
                <p className="text-muted-foreground mb-6">
                  Acompanhe sua jornada hormonal com recursos especializados para pessoas trans.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <span>Agenda de consultas e aplicações</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <span>Acesso a informações confiáveis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span>Perfil personalizado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Jornada de Transformação</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acompanhamos cada etapa do seu processo com cuidado e atenção personalizada
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1578324510065-9afd82922c8d" 
                        alt="Mãos segurando bandeira do orgulho trans"
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-medium">Acesso a recursos personalizados</h3>
                      <p className="text-muted-foreground">Informações precisas e adaptadas à sua jornada</p>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1567427361984-0cbe7396fc4c" 
                        alt="Grupo de apoio à comunidade LGBTQ+"
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-medium">Tecnologia a serviço da sua saúde</h3>
                      <p className="text-muted-foreground">Ferramentas digitais para acompanhamento hormonal</p>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1614073906819-62d71bd996bf" 
                        alt="Pessoa utilizando aplicativo de saúde com símbolo trans"
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-medium">Acompanhamento remoto</h3>
                      <p className="text-muted-foreground">Acesse suas informações de qualquer lugar</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static translate-y-0 mx-2" />
                <CarouselNext className="relative static translate-y-0 mx-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Podemos Ajudar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <h3 className="text-xl font-semibold mb-2">Informações Confiáveis</h3>
                <p className="text-muted-foreground">
                  Acesso a conteúdos sobre terapia hormonal revisados por profissionais da saúde.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acompanhamento</h3>
                <p className="text-muted-foreground">
                  Ferramentas para acompanhar sua jornada, incluindo calendário e registro de mudanças.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Suporte Personalizado</h3>
                <p className="text-muted-foreground">
                  Conteúdo adaptado à sua identidade e fase da jornada hormonal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Section with Image */}
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
                    <Transgender className="h-5 w-5 text-primary" />
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

      {/* CTA Section */}
      <section className="py-16 bg-accent/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Comece sua jornada hormonal com confiança
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se à nossa comunidade e acesse recursos especializados para
              apoiar sua jornada de transição.
            </p>
            <Link to="/register">
              <Button size="lg">Cadastre-se Gratuitamente</Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
