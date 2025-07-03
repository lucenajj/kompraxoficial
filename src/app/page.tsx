'use client';

import "@fontsource/open-sans/700.css";
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import SlideContent from "./components/hero-componets/slideContent";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";

import Link from "next/link";
import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(() => import('./components/WhatsAppButton'), {
  ssr: false,
});

import { FaCheck } from "react-icons/fa6";

import heroImg from "../../public/img/home-komprax.png";
import screen1 from "../../public/img/screens/screen1.png";
import screen2 from "../../public/img/screens/screen2.png";
import screen3 from "../../public/img/screens/screen3.png";
import screen4 from "../../public/img/screens/screen4.png";
import screen5 from "../../public/img/screens/screen5.png";

const associations = [
  { logo: "/img/logo/association1.png", width: 150, height: 100 },
  { logo: "/img/logo/association2.png", width: 220, height: 180 },
  { logo: "/img/logo/association3.png", width: 150, height: 100 },
  { logo: "/img/logo/association4.png", width: 150, height: 100 },
  { logo: "/img/logo/association5.png", width: 120, height: 100 },
  { logo: "/img/logo/association6.png", width: 150, height: 100 },
  { logo: "/img/logo/association7.png", width: 150, height: 100 },
  { logo: "/img/logo/association8.png", width: 150, height: 100 },
  { logo: "/img/logo/association9.png", width: 150, height: 100 },
  { logo: "/img/logo/association10.png", width: 150, height: 100 },
  { logo: "/img/logo/association11.png", width: 150, height: 100 },
  { logo: "/img/logo/association12.png", width: 150, height: 100 },
  { logo: "/img/logo/regulator1.png", width: 80, height: 100 },
  { logo: "/img/logo/regulator2.png", width: 150, height: 100 },
  { logo: "/img/logo/regulator3.png", width: 110, height: 100 },
];

