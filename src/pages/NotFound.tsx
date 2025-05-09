
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Página não encontrada
        </p>
        <p className="mb-8 text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <Button>Voltar para o Início</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
