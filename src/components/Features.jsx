import { CheckCircle, Zap, Shield } from "lucide-react";

const features = [
  {
    title: "Easy to Use",
    description:
      "Simple, intuitive UI components that help you build apps quickly.",
    icon: CheckCircle,
  },
  {
    title: "Fast Performance",
    description:
      "Optimized for speed with lightweight, responsive components.",
    icon: Zap,
  },
  {
    title: "Secure",
    description:
      "Built with best practices in mind to ensure safety and reliability.",
    icon: Shield,
  },
];

export default function Features() {
  return (
    <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
        >
          <feature.icon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}