'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import logo2 from '../../../public/img/logo2.png';
import logo3 from '../../../public/img/logo3.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPromo, setShowPromo] = useState<null | boolean>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [promoActive, setPromoActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedShowPromo = localStorage.getItem("showPromo");
      const savedTimeLeft = localStorage.getItem("timeLeft");
  
      if (savedShowPromo !== null) {
        setShowPromo(JSON.parse(savedShowPromo)); // Define o estado com base no `localStorage`
      } else {
        setShowPromo(true); // Se não houver registro, mostra a Topbar normalmente
      }
  
      if (savedTimeLeft) {
        const parsedTime = parseInt(savedTimeLeft, 10);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          setTimeLeft(parsedTime);
          setPromoActive(true);
        } else {
          setTimeLeft(0);
          setPromoActive(false);
          localStorage.removeItem("timeLeft");
          localStorage.removeItem("promoActive");
        }
      }
    }
  }, []);  
  

  // Atualiza localStorage quando showPromo ou timeLeft mudam
  useEffect(() => {
    localStorage.setItem('showPromo', JSON.stringify(showPromo));
  }, [showPromo]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowPromo(false);
      setPromoActive(false);
      localStorage.removeItem('timeLeft');
      localStorage.removeItem('promoActive');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem('timeLeft', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    setCurrentPage(window.location.pathname);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const promoStatus = localStorage.getItem("showPromo");
      if (promoStatus === "false") {
        setShowPromo(false);
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  // Formatar tempo restante
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Abrir o chatbot com o desconto ativo
  const openChatbot = () => {
    if (promoActive && timeLeft > 0) {
      console.log("🔥 Ativando desconto na sessão do Chatbot!");
      localStorage.setItem('promoActive', 'true');
    }
    window.location.hash = "#chat-obiana";
  };
  

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const isActivePage = (path: string): string =>
    currentPage === path ? 'border-b-2 border-[#fff]' : 'border-b-2 border-transparent';

  const isTransparentBg = currentPage === '/';

  return (
    <>
      {showPromo !== null && showPromo && (
        <div className="relative flex flex-col md:flex-row top-0 left-0 w-full bg-[#ff4c4c] text-black text-center py-1 flex-wrap md:flex-nowrap justify-between items-center px-2 md:px-4">
          <span className="text-[10px] md:text-sm lg:text-md font-medium flex-1 text-left">
            Responda a tempo nosso questionário de contato e receba 
            <strong> 5% de desconto </strong> em qualquer plano!
            
            <a
              onClick={(e) => {
                e.preventDefault();
                openChatbot();
              }} 
              className="cursor-pointer text-[10px] md:text-[14px] ml-[5px] md:ml-[10px] underline font-bold text-[#59ff1c] hover:text-[#244419]"
            >
              Começar
            </a>
          </span>

          <div className="flex items-center w-full justify-between md:w-[290px] gap-2 md:gap-4">
            <div className='w-[20px] md:hidden'></div>

            <b className="text-[#131313] md:z-[9000] bg-[#ff4c4c] p-1 md:p-2 px-2 md:px-3 rounded-[10px] text-[10px] md:text-sm font-bold">
              Tempo acaba em: 
              <span className="text-[12px] md:text-lg text-[#ff0000] ml-[5px] bg-[#260000] rounded-md p-[2px] md:p-[5px]">
                {formatTime(timeLeft)}
              </span>
            </b>

            <button 
              className="text-black font-bold text-2xl md:text-3xl px-1 md:px-2"
              onClick={() => {
                setShowPromo(false);
                localStorage.setItem("showPromo", JSON.stringify(false)); // Atualiza no localStorage
              }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}


      {/* Navbar Desktop */}
      <header className={`${
        isTransparentBg && !menuOpen ? 'absolute bg-transparent' : menuOpen ? 'fixed bg-white opacity-100' : 'relative bg-white'
      } w-full flex items-center justify-between z-[8999] h-20 px-6 pr-10 transition-all duration-500`}
      >

        {/* Logo */}
        <div className='w-[200px]'>
          <div className="w-44 mt-[10px]">
            <Link href="/">
            <Image src={menuOpen ? logo3 : logo2} alt="Logo" priority />
            </Link>
          </div>
        </div>

        {/* Menu de navegação */}
        <ul className="hidden text-[14px] lg:flex text-base text-white gap-6 lg:gap-10 font-medium">
          <li className={`relative group ${isActivePage('/')}`}>
            <Link href="#">Início</Link>
            <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className={`relative group ${isActivePage('#como-funciona')}`}>
            <Link href="#sobre">Funcionalidades</Link>
            <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className={`relative group ${isActivePage('#planos-precos')}`}>
            <Link href="#planos">Planos e Preços</Link>
            <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className={`relative group ${isActivePage('/sobre-obian')}`}>
            <Link 
              href="https://obian.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Sobre a Obian
            </Link>
            <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        <div className="hidden lg:flex items-center">
          <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
            }} 
            className="flex items-center w-[200px] gap-1 px-4 font-medium py-2 bg-[#598EC2] text-white text-[15px] transition-all hover:shadow-lg hover:bg-[#4b6e92] rounded"
          >
            Teste Grátis Por 15 Dias
          </Link>
        </div>
        
        <div className='flex lg:hidden items-center gap-[20px]'>
        <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
            }} 
            className="hidden sm:flex lg:hidden text-center items-center gap-1 px-4 font-bold py-2 text-white text-[15px] transition-all hover:shadow-lg hover:bg-[#4b6e92] rounded"
          >
            Teste Grátis Por 15 Dias
          </Link>
          {/* Ícone do menu mobile */}
          <div className="lg:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu className='text-white'/>}
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed top-20 left-0 right-0 bottom-0 bg-black/70 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Navbar Mobile */}
      <div
        className={`fixed top-20 px-8 font-semibold left-0 w-full bg-[#fff] text-black flex flex-col items-start py-6 space-y-4 shadow-lg z-50 transition-all duration-500 ease-in-out ${
          menuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'
        }`}
      >
        <Link
          href="#"
          onClick={closeMenu}
          className="text-lg hover:text-[#4a4a4a] transition-colors duration-300"
        >
          Início
        </Link>
        <Link
          href="#sobre"
          onClick={closeMenu}
          className="text-lg hover:text-[#4a4a4a] transition-colors duration-300"
        >
          Funcionalidades
        </Link>
        <Link
          href="#planos"
          onClick={closeMenu}
          className="text-lg hover:text-[#4a4a4a] transition-colors duration-300"
        >
          Planos e Preços
        </Link>
        <Link
          href="https://obian.com.br"
          onClick={closeMenu}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg hover:text-[#4a4a4a] transition-colors duration-300"
        >
          Sobre a Obian
        </Link>

        <div className="flex items-center gap-4 pt-4 w-full">
          <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
              closeMenu()
            }}
            className="w-full font-bold text-center flex items-center justify-center gap-1 px-4 py-2 bg-[#598EC2] text-white text-[15px] transition-all hover:shadow-lg hover:bg-[#4b6e92] rounded"
          >
            Teste Grátis Por 15 Dias
          </Link>
        </div>
      </div>
    </>
  );
}
