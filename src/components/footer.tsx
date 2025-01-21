import { Bus, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Bus className="h-6 w-6" />
              BusTrip
            </Link>
            <p className="text-sm text-gray-400">
              Viaje com conforto e segurança pelos melhores preços do mercado.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Quem somos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Trabalhe conosco
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Central de ajuda
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Cancelamento
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Reembolso
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">
                  Fale conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Formas de pagamento</h3>
            <ul className="space-y-2">
              <li className="text-sm">Cartão de crédito</li>
              <li className="text-sm">Cartão de débito</li>
              <li className="text-sm">PIX</li>
              <li className="text-sm">Boleto bancário</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {currentYear} BusTrip. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
