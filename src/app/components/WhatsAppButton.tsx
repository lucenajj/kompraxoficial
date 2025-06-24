'use client'

import React, { useState, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import Bot from "../../../public/img/bot.webp";
import { AiOutlineSend } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { useCallback } from "react";

import ButtonOption from "../components/chatbot-components/ButtonOption"

const notificationSound = "/sounds/notificacao.mp3";

const WhatsAppChatBot: React.FC = () => {
  const [isDivHidden, setIsDivHidden] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedServicePlan, setSelectedServicePlan] = useState("");
  const [userName, setUserName] = useState("");
  const [userEnterprise, setUserEnterprise] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [promoActive, setPromoActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowChat(window.location.hash === "#chat-obiana");
    }
  }, []);  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTimeLeft = Number(localStorage.getItem("timeLeft") || "0");
  
      if (savedTimeLeft <= 0) {
        console.log("🔴 Promoção expirada! Limpando `localStorage`.");
        localStorage.removeItem("promoActive");
        localStorage.removeItem("timeLeft");
        setPromoActive(false);
      } else {
        console.log("✅ Promoção ainda ativa!", savedTimeLeft);
        setPromoActive(true);
      }
    }
  }, []);  

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: `Olá! 👋 Sou a assistente virtual da Obian Sistemas. Responda as próximas <b>5 perguntas rápidas</b>, e um de nossos especialistas irá te chamar para agendarmos uma reunião! 🚀<br/>E fique tranquilo, seus dados estão seguros. 🔒`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Referência para o final da lista de mensagens
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [questionSent, setQuestionSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const addBotMessageDelay = useCallback((message: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: message, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
      setIsTyping(false);
    }, 2000);
  }, [setChatMessages]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });

    if (!questionSent) {
      addBotMessageDelay("Vamos começar! 😍 <br/> <b> Qual plano você mais se identificou?</b>");
      setQuestionSent(true);
    }
  }, [chatMessages, questionSent, addBotMessageDelay]);

  // Função para tocar o som de notificação
  const playNotificationSound = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
  
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Áudio tocado com sucesso.");
          })
          .catch((error) => {
            console.warn("Reprodução de áudio bloqueada:", error);
          });
      }
    }
  };
  

  // Função para adicionar mensagem do bot com atraso
  const addBotMessage = (message: string) => {
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: message, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
      playNotificationSound();
    }, 0,1); // segundo de atraso
  };

  // Função para atrasar a visibilidade dos inputs/botões (apresentar apenas após a mensagem de solicitação)
  const displayDelay = (
    func: (step: number) => void,
    step: number,
    time: number
  ) => {
    setTimeout(() => {
      func(step);
    }, time);
  };

  const handleServiceSelection = (service: string) => {
    setSelectedServicePlan(service);
    setChatMessages((prev) => [...prev, { sender: "user", text: service, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setStep(6);
  
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage("Ótima escolha! 😃<br/><b>Como podemos te chamar?</b>");
      setIsTyping(false);
      displayDelay(setStep, 2, 2000);
    }, 2000);
  };
  

  const handleNameSubmit = () => {
    if (!userName) {
      alert("Por favor, informe o seu nome.");
      return;
    }
    setChatMessages((prev) => [...prev, { sender: "user", text: userName, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setStep(6); // Pausa antes da próxima pergunta
  
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(`Prazer em conhecê-lo, ${userName}. 🤝<br/>Pode nos mandar alguma <b>rede social da sua empresa/instituição?</b>`);
      setIsTyping(false);
      displayDelay(setStep, 3, 2000);
    }, 2000);
  };
  

  const handleEnterpriseSubmit = () => {
    if (!userEnterprise) {
      alert("Por favor, informe o nome da sua empresa.");
      return;
    }
    setChatMessages((prev) => [...prev, { sender: "user", text: userEnterprise, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setStep(6); // Pausa antes da próxima pergunta
  
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage("Ok! 😎<br/>Qual é o seu <b>número de WhatsApp</b> para que nossa equipe possa entrar em contato com você?");
      setIsTyping(false);
      displayDelay(setStep, 4, 2000);
    }, 2000);
  };
  

  const handleNumberSubmit = () => {
    if (!userNumber) {
      alert("Por favor, informe seu número de WhatsApp.");
      return;
    }
    setChatMessages((prev) => [...prev, { sender: "user", text: userNumber, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setStep(6); // Pausa antes da próxima pergunta
  
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage("Perfeito! 🎯<br/>Agora por último, <b>deixe uma mensagem para nossa equipe</b> (opcional):");
      setIsTyping(false);
      displayDelay(setStep, 5, 2000);
    }, 2000);
  };
  

  const handleSubmit = async () => {
    console.log('🚀 [Chat] handleSubmit chamado!');
    console.log('🔍 [Chat] Dados atuais:', {
      userName,
      userNumber,
      selectedServicePlan,
      userEnterprise,
      userMessage,
      step
    });

    if (!userName || !userNumber || !selectedServicePlan) {
      console.log('❌ [Chat] Campos obrigatórios faltando!');
      alert("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return;
    }

    console.log('✅ [Chat] Validação OK, iniciando envio...');

    // Desabilitar botão durante envio
    const submitButton = document.querySelector('#submit-button') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      console.log('🔄 [Chat] Botão desabilitado');
    }

    try {
      const payload = {
        selectedServicePlan,
        userName,
        userEnterprise,
        userNumber,
        userMessage: userMessage || '',
        promoActive
      };

      console.log('🚀 [Frontend] Enviando payload:', payload);

      const response = await fetch('/api/webhook/n8n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 [Frontend] Response status:', response.status, response.statusText);

      const result = await response.json();
      console.log('📥 [Frontend] Response data:', result);

      if (result.success) {
        // Sucesso - mostrar mensagem personalizada
        setChatMessages((prev) => [
          ...prev,
          { 
            sender: "bot", 
            text: `✅ <b>Dados enviados com sucesso!</b><br/><br/>📋 <b>ID do Lead:</b> ${result.data.leadId}<br/>⏱️ <b>Tempo estimado de resposta:</b> ${result.data.estimatedResponse}<br/><br/><b>Próximos passos:</b><br/>${result.data.nextSteps.map((step: string, i: number) => `${i + 1}. ${step}`).join('<br/>')}`, 
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);

        // Limpar formulário
        setUserName('');
        setUserEnterprise('');
        setUserNumber('');
        setUserMessage('');
        setSelectedServicePlan('');
        setStep(7); // Estado final
      } else {
        throw new Error(result.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('❌ [Frontend] Erro ao enviar dados:', error);
      console.error('❌ [Frontend] Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack'
      });
      
      // Mensagem de erro amigável
      setChatMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: `❌ <b>Ops! Algo deu errado.</b><br/><br/>😅 ${error instanceof Error ? error.message : 'Erro interno do sistema.'}<br/><br/>💬 <b>Alternativa:</b> Entre em contato diretamente via WhatsApp no botão verde ao lado.`, 
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      // Reabilitar botão
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
      }
    }
  };  
  
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Impede a quebra de linha
  
      if (step === 2) {
        handleNameSubmit();
      } else if (step === 3) {
        handleEnterpriseSubmit();
      } else if (step === 4) {
        handleNumberSubmit();
      } else if (step === 5) {
        handleSubmit();
      }
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setChatMessages((prev) => prev.slice(0, -1)); // Remove última mensagem do usuário
      setStep((prev) => prev - 1); // Retrocede o step
    
      setIsTyping(true);
    
      setTimeout(() => {
        if (step === 2) {
          addBotMessage("Vamos de novo! 😍 <br/> <b> Qual plano você mais se identificou?</b>");
        } else if (step === 3) {
          addBotMessage("Ótima escolha! 😃<br/><b>Como podemos te chamar?</b>");
        } else if (step === 4) {
          addBotMessage(`Prazer em conhecê-lo, ${userName}. 🤝<br/>Pode nos mandar alguma <b>rede social da sua empresa/instituição?</b>`);
        } else if (step === 5) {
          addBotMessage("Ok! 😎<br/>Qual é o seu <b>número de WhatsApp</b> para que nossa equipe possa entrar em contato com você?");
        } else if (step === 6) {
          addBotMessage("Perfeito! 🎯<br/>Agora por último, <b>deixe uma mensagem para nossa equipe</b> (opcional):");
        }
    
        setIsTyping(false);
      }, 1000);
    }
  };
  
  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = "hidden"; // Desabilita rolagem da página
    } else {
      document.body.style.overflow = "auto"; // Restaura a rolagem
    }
  
    return () => {
      document.body.style.overflow = "auto"; // Garante que a rolagem volte ao normal ao desmontar
    };
  }, [showChat]);
  

  useEffect(() => {
    const checkHash = () => {
      setShowChat(window.location.hash === "#chat-obiana");
    };
  
    checkHash();
  
    window.addEventListener("hashchange", checkHash);
  
    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);
  
  
  
  return (
    <div>
      {/* Áudio de notificação */}
      <audio ref={audioRef} src={notificationSound} />

      <a
        onClick={() => {
          setShowChat(!showChat);
          setIsDivHidden(true);
        }}
        aria-label="Botão do WhatsApp"
      >
        {!isDivHidden && (
          <div className="divx fixed bottom-12 flex gap-2 items-center right-28 text-white rounded-md px-3 py-[6px] shadow-lg bg-[#6e6e6e] hover:bg-[#7c7c7c] cursor-pointer">
            <button
              className="botaox text-[17px] rounded-full border-[1px] border-black bg-gray-100 p-[1px] right-[208px] sm:right-[254px] bottom-[29px] text-black absolute transition-transform duration-300 transform hover:scale-110 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsDivHidden(true);
              }}
            >
              <MdClose />
            </button>
            <div className="absolute h-[13px] w-[13px] bg-green-500 border-[2px] left-[32px] top-[24px] rounded-full border-white"></div>
            <div className="flex items-center font-medium gap-2">
              <Image
                src={Bot}
                className="rounded-full border-white border-[2px] w-[30px]"
                alt="LiaXBot"
              />
            </div>
            <p className="text-[12px] sm:text-[16px]">Vamos marcar uma reunião?</p>
          </div>
        )}

        <div
          onClick={() => {
            setShowChat(false);
            window.history.replaceState(null, "", window.location.pathname);
          }}
          className="fixed z-[8999] lg:z-[9000] bottom-9 right-9 text-white border-2 border-[#598EC2] rounded-full p-3 shadow-lg transition-transform duration-300 transform hover:scale-110 backdrop-blur-md bg-[#000000]/30 cursor-pointer">
          {showChat ? (
            <MdClose className="text-[40px]" />
          ) : (
            <MdOutlineMarkUnreadChatAlt className="text-[40px]" /> 
          )}
        </div>
      </a>


      {showChat && (
        <div className="fixed inset-0 z-[8999]">
        {/* Fundo escurecido */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm" 
          onClick={() => {
            setShowChat(false);
            window.history.replaceState(null, "", window.location.pathname);
          }}    
        />
        <div className="fixed bottom-[0px] sm:bottom-[40px] lg:bottom-[110px] sm:right-5 backdrop-blur-md bg-gray-100 shadow-2xl sm:rounded-lg w-full sm:w-[400px] h-full sm:h-[82vh] sm:max-h-[630px] z-[9000] flex flex-col">
          <div className="flex items-center justify-between bg-chatbot shadow-3xl text-white p-2 sm:rounded-t-lg">
            <div className="absolute h-[13px] w-[13px] bg-green-500 border-[2px] left-[27px] top-[31px] rounded-full border-white"></div>
            <div className="flex items-center font-medium gap-2">
              <Image
                src={Bot}
                className="rounded-full border-white border-[2px] w-[30px]"
                alt="LiaXBot"
              />
              <div>
                <h2 className="mt-[5px]">Obiana</h2>
                <p className="text-[10px] ml-[1px] mt-[-3px] text-gray-300">Online</p>
              </div>
            </div>
            <IoCloseOutline
              className="cursor-pointer text-[30px]"
              onClick={() => {
                setShowChat(false);
                window.history.replaceState(null, "", window.location.pathname);
              }}                            
            />
          </div>

          <div className="flex-1 overflow-y-auto mb-2 max-h-[420px] md:max-h-[462px] p-2">
          {chatMessages.map((msg, index) => (
          <div key={index} className={`flex mb-3 ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>

            {msg.sender === "bot" && index !== 1 ? (
              <Image 
                src={Bot} 
                className="w-6 h-6 border-2 border-[#598EC2] mt-[3px] rounded-full mr-2" 
                alt="Bot" 
              />
            ) : (
              <div className="w-6 h-6 mr-2" />
            )}

            <div className="flex flex-col">
              {/* Mensagem */}
              <div className={`inline-block px-3 py-2 rounded-lg text-[14px] 
                ${msg.sender === "bot" ? "bg-gray-200 text-black" : "bg-[#598EC2] text-white"}`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>

              {index !== 0 && (
                <div className={`text-[10px] mt-1 ${msg.sender === "bot" ? "text-gray-500 text-left" : "text-gray-500 text-right"}`}>
                  {msg.time}
                </div>
              )}

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-2">
            <div className="bg-gray-200 px-2 py-1 rounded-lg">
              <span className="text-gray-600 font-bold text-sm flex items-center">
                <span className="animate-bounce mx-[1px]">.</span>
                <span className="animate-bounce delay-200 mx-[1px]">.</span>
                <span className="animate-bounce delay-400 mx-[1px]">.</span>
              </span>
            </div>
          </div>
        )}


            <div ref={endOfMessagesRef} />
          </div>

          {step === 1 && (
            <div className="p-3 text-[14px] flex flex-col items-end">
              <ButtonOption onClick={() => handleServiceSelection("Plano Básico")} text="Plano Básico" color="border-[#A3CFF5]"/>
              <ButtonOption onClick={() => handleServiceSelection("Plano Profissional")} text="Plano Profissional" color="border-[#2264D1]"/>
              <ButtonOption onClick={() => handleServiceSelection("Plano Premium")} text="Plano Premium" color="border-[#7D3AC1]"/>
              <ButtonOption onClick={() => handleServiceSelection("Plano Exclusivo")} text="Plano Exclusivo" color="border-[#D4AF37]"/>
              <a 
                href="#planos"
                className="text-center flex flex-row gap-1 items-center mb-2 py-[10px] text-gray-800 px-3 
                  text-chatbotText font-semibold text-[14px]
                  transition-all duration-300 ease-in-out transform
                 hover:text-[#4b7cbf] underline
                  active:scale-95 cursor-pointer
                  focus:ring-4 focus:ring-[#598EC2]/50 ">
                Ver opções de planos <FaArrowRightLong />
              </a>
            </div>
          )}

        {step >= 2 && step <= 5 && (
          <div className="absolute bottom-0 rounded-b-md left-0 right-0 p-3 flex items-center gap-2 bg-white border-t border-gray-300">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="text-gray-800 text-[26px] hover:text-gray-600 transition flex items-center justify-center disabled:opacity-50"
            >
              <RiArrowGoBackLine />
            </button>

            <input
              type={step === 4 ? "tel" : "text"}
              value={
                step === 2 ? userName :
                step === 3 ? userEnterprise :
                step === 4 ? userNumber :
                step === 5 ? userMessage : ""
              }
              placeholder={
                step === 2 ? "Digite seu nome*" :
                step === 3 ? "Rede social da empresa*" :
                step === 4 ? "Seu WhatsApp*" :
                step === 5 ? "Sua mensagem (opcional)" : ""
              }
              onChange={(e) =>
                step === 2 ? setUserName(e.target.value) :
                step === 3 ? setUserEnterprise(e.target.value) :
                step === 4 ? setUserNumber(e.target.value) :
                step === 5 ? setUserMessage(e.target.value) :
                null
              }
              onKeyDown={handleKeyDown}
              className="flex-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#598EC2] transition"
            />
            
            <button
              id="submit-button"
              onClick={(e) => {
                console.log(`🔥 [Chat] Botão clicado! Step: ${step}`);
                const handler = step === 2 ? handleNameSubmit :
                              step === 3 ? handleEnterpriseSubmit :
                              step === 4 ? handleNumberSubmit :
                              step === 5 ? handleSubmit : () => {};
                handler();
              }}
              className="p-3 bg-[#598EC2] text-white rounded-md shadow-md hover:bg-[#426b9c] transition flex items-center justify-center"
            >
              <AiOutlineSend className="text-2xl" />
            </button>
          </div>
        
        )}

          {step === 6 && <div className="p-3"></div>}
        </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatBot;
