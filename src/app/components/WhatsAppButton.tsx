'use client';

import { useState } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const WhatsAppChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Botão do Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative h-16 w-16">
          <Button
            onClick={toggleChat}
            className="h-full w-full rounded-full bg-gradient-to-r from-[#598EC2] to-[#4a7bb1] shadow-xl hover:shadow-2xl transition-all duration-300 p-0 group"
            size="icon"
          >
            <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-200" />
          </Button>
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </div>

      {/* Popup do Chat */}
      <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
      }`}>
        <Card className={`w-[400px] shadow-2xl border-0 overflow-hidden flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          
          {/* Cabeçalho */}
          <CardHeader className="text-white p-4 relative overflow-hidden flex-shrink-0 bg-gradient-to-r from-[#598EC2] via-[#4a7bb1] to-[#598EC2]">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <span className="text-lg font-bold text-white">K</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">KompraX</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-white/90">Assistente online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={minimizeChat}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white hover:bg-white/10 transition-colors rounded-full"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={toggleChat}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white hover:bg-white/10 transition-colors rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Conteúdo do Chat com Iframe */}
          <CardContent className={`p-0 flex-grow bg-white relative ${
            isMinimized ? 'hidden' : 'block'
          }`}>
            <div className="relative h-full rounded-b-lg overflow-hidden">
                <iframe
                  src="https://webhookub.mooveinsd.com.br/webhook/1aa172f8-ccc5-4c98-bc24-e8796d8fa78f/chat"
                  className="w-full h-full border-0"
                  title="KompraX Chat"
                  allow="microphone; camera"
                />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WhatsAppChatBot;
