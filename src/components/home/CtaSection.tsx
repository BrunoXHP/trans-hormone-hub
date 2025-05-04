
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
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
  );
};

export default CtaSection;
