import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { X, Bot, Send } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Chatbot.css';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatbotProps {
  plan: {
    name: string;
    features: string[];
  };
  onClose: () => void;
  onFinalize: (messages: Message[]) => void;
}

const Chatbot = ({ plan, onClose, onFinalize }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [showFinalize, setShowFinalize] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENROUTER_API_URI;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    try {
      const initialMessage: Message = {
        role: 'assistant',
        content: `Hello! You've selected the ${plan.name}. This plan includes: ${plan.features.join(', ')}. To get started, please tell me your name.`
      };
      setMessages([initialMessage]);
      setError(null);
    } catch (err) {
      console.error('Error initializing chat:', err);
      setError('Failed to initialize chat. Please try again.');
    }
  }, [plan]);

    const summarizeText = async (text: string): Promise<string> => {
    try {
      const response = await axios.post(apiUrl, {
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that summarizes project requirements concisely.' 
          },
          { 
            role: 'user', 
            content: `Summarize the following project requirements in 2-3 clear bullet points: ${text}` 
          }
        ],
      }, {
        headers: { 
          Authorization: `Bearer ${apiKey}`, 
          'Content-Type': 'application/json' 
        },
      });
      
      return response.data.choices[0]?.message?.content?.trim() || 
        "Here are the project requirements we discussed.";
    } catch (error) {
      console.error('Summarization API Error:', error);
      return "Here's a summary of your project requirements:";
    }
  };

  const handleSendMessage = async () => {
    const userInput = input.trim();
    if (!userInput) return;

    try {
      const userMessage: Message = { role: 'user', content: userInput };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');
      setIsLoading(true);
      setError(null);

      // If this is the first message, treat it as the user's name
      if (!userName && messages.length === 1) {
        setUserName(userInput);
      }

      // Check for finalization keywords in user input
      const finalizeKeywords = ['okay go ahead', 'finalize', 'proceed', 'let\'s do it', 'yes'];
      const shouldFinalize = finalizeKeywords.some(keyword => 
        userInput.toLowerCase().includes(keyword)
      );

      if (shouldFinalize) {
        setShowFinalize(true);
        setIsLoading(false);
        return;
      }

      const systemPrompt = `You are a helpful, concise, and friendly assistant for a company that provides project guidance. The user has selected the ${plan.name}. Your goal is to understand the user's project requirements. Ask clarifying questions to gather all necessary details. Be on-point and avoid lengthy responses. When you believe you have a complete understanding of the user's needs, end your response with the exact phrase "[FINALIZE]". Do not use this phrase at any other time.`;

      const payload = {
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...newMessages.map(msg => ({ role: msg.role, content: msg.content })),
        ],
      };

      const response = await axios.post(apiUrl, payload, {
        headers: { 
          Authorization: `Bearer ${apiKey}`, 
          'Content-Type': 'application/json' 
        },
      });

      let botMessage = response.data.choices[0]?.message?.content?.trim() || "I'm sorry, I didn't get that. Could you please rephrase?";
      
      // Check if the assistant suggests finalization
      if (botMessage.includes('[FINALIZE]')) {
        botMessage = botMessage.replace('[FINALIZE]', '').trim();
        setShowFinalize(true);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      console.error('Chat API Error:', error);
      setError('Failed to send message. Please try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Could you please try again?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = async () => {
    try {
      setIsFinalizing(true);
      const fullConversation = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      const projectRequirementsSummary = await summarizeText(
        `Summarize the following conversation into concise project requirements for ${plan.name}: ${fullConversation}`
      );
      
      // Call the parent's finalize handler with messages
      onFinalize([...messages, { 
        role: 'system', 
        content: `Project requirements summary: ${projectRequirementsSummary}` 
      }]);
      
    } catch (error) {
      console.error('Finalization error:', error);
      setError('Failed to finalize requirements. Please try again.');
    } finally {
      setIsFinalizing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close when clicking outside the card
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Card className="w-full max-w-md mx-4 animate-fade-in-up">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-white" />
            <CardTitle className="text-lg font-semibold text-white">
              {plan.name} - Project Assistant
            </CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-[500px]">
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t p-4 bg-gray-50">
            {showFinalize ? (
              <div className="flex flex-col space-y-3">
                <div className="text-sm text-center text-gray-600 mb-2">
                  Ready to finalize your project requirements?
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFinalize(false)}
                    className="flex-1"
                  >
                    Continue Chat
                  </Button>
                  <Button 
                    onClick={handleFinalize}
                    disabled={isFinalizing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isFinalizing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finalizing...
                      </>
                    ) : 'Finalize & Proceed'}
                  </Button>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Send'}
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
