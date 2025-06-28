
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
  ExternalLink
} from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web Applications", "IoT Projects", "Hardware Projects"];

  const projects = [
    {
      id: 1,
      title: "Full-Stack Web Application for E-commerce Platform",
      description: "Develop a comprehensive e-commerce platform with user authentication, product catalog, shopping cart, payment integration. Utilize modern technologies like React, Node.js, and MongoDB.",
      category: "Web Applications",
      icon: <Globe className="w-6 h-6" />,
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      difficulty: "Intermediate",
      duration: "6-8 weeks",
      price: "₹2999"
    },
    {
      id: 2,
      title: "IoT-Based Smart Home Automation System",
      description: "Create a smart home system using Arduino & Raspberry Pi. Implement features like remote control of lights, temperature monitoring, and mobile app for user interaction.",
      category: "IoT Projects",
      icon: <Cpu className="w-6 h-6" />,
      tags: ["Arduino", "Raspberry Pi", "IoT", "Mobile App"],
      difficulty: "Advanced",
      duration: "8-10 weeks",
      price: "₹3999"
    },
    {
      id: 3,
      title: "Hardware Project: Autonomous Drone for Surveillance",
      description: "Design and build an autonomous drone capable of surveillance and data collection. Incorporates computer vision, GPS navigation, and remote monitoring capabilities.",
      category: "Hardware Projects",
      icon: <Camera className="w-6 h-6" />,
      tags: ["Drone", "Computer Vision", "GPS", "Surveillance"],
      difficulty: "Expert",
      duration: "10-12 weeks",
      price: "₹4999"
    },
    {
      id: 4,
      title: "Mobile App for Fitness Tracking",
      description: "Create a mobile application designed for fitness activities including running, cycling, and swimming. Implement features like GPS tracking, social features, and progress visualization.",
      category: "Web Applications",
      icon: <Smartphone className="w-6 h-6" />,
      tags: ["React Native", "GPS", "Fitness", "Social"],
      difficulty: "Intermediate",
      duration: "6-8 weeks",
      price: "₹2499"
    },
    {
      id: 5,
      title: "Web Application for Project Management",
      description: "Create a web application for managing projects, tasks, and team collaboration. Features include task assignment, progress tracking, file sharing, and communication tools.",
      category: "Web Applications",
      icon: <Database className="w-6 h-6" />,
      tags: ["Project Management", "Collaboration", "Task Tracking"],
      difficulty: "Intermediate",
      duration: "7-9 weeks",
      price: "₹2799"
    },
    {
      id: 6,
      title: "IoT Project: Environmental Monitoring System",
      description: "Build an environmental monitoring system using sensors and microcontrollers. Collect data on air quality, temperature, humidity, and other environmental factors.",
      category: "IoT Projects",
      icon: <Wifi className="w-6 h-6" />,
      tags: ["Sensors", "Environmental", "Data Collection", "IoT"],
      difficulty: "Advanced",
      duration: "8-10 weeks",
      price: "₹3499"
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
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
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
