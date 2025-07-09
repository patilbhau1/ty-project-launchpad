import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { X, Bot } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chatbot = ({ plan, onClose, onFinalize }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [showFinalize, setShowFinalize] = useState(false);
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
    const initialMessage = {
      role: 'assistant',
      content: `Hello! You've selected the ${plan.name}. This plan includes: ${plan.features.join(', ')}. To get started, please tell me your name.`
    };
    setMessages([initialMessage]);
  }, [plan]);

  const summarizeText = async (text) => {
    try {
      const response = await axios.post(apiUrl, {
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free', // Use the same model for summarization
        messages: [{ role: 'user', content: `Summarize the following text concisely: ${text}` }],
      }, {
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Summarization API Error:', error);
      return "Could not summarize the response."; // Fallback in case of error
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    if (!userName && messages.length === 1) { // Assuming the first user message is their name
      setUserName(input.trim());
    }

    const systemPrompt = `You are a helpful, concise, and friendly assistant for a company that provides project guidance. The user has selected the ${plan.name}. Your goal is to understand the user's project requirements. Ask clarifying questions to gather all necessary details. Be on-point and avoid lengthy responses. When you believe you have a complete understanding of the user's needs, end your response with the exact phrase "[FINALIZE]". Do not use this phrase at any other time.`;

    const payload = {
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        { role: 'system', content: systemPrompt },
        ...newMessages.map(msg => ({ role: msg.role, content: msg.content })),
      ],
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      });
      let botMessage = response.data.choices[0].message.content.trim();
      
      if (botMessage.includes('[FINALIZE]')) {
        botMessage = botMessage.replace('[FINALIZE]', '').trim();
        setShowFinalize(true);
      }

      setMessages([...newMessages, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-100 p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Your Project Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-80 overflow-y-auto mb-4 space-y-4 p-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs inline-block p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe your project..."
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </Button>
          </div>
          {showFinalize && (
            <Button
              onClick={async () => {
                setIsFinalizing(true);
                const fullConversation = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
                const projectRequirementsSummary = await summarizeText(`Summarize the following conversation into concise project requirements: ${fullConversation}`);
                const whatsappMessage = `Hi ${userName || 'there'}, I want a project: ${projectRequirementsSummary}`;
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
                const link = document.createElement('a');
                link.href = whatsappUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer'; // Security best practice
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setIsFinalizing(false);
                onClose(); // Close the chatbot after finalizing
              }}
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
              disabled={isFinalizing}
            >
              {isFinalizing ? 'Finalizing...' : 'Finalize Requirements'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
