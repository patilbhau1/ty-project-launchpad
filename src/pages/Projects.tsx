import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Search,
  Globe,
  Cpu,
  Smartphone,
  Database,
  Wifi,
  Camera,
  Download,
  ExternalLink,
  Bot,
  Heart,
  Leaf,
  Home,
  Keyboard
} from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web Applications", "IoT Projects", "Hardware Projects"];

  const projects = [
    {
      id: 1,
      title: "Guardian: AI Chatbot for DSA Problem Solving",
      description: "A sleek AI chatbot built to assist students with DSA problems. Includes login/signup, chat renaming, and deletion. Ready for production use.",
      category: "Web Applications",
      icon: <Bot className="w-6 h-6" />,
      tags: ["React", "Firebase", "GPT", "Chatbot"],
      difficulty: "Advanced",
      duration: "6-8 weeks",
      price: "₹6000",
      url: "https://guardianapp.vercel.app"
    },
    {
      id: 2,
      title: "MindMate: Mental Health Support Chatbot",
      description: "A minimalist chatbot app for mental health support. Includes login/signup, chat interface, and delete function.",
      category: "Web Applications",
      icon: <Heart className="w-6 h-6" />,
      tags: ["Flask", "Python", "Mental Health"],
      difficulty: "Beginner",
      duration: "4-6 weeks",
      price: "₹2000",
      url: "https://pravin111.pythonanywhere.com/"
    },
    {
      id: 3,
      title: "Plant Monitoring System",
      description: "Automatically waters plants when soil is dry using a moisture sensor and ESP32. Real-time control and monitoring via Blynk web app.",
      category: "IoT Projects",
      icon: <Leaf className="w-6 h-6" />,
      tags: ["ESP32", "Blynk", "IoT", "Soil Sensor"],
      difficulty: "Intermediate",
      duration: "6-8 weeks",
      price: "₹2000",
      url: "#"
    },
    {
      id: 4,
      title: "Home Automation System",
      description: "Control home appliances like fans, lights, and TVs using Arduino and a Python app. Simple and effective home automation system.",
      category: "Hardware Projects",
      icon: <Home className="w-6 h-6" />,
      tags: ["Arduino", "Python", "Relay"],
      difficulty: "Beginner",
      duration: "4-6 weeks",
      price: "₹1500",
      url: "#"
    },
    {
      id: 5,
      title: "MacroPad: ESP32 Bluetooth Macro Controller",
      description: "A high-end macro keypad with OLED display, rotary encoder, and 9 programmable buttons. Connects via Bluetooth with customizable profiles.",
      category: "Hardware Projects",
      icon: <Keyboard className="w-6 h-6" />,
      tags: ["ESP32", "Bluetooth", "MacroPad", "OLED"],
      difficulty: "Expert",
      duration: "8-10 weeks",
      price: "₹3000",
      url: "#"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleGetProject = (project: any) => {
    const hardwareNumber = "917506750982";
    const softwareNumber = "918828016278";
    const message = "Hi! I need help with TY projects";
    let url = "";

    if (project.category === "Hardware Projects" || project.category === "IoT Projects") {
      url = `https://wa.me/${hardwareNumber}?text=${encodeURIComponent(message)}`;
    } else {
      url = `https://wa.me/${softwareNumber}?text=${encodeURIComponent(message)}`;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Available Projects
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Explore a diverse range of final year projects from full-stack web applications to IoT-based hardware projects. Find the perfect project for your interests and skills.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {project.icon}
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-1">
                          {project.category}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">
                          {project.title}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm line-clamp-3">
                    {project.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span>{project.duration}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-blue-600">{project.price}</span>
                    <div className="flex space-x-2">
                      <Button onClick={() => window.open(project.url, "_blank")} size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleGetProject(project)} size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Get Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
