'use client'

import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import Bot from "../../../public/img/bot.webp";
import { AiOutlineSend } from "react-icons/ai";


const WhatsAppChatBot: React.FC = () => {
  const [userMessage, setUserMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([]);

  // Chat começa vazio - cliente envia primeira mensagem
  useEffect(() => {
    if (mounted) {
      setChatMessages([]); // Chat completamente vazio
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      setShowChat(window.location.hash === "#chat-obiana");
    }
  }, [mounted]);

  const getTimeString = () => {
    // Evita problemas de hidratação retornando string vazia no servidor
    if (!mounted || typeof window === 'undefined') {
      return "";
    }
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const addBotMessage = (message: string) => {
    setTimeout(() => {
      const timeString = getTimeString();
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: message, time: timeString },
      ]);
    }, 100);
  };

  // Função para chat livre com IA usando trigger específico
  const handleFreeMessage = async (message: string) => {
    console.log('💬 [Chat] Mensagem livre recebida:', message);
    
    if (!message.trim()) {
      alert("Por favor, digite uma mensagem.");
      return;
    }

    // Adicionar mensagem do usuário
    const timeString = getTimeString();
    setChatMessages((prev) => [...prev, { 
      sender: "user", 
      text: message, 
      time: timeString
    }]);

    // Mostrar typing
    setIsTyping(true);

    try {
      // Payload específico para trigger de chat
      const chatPayload = {
        message: message,
        timestamp: new Date().toISOString(),
        chatId: `chat_${Date.now()}`,
        source: 'website_komprax'
      };

      console.log('🤖 [Chat] Enviando para webhook de chat:', chatPayload);

      // Usar webhook específico para chat
      const response = await fetch('https://webhookub.mooveinsd.com.br/webhook/9bfc9c55-93c6-474f-943b-42788b1d5826/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'KompraX-Chat/1.0'
        },
        body: JSON.stringify(chatPayload)
      });

      console.log('📡 [Chat] Status resposta:', response.status);

      if (response.ok) {
      const result = await response.json();
        console.log('🎯 [Chat] Resposta completa da IA:', result);

      setIsTyping(false);

        // Capturar a resposta da IA do campo "output"
        const aiResponse = result.output || result.response || result.message;
        
        if (aiResponse) {
          console.log('🤖 [Chat] Resposta da IA capturada:', aiResponse);
        setTimeout(() => {
            addBotMessage(aiResponse);
        }, 500);
      } else {
          console.log('⚠️ [Chat] Nenhuma resposta da IA, usando fallback');
        setTimeout(() => {
            addBotMessage(`Obrigada pela sua mensagem! 😊<br/><br/>Nossa equipe está analisando sua solicitação sobre <b>"${message}"</b> e retornará em breve.<br/><br/>💬 Tem mais alguma dúvida?`);
        }, 500);
        }
      } else {
        throw new Error(`Webhook error: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ [Chat] Erro no chat:', error);
      setIsTyping(false);
      
      setTimeout(() => {
        addBotMessage(`Desculpe, houve um probleminha técnico. 😅<br/><br/>Mas sua mensagem foi registrada! Nossa equipe entrará em contato em breve.<br/><br/>💬 Pode tentar fazer outra pergunta?`);
      }, 500);
    }

    // Limpar campo de mensagem
    setUserMessage('');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <a
        onClick={() => setShowChat(!showChat)}
        aria-label="Botão do WhatsApp"
      >
        <div
          onClick={() => {
            setShowChat(false);
            if (typeof window !== 'undefined') {
              window.history.replaceState(null, "", window.location.pathname);
            }
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
          <div 
            className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm" 
            onClick={() => {
              setShowChat(false);
              if (typeof window !== 'undefined') {
                window.history.replaceState(null, "", window.location.pathname);
              }
            }}    
          />
          <div className="fixed bottom-[0px] sm:bottom-[40px] lg:bottom-[110px] sm:right-5 backdrop-blur-md bg-gray-100 shadow-2xl sm:rounded-lg w-full sm:w-[400px] h-full sm:h-[82vh] sm:max-h-[630px] z-[9000] flex flex-col">
            <div className="flex items-center justify-between bg-[#598EC2] shadow-3xl text-white p-2 sm:rounded-t-lg">
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
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }}                            
              />
            </div>

            <div className="flex-1 overflow-y-auto mb-2 max-h-[420px] md:max-h-[462px] p-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex mb-3 ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                  {msg.sender === "bot" && index !== 0 && (
                    <Image 
                      src={Bot} 
                      className="w-6 h-6 border-2 border-[#598EC2] mt-[3px] rounded-full mr-2" 
                      alt="Bot" 
                    />
                  )}
                  
                  <div className="flex flex-col">
                    <div className={`inline-block px-3 py-2 rounded-lg text-[14px] 
                      ${msg.sender === "bot" ? "bg-gray-200 text-black" : "bg-[#598EC2] text-white"}`}>
                      <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>

                    {msg.time && (
                      <div className={`text-[10px] mt-1 ${msg.sender === "bot" ? "text-gray-500 text-left" : "text-gray-500 text-right"}`}>
                        {msg.time}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-2">
                  <Image src={Bot} className="w-6 h-6 border-2 border-[#598EC2] rounded-full" alt="Bot" />
                  <div className="bg-gray-200 px-2 py-1 rounded-lg">
                    <span className="text-gray-600 font-bold text-sm flex items-center">
                      <span className="animate-bounce mx-[1px]">.</span>
                      <span className="animate-bounce delay-200 mx-[1px]">.</span>
                      <span className="animate-bounce delay-400 mx-[1px]">.</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Campo de input sempre visível */}
              <div className="absolute bottom-0 rounded-b-md left-0 right-0 p-3 flex items-center gap-2 bg-white border-t border-gray-300">
                <input
                  type="text"
                  value={userMessage}
                  placeholder="Digite sua mensagem..."
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleFreeMessage(userMessage);
                    }
                  }}
                  className="flex-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#598EC2] transition"
                />
                
                <button
                  onClick={() => handleFreeMessage(userMessage)}
                  className="p-3 bg-[#598EC2] text-white rounded-md shadow-md hover:bg-[#426b9c] transition flex items-center justify-center"
                >
                  <AiOutlineSend className="text-2xl" />
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatBot;
