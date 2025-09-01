import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CheckboxTree from "./components/CheckboxTree";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Features
        </h2>
        <Features />
      </section>

      {/* Checkbox Section */}
      <section id="checkbox" className="py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Nested Checkbox
        </h2>
        <CheckboxTree />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}