import { 
  FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt 
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import logoKomprax from '../../../public/img/logo1.png';

export default function Footer() {
  return (
    <footer className="bg-[#181818] text-white py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Seção Sobre */}
          <div>
            <div className="w-[180px] mb-4">
              <Link href="/">
                <Image src={logoKomprax} alt="Komprax Logo" priority />
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Komprax é uma solução inovadora desenvolvida pela Obian Sistemas, que agiliza, gerencia e organiza 
              todo o processo de compras para associações de proteção veicular. Teste grátis por 15 dias sem compromisso.
            </p>
          </div>

          {/* Seção Links Rápidos */}
          <div className="md:ml-[5%]">
            <h2 className="text-xl font-semibold mb-4 text-[#598EC2]">Links Rápidos</h2>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><Link href="#">Início</Link></li>
              <li><Link href="#sobre">Funcionalidades</Link></li>
              <li><Link href="#planos">Planos e Preços</Link></li>
              <li>
                <Link 
                  href="https://obian.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Sobre a Obian
                </Link>
              </li>
            </ul>
          </div>

          {/* Seção de Contato */}
          <div className="lg:ml-[5%]">
            <h2 className="text-xl font-semibold mb-4 text-[#598EC2]">Contato</h2>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#598EC2]" /> (48) 98428-8998
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#598EC2]" /> suporte@obian.com.br
              </li>
            </ul>
          </div>

          {/* Seção Siga a Obian */}
          <div className="md:ml-[5%]">
            <h2 className="text-xl font-semibold mb-4 text-[#598EC2]">Siga a Obian</h2>
            <div className="flex space-x-4 text-xl">
              <a 
                href="https://facebook.com/obiansistemas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:text-gray-400 transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com/obiansistemas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:text-gray-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Komprax - Todos os direitos reservados.</p>
          <p className="mt-2">Desenvolvido por <strong>AiasTec</strong></p>
        </div>
      </div>
    </footer>
  );
}
