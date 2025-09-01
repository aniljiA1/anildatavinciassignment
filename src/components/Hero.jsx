export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-start md:items-center text-left md:text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Build Responsive UI with Ease 🚀
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-200">
          A modern React + Tailwind starter for pixel-perfect, responsive, and
          accessible web applications.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-start md:justify-center">
          <a
            href="#checkbox"
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg transition"
          >
            Explore Checkboxes
          </a>
          <a
            href="#faq"
            className="px-6 py-3 rounded-full border border-gray-300 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-medium transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}