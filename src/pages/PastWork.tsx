
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink,
  Github,
  Globe,
  Cpu,
  Smartphone,
  Database,
  Camera,
  Wifi
} from "lucide-react";

const PastWork = () => {
  const pastProjects = [
    {
      id: 1,
      title: "E-commerce Platform - TechMart",
      description: "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with React, Node.js, MongoDB, and Stripe.",
      category: "Web Application",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      image: "/lovable-uploads/placeholder-project-1.jpg",
      githubUrl: "https://github.com/example/techmart",
      liveUrl: "https://techmart-demo.vercel.app",
      student: "Priya Sharma, Computer Engineering",
      year: "2023",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Smart Home Automation System",
      description: "IoT-based home automation system using Arduino and ESP32. Features include remote control of appliances, temperature monitoring, security alerts, and mobile app integration.",
      category: "IoT Project",
      technologies: ["Arduino", "ESP32", "React Native", "Firebase", "C++"],
      image: "/lovable-uploads/placeholder-project-2.jpg",
      githubUrl: "https://github.com/example/smart-home",
      liveUrl: null,
      student: "Rahul Patel, Electronics Engineering",
      year: "2023",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Fitness Tracking Mobile App",
      description: "Comprehensive fitness tracking application with GPS tracking, workout logging, social features, and progress analytics. Cross-platform mobile app built with React Native.",
      category: "Mobile App",
      technologies: ["React Native", "Firebase", "Google Maps API", "Chart.js"],
      image: "/lovable-uploads/placeholder-project-3.jpg",  
      githubUrl: "https://github.com/example/fitness-tracker",
      liveUrl: "https://play.google.com/store/apps/fitness-tracker",
      student: "Anjali Singh, IT Engineering",
      year: "2023",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Project Management Dashboard",
      description: "Collaborative project management tool with task assignment, progress tracking, team communication, file sharing, and reporting features. Built for team productivity.",
      category: "Web Application", 
      technologies: ["Vue.js", "Django", "PostgreSQL", "WebSocket", "Chart.js"],
      image: "/lovable-uploads/placeholder-project-4.jpg",
      githubUrl: "https://github.com/example/project-manager",
      liveUrl: "https://project-manager-demo.herokuapp.com",
      student: "Vikash Kumar, Computer Engineering",
      year: "2022",
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Autonomous Surveillance Drone",
      description: "Autonomous drone system with computer vision capabilities for surveillance and monitoring. Features include object detection, GPS navigation, and real-time video streaming.",
      category: "Hardware Project",
      technologies: ["Python", "OpenCV", "Raspberry Pi", "TensorFlow", "GPS"],
      image: "/lovable-uploads/placeholder-project-5.jpg",
      githubUrl: "https://github.com/example/surveillance-drone",
      liveUrl: null,
      student: "Arun Mehta, Mechanical Engineering",
      year: "2022",
      icon: <Camera className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Environmental Monitoring System",
      description: "IoT-based environmental monitoring system that tracks air quality, temperature, humidity, and pollution levels. Data visualization dashboard with real-time alerts.",
      category: "IoT Project",
      technologies: ["Arduino", "Sensors", "InfluxDB", "Grafana", "Node-RED"],
      image: "/lovable-uploads/placeholder-project-6.jpg",
      githubUrl: "https://github.com/example/env-monitor",
      liveUrl: "https://env-monitor-dashboard.netlify.app",
      student: "Neha Gupta, Environmental Engineering",
      year: "2022",
      icon: <Wifi className="w-6 h-6" />
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web Application": return "bg-blue-100 text-blue-800";
      case "Mobile App": return "bg-green-100 text-green-800";
      case "IoT Project": return "bg-orange-100 text-orange-800";
      case "Hardware Project": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Past Work & Success Stories
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Explore our portfolio of successfully delivered projects. See how we've helped students create innovative solutions across various domains and technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600">
              Browse through our collection of successful final year projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-xl transition-shadow">
                <CardHeader className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="p-4 bg-white rounded-full shadow-lg">
                      {project.icon}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Student:</span> {project.student}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Testimonials</h2>
            <p className="text-lg text-gray-600">
              What our students say about their project experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "The guidance and support I received for my e-commerce project was exceptional. The mentors helped me understand complex concepts and delivered a project that exceeded my expectations."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-gray-500">Computer Engineering</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "Working on the IoT smart home project taught me so much about hardware integration and mobile app development. The practical approach made learning enjoyable."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Rahul Patel</p>
                    <p className="text-sm text-gray-500">Electronics Engineering</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "The project management dashboard we built is now being used by our college for managing student projects. It's amazing to see our work in real-world application."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Vikash Kumar</p>
                    <p className="text-sm text-gray-500">Computer Engineering</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PastWork;
