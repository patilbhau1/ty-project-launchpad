
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Lightbulb, Send, User, Mail, MessageSquare } from "lucide-react";

const IdeaGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
  });
  const [generatedIdea, setGeneratedIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIdea, setShowIdea] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateProjectIdea = () => {
    const ideas = [
      "Smart Campus Management System: Develop a web application for managing campus facilities, student attendance, and resource allocation with real-time notifications and analytics dashboard.",
      "IoT-Based Health Monitoring System: Create a wearable device using Arduino/ESP32 that monitors vital signs and sends alerts to healthcare providers through a mobile app.",
      "AI-Powered Learning Platform: Build an educational platform with personalized learning paths, progress tracking, and AI-driven content recommendations for students.",
      "Sustainable Energy Monitoring Dashboard: Design an IoT system to track renewable energy consumption and provide insights for optimizing energy usage in buildings.",
      "Blockchain-Based Supply Chain Tracker: Develop a transparent supply chain management system using blockchain technology to track products from manufacturer to consumer.",
      "Virtual Reality Training Simulator: Create a VR application for professional training in specific domains like medical procedures or industrial safety protocols.",
    ];
    
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    return randomIdea;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to generate idea
    setTimeout(() => {
      const idea = generateProjectIdea();
      setGeneratedIdea(idea);
      setShowIdea(true);
      setIsLoading(false);
      
      // Log the submission (in real app, this would go to admin dashboard)
      console.log("New project idea request:", {
        ...formData,
        generatedIdea: idea,
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  const handleSubmitIdea = () => {
    // This would typically send the data to admin dashboard or email
    console.log("Submitting project idea to admin:", {
      ...formData,
      projectIdea: generatedIdea,
      timestamp: new Date().toISOString(),
    });
    
    alert("Your project idea has been submitted to our team! We'll contact you soon with more details.");
    
    // Reset form
    setFormData({ name: "", email: "", interests: "" });
    setGeneratedIdea("");
    setShowIdea(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-800" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to the TY Project Idea Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized project ideas for your final year project. Simply tell us your interests, and we'll provide you with exciting project concepts.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Tell Us About Yourself
                </CardTitle>
                <CardDescription>
                  Fill in your details and interests to get personalized project ideas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">
                      Describe your interests 
                      <span className="text-sm text-gray-500 ml-1">
                        (e.g., web development, data science, mobile apps)
                      </span>
                    </Label>
                    <Textarea
                      id="interests"
                      name="interests"
                      placeholder="Tell us about your interests, preferred technologies, or project domains you'd like to explore..."
                      value={formData.interests}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Generating Ideas...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Generate Project Ideas
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Project Ideas Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Project Ideas
                </CardTitle>
                <CardDescription>
                  {showIdea 
                    ? "Here's a personalized project idea for you!"
                    : "Project ideas will appear here after you submit your interests"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showIdea ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Fill out the form to get your personalized project ideas
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Recommended Project Idea:
                      </h3>
                      <p className="text-blue-800 leading-relaxed">
                        {generatedIdea}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button onClick={handleSubmitIdea} className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Project Idea
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const newIdea = generateProjectIdea();
                          setGeneratedIdea(newIdea);
                        }}
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        New Idea
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Submitting will send your details and project idea to our team for further assistance.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Ideas</h3>
                <p className="text-sm text-gray-600">
                  Get project ideas tailored to your interests and skills
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-gray-600">
                  Our team will reach out to provide detailed project guidance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600">
                  We'll contact you within 24 hours with detailed project plans
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IdeaGenerator;
