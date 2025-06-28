
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Code, 
  Cpu, 
  Users, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Smartphone,
  Globe,
  Wifi
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Project Guidance",
      description: "End-to-end guidance through project planning and execution"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Technical Assistance",
      description: "Expert support for coding and development challenges"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration Tools",
      description: "Tools to help with team collaboration and progress tracking"
    }
  ];

  const projectTypes = [
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: "Full-Stack Web Applications",
      description: "Complete web applications with user authentication, database integration, and modern UI. Technologies include React, Node.js, and MongoDB.",
      badge: "Popular"
    },
    {
      icon: <Cpu className="w-12 h-12 text-green-600" />,
      title: "IoT-Based Smart Home System",
      description: "Arduino & Raspberry Pi, implement features like remote control of lights, temperature monitoring, and mobile app for user interaction.",
      badge: "Trending"
    },
    {
      icon: <Smartphone className="w-12 h-12 text-purple-600" />,
      title: "Mobile App for Fitness Tracking",
      description: "Create a mobile application designed for fitness activities including running, cycling, and swimming. Implement features like GPS tracking, social features, and progress visualization.",
      badge: "New"
    }
  ];

  const softwarePlans = [
    {
      name: "Basic Plan",
      price: "₹1,000",
      period: "project",
      description: "Code review and improvement advice",
      features: [
        "Project advice and consultation",
        "Code review and improvements",
        "Technical guidance",
        "Email support"
      ]
    },
    {
      name: "Standard Plan",
      price: "₹5,000",
      period: "project",
      description: "Complete full-stack web app with up to 4 pages",
      features: [
        "Full-stack web application",
        "Maximum 4 pages",
        "Basic authentication",
        "Database integration",
        "Responsive design",
        "Technical documentation"
      ],
      popular: true
    },
    {
      name: "Premium Plan",
      price: "₹9,000",
      period: "project",
      description: "Advanced full-stack app with 8+ pages and complete documentation",
      features: [
        "Full-stack web application",
        "8+ pages included",
        "Complete login/signup system",
        "Client preferred database",
        "Advanced features",
        "Complete documentation",
        "System diagrams included",
        "Priority support"
      ]
    }
  ];

  const hardwarePlans = [
    {
      name: "Basic Plan",
      price: "₹1,500",
      period: "project",
      description: "Simple hardware project with basic sensors",
      features: [
        "Up to 4 sensors maximum",
        "Basic code for hardware",
        "No internet connectivity",
        "No cloud dashboard",
        "Components NOT included",
        "You buy components yourself"
      ]
    },
    {
      name: "Standard Plan", 
      price: "₹5,000",
      period: "project",
      description: "Advanced project with cloud connectivity",
      features: [
        "Up to 9 sensors",
        "Blynk cloud connectivity",
        "We source components at best prices",
        "Internet connectivity included",
        "Cloud dashboard setup",
        "Components NOT included"
      ],
      popular: true
    },
    {
      name: "Premium Plan",
      price: "₹9,000", 
      period: "project",
      description: "Complex IoT project with full documentation",
      features: [
        "15+ sensors supported",
        "Blynk cloud integration",
        "WiFi connectivity",
        "API data connections",
        "Complex project architecture",
        "Complete documentation",
        "Components NOT included"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Final Year Project, Simplified
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We provide comprehensive support and guidance to help you excel in your final year projects. From ideation to execution, we're here to support you.
            </p>
            <Link to="/idea-generator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Project Support */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Project Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a range of services to ensure your project's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600">
              Explore a diverse range of final year projects from full-stack web applications to IoT-based hardware projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projectTypes.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {project.icon}
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {project.badge}
                        </Badge>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Software Project Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Software Project Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose a plan for your web development project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {softwarePlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                    Select Plan
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Project Pricing Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hardware Project Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose a plan for your IoT and hardware projects
            </p>
            <p className="text-sm text-red-600 mt-2 font-medium">
              Note: All hardware plans require you to purchase components separately
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hardwarePlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-green-600 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className={`w-full mb-6 ${plan.popular ? 'bg-green-600 hover:bg-green-700' : ''}`}>
                    Select Plan
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Too lazy to make your final year project? No worries — we've got your back. Let us handle the hard stuff while you chill (a little).
          </p>
          <Link to="/idea-generator">
            <Button size="lg" variant="secondary">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
