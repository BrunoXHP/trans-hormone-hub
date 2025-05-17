
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-trans-blue/10 via-white to-trans-pink/10">
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-trans">404</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Página não encontrada
        </p>
        <p className="mb-8 text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-trans-blue to-trans-pink hover:from-trans-blue/90 hover:to-trans-pink/90">
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