export default function Home() {
  const openChatbot = () => {
    window.location.hash = "#chat-obiana"; 
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<SwiperClass | null>(null);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Navbar />
      <section id="hero" className="relative w-full min-h-[550px] sm:min-h-[650px] flex items-center">
        {/* Imagem de fundo */}
        <div className="fixed z-[-10] inset-0">
          <Image
            src={heroImg}
            alt="Fundo do Sistema KOMPRAX"
            fill style={{ objectFit: "cover" }}
            className="brightness-10"
          />
        </div>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Conteúdo alinhado à esquerda */}
        <div className="relative z-10 flex flex-col items-start justify-center text-left px-8 sm:px-12 lg:px-16 w-full">
          {/* Título principal chamativo */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl lg:max-w-4xl">
            <span className="text-[#598EC2]">Potencialize</span> os resultados da sua associação veicular
          </h1>

          {/* Subtítulo com gatilhos de conversão */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl lg:max-w-3xl mt-4">
            Simplifique cotações, centralize negociações e tome decisões inteligentes.
            Reduza custos e ganhe tempo com a <strong className="text-white">solução nº1 para associações de proteção veicular.</strong>
          </p>

          {/* Botões estratégicos para conversão */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="#chat-obiana"
              onClick={(e) => {
                e.preventDefault();
                openChatbot();
              }} 
              className="bg-[#598EC2] text-white px-8 py-4 font-medium rounded-lg text-base sm:text-lg shadow-lg 
                        hover:bg-[#466b8e] transition-all duration-300 text-center w-fit"
            >
              <span>Solicite uma demonstração</span>
            </Link>
            <Link
              href="#planos"
              className="border-2 border-white text-white font-medium px-8 py-4 rounded-lg text-base sm:text-lg shadow-lg
                        hover:bg-white hover:text-gray-800 transition-all duration-300 text-center w-fit"
            >
              Ver Planos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            <span className="text-[#598EC2]">Otimize sua gestão</span> e elimine <span className="text-red-600">falhas</span> no processo de compras
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mt-3 sm:mt-4 max-w-3xl mx-auto">
            Processos manuais geram <b>custos desnecessários e atrasos</b>. Descubra como evitar erros e melhorar a eficiência da sua associação.
          </p>
        </div>

        {/* Cards de Desafios e Soluções */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              challenge: "Falta de controle sobre cotações e pedidos.",
              solution: "Automatização Total",
              icon: "⚡",
              description: "Envio automático para fornecedores em segundos"
            },
            {
              challenge: "Erros manuais e retrabalho constante.", 
              solution: "Precisão Garantida",
              icon: "🎯",
              description: "Sistema integrado elimina falhas humanas"
            },
            {
              challenge: "Dificuldade para encontrar o melhor preço.",
              solution: "Comparação Inteligente", 
              icon: "📊",
              description: "Visualize e compare ofertas lado a lado"
            },
            {
              challenge: "Falta de automação no processo de aprovação.",
              solution: "Fluxo Otimizado",
              icon: "🚀", 
              description: "Aprovações rápidas com controle total"
            }
          ].map((item, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Header com ícone */}
              <div className="bg-gradient-to-r from-[#598EC2] to-[#6ba3d1] p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-white font-semibold text-sm">{item.solution}</h3>
              </div>
              
              {/* Conteúdo */}
              <div className="p-5">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Problema:</div>
                <p className="text-gray-600 text-sm mb-3 line-through opacity-60">{item.challenge}</p>
                
                <div className="text-xs text-[#598EC2] uppercase tracking-wide mb-2 font-medium">Solução:</div>
                <p className="text-gray-800 text-sm font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
            }} 
            className="inline-flex items-center bg-[#598EC2] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg 
                      hover:bg-[#466b8e] hover:scale-105 transition-all duration-300"
          >
            Ver Como Funciona
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título impactante */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Chega de processos manuais e falta de controle
          </h2>

          {/* Subtítulo */}
          <p className="text-sm sm:text-lg text-gray-700 mt-3 sm:mt-4 mx-auto">
            Com o <span className="text-[#598EC2] font-bold">KompraX</span>, sua associação gerencia compras de peças para veículos sinistrados de forma rápida e sem complicações.
          </p>
        </div>

        {/* Benefícios - Cards Elegantes */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Automatização Total", desc: "Do cadastro do veículo à aprovação final em poucos cliques.", icon: "🔄" },
            { title: "Cotações Inteligentes", desc: "Solicitações enviadas para fornecedores automaticamente.", icon: "💡" },
            { title: "Melhores Preços Garantidos", desc: "Compare orçamentos e escolha a melhor opção.", icon: "💰" },
            { title: "Integração com Cilia e SGA", desc: "Cadastro automatizado de sinistros e peças.", icon: "🔗" },
            { title: "Controle Financeiro Preciso", desc: "Pagamentos, previsões e aprovações em um só lugar.", icon: "📈" },
            { title: "Economia de Tempo e Custos", desc: "Sua equipe ganha eficiência e reduz gastos.", icon: "⏱️" },
          ].map((benefit, index) => (
            <div key={index} className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-green-50 rounded-lg p-3 group-hover:bg-green-100 transition-colors">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chamada para ação */}
        <div className="mt-12 text-center">
          <p className="text-lg font-semibold text-gray-800 mb-6">
            Transforme a gestão da sua associação agora mesmo!
          </p>
          <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
            }} 
            className="inline-flex items-center bg-[#598EC2] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg 
                      hover:bg-[#466b8e] hover:scale-105 transition-all duration-300"
          >
            Solicitar Demonstração
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.97 8.97 0 01-4.906-1.453L3 21l2.453-5.094A8.97 8.97 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
          </Link>
        </div>
      </section>

      <section id="sobre" className="py-16 px-[5%] bg-[#f0f0f0] text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            O que é o <span className="text-[#598EC2]">KompraX</span>
          </h2>
          <p className="text-lg mb-4">
            O <b>KompraX</b> é um sistema <b>100% na nuvem</b>, desenvolvido para <b>associações de proteção veicular</b>, 
            que <b>agiliza, gerencia e organiza</b> compras de forma eficiente. Ele <b>automatiza orçamentos</b>, 
            envia cotações para fornecedores e <b>elimina inserções manuais</b>, integrando-se com sistemas como
            <b> Cilia</b> e <b>SGA</b> para importar dados diretamente de XMLs.
          </p>
          <p className="text-lg mb-6">
            Agende uma reunião com nossos especialistas e teste o KompraX <b>gratuitamente</b>. Descubra como 
            podemos automatizar e otimizar sua gestão de compras, reduzindo custos e aumentando a eficiência!
          </p>
          
          {/* Botão CTA alinhado à esquerda */}
          <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
            }} 
            className="bg-[#598EC2] text-white font-semibold px-6 py-3 rounded-lg text-md shadow-xl 
                      hover:bg-[#6090c0] transition-all duration-300 inline-block"
          >
            Agendar Reunião
          </Link>
        </div>
      </section>

      <section id="dados" className="py-4 pb-[120px] pt-10 px-[5%] bg-[#dfdfdf] text-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Texto à esquerda */}
          <div className="md:w-1/2 md:mt-[100px] text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              Crie e gerencie suas pré-cotações com facilidade
            </h2>
            <p className="text-md md:text-lg mb-4">
              Gere cotações de forma automatizada a partir de sistemas como Cilia.
            </p>
          </div>

          {/* Imagem à direita */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={screen2}
              alt="Dashboard de Indicadores"
              className="w-full max-h-[500px] max-w-[600px] object-cover"
            />
          </div>
        </div>
      </section>


      <section id="dados" className="py-4 bg-[#ffffff] text-gray-800">
        <div className="relative md:mx-[5%] bottom-[90px] bg-[#598EC2] shadow-2xl py-[30px] px-[2%] md:p-[30px] md:rounded-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl px-[10px] md:px-0 font-bold text-white">
            Envie e controle suas cotações com poucos cliques
          </h2>
          <p className="text-md sm:text-lg md:text-lg px-[10px] md:px-0 mt-[5px] text-white mb-4">
            Visualize e compare fornecedores aprovados, rejeitados e pendentes.
          </p>
          <div>
            <Image
              src={screen3}
              alt="Dashboard de Indicadores"
              className="w-full max-h-[500px] rounded-md shadow-xl"
            />
          </div>
        </div>
        <div className="max-w-5xl px-[5%] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Comparação Inteligente de Preços
          </h2>
          <p className="text-md md:text-lg mb-4 text-gray-700">
            Compare os valores das cotações em tempo real e escolha a melhor opção para seu negócio.
          </p>
          <Image
            src={screen1}
            alt="Dashboard de Indicadores"
            className="w-full max-h-[500px] rounded-md max-w-[900px]"
          />
        </div>
      </section>

      <section id="dados" className="py-14 bg-[#ececec] text-gray-800">
        <div className="max-w-5xl px-[5%] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Gerencie e monitore as compras em processo de aprovação
          </h2>
          <p className="text-md md:text-lg mb-8 text-gray-700">
            Veja quais compras ainda precisam de autorização para serem concluídas.
          </p>
          <Image
            src={screen4}
            alt="Dashboard de Indicadores"
            className="w-full max-h-[400px] rounded-md mx-auto max-w-[600px] shadow-lg"
          />
        </div>
      </section>

      <div className="bg-[#ffffff] shadow-2xl mx-auto px-[3%] md:px-[10%] py-[70px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl px-[10px] md:px-0 font-bold text-gray-800">
            Tenha acesso às compras concluídas e domine a gestão
          </h2>
          <p className="text-md sm:text-lg md:text-lg px-[10px] md:px-0 mt-[5px] text-gray-700 mb-4">
            Gere relatórios e consulte o histórico de compras com facilidade
          </p>
          <div>
            <Image
              src={screen5}
              alt="Dashboard de Indicadores"
              className="w-full max-h-[500px] rounded-md shadow-xl"
            />
          </div>
        </div>

        <section
          className="w-full relative lg:py-[50px] z-0 pt-12 lg:pt-20 bg-gradient-to-r from-[#598EC2] to-[#3B6CA8] lg:h-[350px] flex items-center px-[5%]"
        >

        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full"
        >
          <SwiperSlide>
            <SlideContent 
              title="Análise de Compras e Veículos"
              description="Acompanhe suas compras e veículos atendidos ao longo do tempo. Com o KompraX, você tem controle total sobre a média de compras, número de aquisições e veículos atendidos, garantindo decisões mais estratégicas."
              imageSrc="/img/screens/graphic3.png"
              imageWidth={500}
              imageHeight={250}
              imageAlt="Gráficos de compras e veículos atendidos"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SlideContent 
              title="Fornecedores Mais Utilizados"
              description="Visualize os principais fornecedores e sua representatividade nas compras do mês. O KompraX oferece insights detalhados para otimizar negociações e garantir os melhores preços para sua associação."
              imageSrc="/img/screens/graphic1.jpg"
              imageAlt="Gráfico de fornecedores do mês"
              className="lg:flex-row-reverse"
              imageWidth={300}
              imageHeight={200}
            />
          </SwiperSlide>

          <SwiperSlide>
            <SlideContent 
              title="Previsão Financeira"
              description="Monitore a previsão financeira da sua associação e veja os valores estimados para os próximos meses. Com essa visão estratégica, você pode se preparar melhor para futuras despesas e otimizar seu fluxo de caixa."
              imageSrc="/img/screens/graphic2.jpg"
              imageAlt="Gráfico de previsão financeira"
              imageWidth={300}
              imageHeight={200}
            />
          </SwiperSlide>

        </Swiper>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={toggleAutoplay}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <IoMdPause size={20} /> : <FaPlay size={20} />}
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
