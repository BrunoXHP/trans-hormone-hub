
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-trans-blue/10 to-trans-pink/10 py-10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-trans">Transcare</h3>
            <p className="text-sm text-muted-foreground">
              Apoiando pessoas trans em sua jornada hormonal com informações confiáveis e comunidade acolhedora.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-foreground hover:text-trans-blue transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground hover:text-trans-blue transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/info" className="text-foreground hover:text-trans-blue transition-colors">
                  Informações
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground hover:text-trans-blue transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-foreground hover:text-trans-blue transition-colors">
                  Entrar
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: contato@transcare.com</li>
              <li className="text-muted-foreground">Telefone: (00) 0000-0000</li>
              <li className="mt-4 text-xs text-muted-foreground">
                © {currentYear} Transcare. Todos os direitos reservados.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
