"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus, X, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Branding", "UI/UX Design", "Development"];

const projects = [
  {
    id: 1,
    category: "Branding",
    title: "TRADITIONAL WEDDING STORY",
    desc: "Aesthetic traditional couple portraiture",
    img: "/pic.JPG",
    client: "Anjali & Karthik",
    date: "Dec 2025",
    deliverables: ["Portrait Photography", "Color Grading", "Visual Directing"],
    details: "Captured a timeless traditional Indian couple portrait against historic stone temple stairs. Focused on rich lighting, vibrant silk clothing hues, and genuine emotions to create a premium editorial story.",
  },
  {
    id: 2,
    category: "Branding",
    title: "SACRED RITUALS PORTRAIT",
    desc: "Macro ritual photography close-up",
    img: "/pic 2.JPG",
    client: "Heritage Wed-Shoots",
    date: "Nov 2025",
    deliverables: ["Macro Photography", "Traditional Styling", "Heritage Lighting"],
    details: "Detailed close-up capture of a traditional Indian wedding ritual, highlighting the anklet details and the groom holding the bride's foot. A study in texture, emotion, and warm heritage lighting.",
  },
  {
    id: 3,
    category: "Branding",
    title: "COOLIE CAMPAIGN POSTER",
    desc: "High-impact cinematic poster concept",
    img: "/pic 3.jpg",
    client: "Cinematic Fan Project",
    date: "Oct 2025",
    deliverables: ["Poster Design", "Graphic Design", "Digital Matte Painting"],
    details: "An editorial movie poster composition for the blockbuster film 'COOLIE', integrating multiple cinematic character frames with custom typography, fiery red drape details, and strong high-contrast visual paths.",
  },
  {
    id: 4,
    category: "UI/UX Design",
    title: "BUTTERFLY SYMPHONY",
    desc: "Creative outdoor fantasy photography",
    img: "/pic 4.jpg",
    client: "Creative Fashion Lab",
    date: "Sep 2025",
    deliverables: ["Fantasy Photography", "Post-Processing", "Creative Direction"],
    details: "An enchanting creative portrait of a woman in a maroon saree, surrounded by surreal flying butterflies. Styled with a vintage wooden barn backdrop and finished with premium soft dreamlike color tones.",
  },
  {
    id: 5,
    category: "Branding",
    title: "WARM LIGHTS EMBRACE",
    desc: "Romantic fairy lights pre-wedding shoot",
    img: "/pic 5.jpg",
    client: "Sneha & Rohan",
    date: "Aug 2025",
    deliverables: ["Romantic Portraits", "Lighting Artistry", "Studio Shoot"],
    details: "Designed a beautiful pre-wedding portrait setup using hanging warm light bulbs against a clean grey background. Coordinated floral styling to match the romantic, warm fairy tale ambience.",
  },
  {
    id: 6,
    category: "Branding",
    title: "VISUALIZE '26 CAMPAIGN",
    desc: "National level hackathon event brand",
    img: "/pic 6.png",
    client: "Sethu Institute of Technology",
    date: "Jul 2025",
    deliverables: ["Event Identity", "Graphic Layout", "Accreditations Kit"],
    details: "Crafted a premium event poster and brand guidelines for Visualize '26, a national-level 24-hour hackathon. Styled with deep matrix-green background, clean gold accents, and sharp typography hierarchy.",
  },
  {
    id: 7,
    category: "Branding",
    title: "AI&DS GRADUATION STORY",
    desc: "Together We Code yearbook collage",
    img: "/pic 7.png",
    client: "Department of AI&DS",
    date: "Jun 2025",
    deliverables: ["Yearbook Poster Design", "Collage Layout", "QR Integration"],
    details: "Created a vibrant, custom class photo collage poster for the AI&DS department graduates. Integrated a Scan Your Memories QR code, high-quality portrait masking, and watercolor splash margins.",
  },
  {
    id: 8,
    category: "UI/UX Design",
    title: "LUNEWISE BRAND LOGO",
    desc: "Infinity wave minimalist logo system",
    img: "/lunewise.png",
    client: "Lunewise Fintech",
    date: "May 2025",
    deliverables: ["3D Vector Branding", "Gradient System", "Logo Guidelines"],
    details: "Designed a high-end, 3D gradient vector logo for Lunewise Fintech. Sculpted as two interlocking blue crescent waves symbolizing infinite movement, clarity, and next-generation financial security.",
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const activeProject = projects.find((p) => p.id === selectedId);

  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-40 pb-16 overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.08), transparent 50%)`,
          }}
        />
        <div className="container-apple relative z-10 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-bold uppercase tracking-wider text-violet-400"
          >
            PORTFOLIO
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            CRAFTING DIGITAL <span className="gradient-text-violet">IMPRINTS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            A carefully curated gallery of our finest design solutions, high-performance web products, and brand stories created for the boldest companies.
          </motion.p>
        </div>
      </section>

      {/* Filter & Showcase */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple flex flex-col gap-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-black/50 border-(--border-color) hover:text-black hover:border-black/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style Filterable Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedId(project.id)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-(--border-color) bg-(--bg-secondary) hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Plus className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-2">
                    <div className="text-[10px] font-bold tracking-widest text-violet-500 uppercase">
                      {project.category}
                    </div>
                    <h3 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-(--text-muted) line-clamp-1">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Modal Case Study */}
      <AnimatePresence>
        {selectedId && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-4xl bg-(--bg-primary) rounded-3xl overflow-hidden shadow-2xl border border-(--border-color) max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-violet-600 text-white flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-video bg-black">
                <img
                  src={activeProject.img}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Case Study Meta & Details */}
              <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side Details */}
                <div className="md:col-span-2 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-500">
                      {activeProject.category} Case Study
                    </span>
                    <h3 className="font-display font-900 text-2xl md:text-3xl uppercase tracking-tighter text-(--text-primary)">
                      {activeProject.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
                    {activeProject.details}
                  </p>
                </div>

                {/* Right Side Metadata */}
                <div className="flex flex-col gap-6 bg-(--bg-secondary) p-6 rounded-2xl border border-(--border-color)">
                  <div className="flex flex-col gap-1 border-b border-(--border-color) pb-3">
                    <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">
                      CLIENT
                    </span>
                    <span className="text-sm font-bold text-(--text-primary)">
                      {activeProject.client}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-(--border-color) pb-3">
                    <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">
                      TIMELINE
                    </span>
                    <span className="text-sm font-bold text-(--text-primary)">
                      {activeProject.date}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">
                      DELIVERABLES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.deliverables.map((del) => (
                        <span
                          key={del}
                          className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white border border-(--border-color) text-black uppercase tracking-wider"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 60%)",
          }}
        />
        <div className="container-apple relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-display font-900 text-3xl md:text-5xl uppercase tracking-tighter max-w-[650px]">
            HAVE A PROJECT IN <span className="text-violet-400">MIND?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-[500px]">
            Let's construct your design system, build your custom Next.js stack, and design visual experiences that stand out.
          </p>
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-3 text-xs font-bold py-3.5 px-8 rounded-full border border-violet-500 bg-violet-600 text-white shadow-xl hover:scale-105 hover:bg-violet-500 transition-all duration-300 mt-4"
          >
            LET'S LAUNCH IT
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
