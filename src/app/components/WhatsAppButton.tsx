'use client'

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { MdOutlineMarkUnreadChatAlt, MdClose, MdMinimize } from "react-icons/md";

const WhatsAppChatBotInner: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      setShowChat(window.location.hash === "#chat-obiana");
    }
  }, [mounted]);

  const toggleChat = () => {
    setShowChat(!showChat);
    setIsMinimized(false);
    if (typeof window !== 'undefined') {
      if (!showChat) {
        window.history.replaceState(null, "", window.location.pathname + "#chat-obiana");
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Botão flutuante moderno */}
      <div className="fixed bottom-6 right-6 z-[8999]">
        <button
          onClick={toggleChat}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-[#598EC2] to-[#4a7bb1] hover:from-[#4a7bb1] hover:to-[#3b689f] shadow-xl hover:shadow-2xl transition-all duration-300 p-0 group border-0 cursor-pointer relative overflow-hidden flex items-center justify-center"
          style={{ minWidth: '64px', minHeight: '64px' }}
        >
          <MdOutlineMarkUnreadChatAlt className="text-white text-[36px] group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          
          {/* Efeito de ondas */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Chat Popup */}
      {showChat && (
        <div className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${
          showChat ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}>
          <div className={`w-[400px] max-w-[90vw] shadow-2xl border-0 overflow-hidden transition-all duration-300 rounded-lg bg-white ${
            isMinimized ? 'h-16' : 'h-[600px] max-h-[80vh]'
          }`}>
            
            {/* Header moderno */}
            <div className="bg-gradient-to-r from-[#598EC2] via-[#4a7bb1] to-[#598EC2] text-white p-4 relative overflow-hidden">
              {/* Padrão de fundo decorativo */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] bg-[length:60px_60px]"></div>
              </div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <span className="text-lg font-bold">K</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Chat</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-white/90">Assistente online</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={minimizeChat}
                    className="h-9 w-9 text-white hover:bg-white/10 transition-colors rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center"
                  >
                    <MdMinimize className="text-[16px]" />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="h-9 w-9 text-white hover:bg-white/10 transition-colors rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center"
                  >
                    <MdClose className="text-[16px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Conteúdo do Chat - Iframe */}
            {!isMinimized && (
              <div className="p-0 h-full bg-gradient-to-b from-gray-50 to-white relative">
                {/* Padrão de fundo sutil */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full bg-gray-100/30 bg-[conic-gradient(at_center,_transparent_0deg,_rgb(156_146_172_/_0.03)_90deg,_transparent_180deg)]"></div>
                </div>
                
                <div className="relative h-full rounded-b-lg overflow-hidden">
                  <iframe
                    src="https://webhookub.mooveinsd.com.br/webhook/1a7ff005-dbd8-40fc-a0f7-2c675a2f3c94/chat"
                    className="w-full border-0 rounded-b-lg"
                    title="KomprAX Chat"
                    allow="microphone; camera; geolocation"
                    style={{ height: 'calc(100% - 80px)' }}
                    onLoad={(e) => {
                      try {
                        // Injeção de CSS personalizado para KompraX
                        const iframe = e.target as HTMLIFrameElement;
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                        if (iframeDoc) {
                          const style = iframeDoc.createElement('style');
                          style.textContent = `
                            :root {
                              --chat--color-primary: #598ec2 !important;
                              --chat--color-primary-shade-50: #4a7bb1 !important;
                              --chat--color-primary-shade-100: #3b689f !important;
                              --chat--color-secondary: #2563eb !important;
                              --chat--color-secondary-shade-50: #1d4ed8 !important;
                            }

                            /* Botões principais */
                            button, .btn, .chat-send-button, .chat-button {
                              background-color: #598ec2 !important;
                              background: #598ec2 !important;
                              border-color: #598ec2 !important;
                            }

                            button:hover, .btn:hover, .chat-send-button:hover {
                              background-color: #4a7bb1 !important;
                              background: #4a7bb1 !important;
                              border-color: #4a7bb1 !important;
                            }

                            /* Header do chat */
                            .chat-header, .header {
                              background: linear-gradient(135deg, #598ec2 0%, #4a7bb1 100%) !important;
                            }

                            /* Mensagens do usuário */
                            .chat-message.user, .message-user, .user-message {
                              background: #598ec2 !important;
                              background: linear-gradient(135deg, #598ec2 0%, #4a7bb1 100%) !important;
                            }

                            /* Input focus */
                            input:focus, textarea:focus, .chat-input:focus {
                              border-color: #598ec2 !important;
                              box-shadow: 0 0 0 2px rgba(89, 142, 194, 0.1) !important;
                            }

                            /* Elementos com cor verde que devem ser azuis */
                            [style*="background-color: green"], 
                            [style*="background: green"],
                            [style*="color: green"],
                            .green, .success {
                              background-color: #598ec2 !important;
                              background: #598ec2 !important;
                              color: #598ec2 !important;
                            }

                            /* Personalização específica */
                            .chat-toggle {
                              background: #598ec2 !important;
                            }

                            .chat-toggle:hover {
                              background: #4a7bb1 !important;
                            }

                            /* ESCONDER BOTÃO DE ANEXO/UPLOAD */
                            .chat-input-file-button,
                            .file-upload-button,
                            button[aria-label*="file"],
                            button[title*="file"],
                            input[type="file"],
                            .attachment-button,
                            .upload-button {
                              display: none !important;
                              visibility: hidden !important;
                              opacity: 0 !important;
                            }

                            /* Esconder ícones de anexo */
                            svg[data-icon*="attachment"],
                            svg[data-icon*="paperclip"],
                            .paperclip-icon,
                            .attachment-icon {
                              display: none !important;
                            }
                            .chat-input-file-button,
                            .file-upload-button,
                            button[aria-label*="file"],
                            button[title*="file"],
                            input[type="file"],
                            .attachment-button,
                            .upload-button {
                              display: none !important;
                              visibility: hidden !important;
                              opacity: 0 !important;
                            }

                            /* Esconder ícones de anexo */
                            svg[data-icon*="attachment"],
                            svg[data-icon*="paperclip"],
                            .paperclip-icon,
                            .attachment-icon {
                              display: none !important;
                            }
                          `;
                          iframeDoc.head?.appendChild(style);
                          console.log('✅ CSS personalizado KompraX aplicado com sucesso!');
                        }
                      } catch (error) {
                        console.log('❌ Não foi possível aplicar CSS personalizado (CORS):', error);
                      }
                    }}
                  />
                </div>
                
                {/* Gradiente decorativo inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#598EC2] via-[#4a7bb1] to-[#598EC2]"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS responsivo para mobile */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fixed.bottom-24.right-6 > div {
            bottom: 0px !important;
            right: 0px !important;
            left: 0px !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            border-radius: 0px !important;
          }
          
          .fixed.bottom-24.right-6 > div iframe {
            height: calc(100% - 80px) !important;
          }
        }
      `}</style>
    </>
  );
};

// Exportar com dynamic import para evitar hidratação
const WhatsAppChatBot = dynamic(() => Promise.resolve(WhatsAppChatBotInner), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-6 right-6 z-[8999]">
      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#598EC2] to-[#4a7bb1] shadow-xl animate-pulse" />
    </div>
  )
});

export default WhatsAppChatBot; 