
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
          <h2 className="text-3xl font-bold mb-4 dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">Jornada de Transformação</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
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
                      src="/lovable-uploads/1c5cfe49-0ccd-4d36-95db-623bf758516c.png" 
                      alt="Manifestação com bandeira trans em frente a um prédio histórico"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Visibilidade Trans</h3>
                    <p className="text-muted-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Promovendo a conscientização e aceitação</p>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="/lovable-uploads/359243f4-c588-474a-92d6-3fb0f6b2ea2d.png" 
                      alt="Pessoa com cabelo colorido segurando bandeira trans"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Comunidade e Pertencimento</h3>
                    <p className="text-muted-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Fortalecendo laços e criando suporte</p>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="/lovable-uploads/64279e80-7b34-4a89-8a73-6de839f5a973.png" 
                      alt="Bandeira trans sendo segurada durante evento"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium dark:drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">Celebrando a Diversidade</h3>
                    <p className="text-muted-foreground font-medium dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">Honrando as múltiplas identidades e expressões</p>
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
