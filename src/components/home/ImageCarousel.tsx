
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageCarousel = () => {
  return (
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
                      src="https://images.unsplash.com/photo-1561806354-9ebcaae287c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                      alt="Grupo diverso celebrando o orgulho LGBTQ+ com bandeiras"
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
                      src="https://images.unsplash.com/photo-1572506634451-3deb970f3ba9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                      alt="Bandeira do orgulho trans sendo segurada por pessoas no evento de celebração"
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
                      src="https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                      alt="Grupo de pessoas diversas utilizando tecnologia para acesso à informação"
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
  );
};

export default ImageCarousel;
