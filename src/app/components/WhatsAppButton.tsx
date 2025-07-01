'use client'

import React, { useState, useEffect } from "react";
import { MdOutlineMarkUnreadChatAlt, MdClose } from "react-icons/md";

const WhatsAppChatBot: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      setShowChat(window.location.hash === "#chat-obiana");
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {/* Botão flutuante */}
      <div
        onClick={() => setShowChat(!showChat)}
        className="fixed z-[8999] lg:z-[9000] bottom-9 right-9 text-white border-2 border-[#598EC2] rounded-full p-3 shadow-lg transition-transform duration-300 transform hover:scale-110 backdrop-blur-md bg-[#000000]/30 cursor-pointer"
      >
        {showChat ? (
          <MdClose className="text-[40px]" />
        ) : (
          <MdOutlineMarkUnreadChatAlt className="text-[40px]" /> 
        )}
      </div>

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
          
          {/* Container do chat com iframe como o Lovable */}
          <div className="fixed bottom-[20px] right-[20px] w-[370px] max-w-[90%] h-[500px] bg-white rounded-[15px] shadow-[0_12px_28px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1)] flex flex-col overflow-hidden z-[9000]">
            
            {/* Cabeçalho */}
            <div className="bg-[#598ec2] text-white px-5 py-4 flex justify-between items-center flex-shrink-0">
              <h3 className="m-0 text-xl font-semibold">Fale Conosco</h3>
              <button
                onClick={() => {
                  setShowChat(false);
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }}
                className="bg-none border-none text-white text-2xl cursor-pointer leading-none opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                ×
              </button>
            </div>

            {/* Iframe simples como o Lovable faz */}
            <iframe
              src="https://webhookub.mooveinsd.com.br/webhook/1a7ff005-dbd8-40fc-a0f7-2c675a2f3c94/chat"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                flex: 1
              }}
              allow="microphone; camera; geolocation"
              title="Chat Obiana"
            />
          </div>

          {/* CSS responsivo */}
          <style jsx>{`
            @media (max-width: 640px) {
              .fixed.bottom-\\[20px\\].right-\\[20px\\] {
                bottom: 0px !important;
                right: 0px !important;
                left: 0px !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 100% !important;
                border-radius: 0px !important;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatBot; 