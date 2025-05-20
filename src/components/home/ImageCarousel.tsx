
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
                      src="https://images.unsplash.com/photo-1561867433-c5fca91383f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                      alt="Bandeira do orgulho trans em primeiro plano"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium">Visibilidade Trans</h3>
                    <p className="text-muted-foreground">Promovendo a conscientização e aceitação</p>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                      alt="Bandeiras LGBTQ+ em evento de celebração do orgulho"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium">Comunidade e Pertencimento</h3>
                    <p className="text-muted-foreground">Fortalecendo laços e criando suporte</p>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1602230068527-57257870a8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                      alt="Arco-íris simbolizando a diversidade LGBTQ+"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium">Celebrando a Diversidade</h3>
                    <p className="text-muted-foreground">Honrando as múltiplas identidades e expressões</p>
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
