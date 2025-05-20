
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
                      src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Bandeira do orgulho trans"
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
                      src="https://images.pexels.com/photos/5443336/pexels-photo-5443336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
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
                      src="https://images.pexels.com/photos/15024337/pexels-photo-15024337/free-photo-of-grupo-de-pessoas-segurando-a-bandeira-arco-iris.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
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
