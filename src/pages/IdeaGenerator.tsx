import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Lightbulb, Send, User, MessageSquare } from "lucide-react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reactmarkedown from 'react-markdown';

const IdeaGenerator = () => {
  const [formData, setFormData] = useState({ name: "", phoneNo: "", interests: "" });
  const [generatedIdea, setGeneratedIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIdea, setShowIdea] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENROUTER_API_URI;

  const generateProjectIdea = async (interests: string) => {
    const systemPrompt = `You are a final year engineering project guide. Generate a unique and practical software project idea based on the user's interests. Be specific, innovative in just less than 40 words, and mention the tech stack if relevant.`;
    const payload = {
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `My interests are: ${interests}` },
      ],
    };
    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      return 'Oops! Could not generate idea.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowIdea(false);

    const idea = await generateProjectIdea(formData.interests);
    setGeneratedIdea(idea);
    setShowIdea(true);
    setIsLoading(false);

    console.log('New idea request:', { ...formData, idea, time: new Date().toISOString() });
  };


  const handleSubmitIdea = async () => {
    const { name, phoneNo, interests } = formData;
    const idea = generatedIdea;
    const phoneNum = parseInt(phoneNo);
    // 2. Insert into Supabase
    const { error } = await supabase.from("ideas").insert([{
      name,
      phoneno : phoneNum,
      interests,
      idea,
    },
    ]);

    // 3. Error handling
    if (error) {
      console.error("Supabase insert error:", error.message);
      alert("Failed to submit your idea. Try again.");
      return;
    }

    // 4. Success flow
    alert("Your project idea has been submitted! We'll contact you soon.");
    setFormData({ name: "", phoneNo: "", interests: "" });
    setGeneratedIdea("");
    setShowIdea(false);
  };


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <Lightbulb className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">TY Project Idea Generator</h1>
          <p className="text-lg text-gray-600">Tell us your interests and get a personalized project idea.</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><User className="w-5 h-5 mr-2" />Your Details</CardTitle>
              <CardDescription>Enter name, email, and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="phoneno">Phone Number</Label>
                  <Input
                    id="phoneNo"
                    name="phoneNo"
                    type="tel"
                    maxLength={10}
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    required
                  />
                  </div>
                <div>
                  <Label htmlFor="interests">Interests</Label>
                  <Textarea id="interests" name="interests" value={formData.interests} onChange={handleInputChange} required rows={4} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate Ideas'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="w-5 h-5 mr-2" />Project Idea</CardTitle>
              <CardDescription>{showIdea ? 'Here is your idea' : 'Awaiting your input...'}</CardDescription>
            </CardHeader>
            <CardContent>
              {showIdea ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded">
                    <p>{
                      <Reactmarkedown>
                        {generatedIdea}
                      </Reactmarkedown>
                    }</p>
                  </div>
                  <Button onClick={handleSubmitIdea} className="mr-2">Submit Idea</Button>
                  <Button variant="outline" onClick={handleSubmit}>New Idea</Button>
                </div>
              ) : (
                <p className="text-gray-500">Fill out the form to see ideas</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Animated Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={() => navigate('/approved-idea')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-medium text-lg flex items-center space-x-2"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(124, 58, 237, 0.7)',
              '0 0 0 15px rgba(124, 58, 237, 0)',
              '0 0 0 0 rgba(124, 58, 237, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <span>Got Approved Idea?</span>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            💡
          </motion.span>
        </motion.button>
      </motion.div>
      <Footer />
    </div>
  );
};
export default IdeaGenerator;
