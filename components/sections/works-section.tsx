"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { portfolioData, type ProjectItem } from "@/lib/data";
import { Play, Clock, ArrowUpRight, MessageCircle, X } from "lucide-react";

export function WorksSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "all") return portfolioData.projects;
    return portfolioData.projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="works" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">

        {/* Header + Filter Row */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6"
          style={{ borderBottom: "1px solid rgba(7,6,7,0.12)" }}
        >
          <h2
            className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase text-obsidian"
            style={{ letterSpacing: "0.02em", lineHeight: 0.95 }}
          >
            SELECTED{" "}
            <span className="text-ember">WORKS</span>
          </h2>

          {/* Filter Tabs — Permanent rounded capsule frame; inner text/buttons scroll smoothly without clipping rounded ends */}
          <div
            className="w-full lg:w-auto max-w-full overflow-hidden p-1 shrink-0"
            style={{
              background: "#f7f6f2",
              borderRadius: "800px",
              border: "1px solid rgba(7,6,7,0.1)",
            }}
          >
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1 py-0.5">
              {portfolioData.categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium font-sans transition-all whitespace-nowrap cursor-pointer hover:text-obsidian shrink-0"
                    style={{
                      borderRadius: "800px",
                      background: isActive ? "#fc5000" : "transparent",
                      color: isActive ? "#070607" : "rgba(7,6,7,0.55)",
                      fontWeight: isActive ? 600 : 500,
                    }}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal — Adaptive Cinema Frame tailored to video orientation */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          {selectedProject && (
            <DialogContent
              showCloseButton={false}
              className="p-0! gap-0! overflow-hidden flex flex-col transition-all duration-300 shadow-2xl"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                gap: 0,
                borderRadius: "28px",
                background: "#f7f6f2",
                border: "1px solid rgba(7,6,7,0.12)",
                maxWidth: selectedProject.aspect === "portrait" ? "min(460px, 95vw)" : "min(960px, 95vw)",
                maxHeight: "90dvh",
                height: "auto",
              }}
            >
              {/* Video Player Area — Adapts responsively to mobile vs desktop screens */}
              <div
                className={`relative w-full bg-black overflow-hidden flex items-center justify-center shrink-0 select-none ${selectedProject.aspect === "portrait"
                    ? "aspect-9/14 max-h-[42dvh] sm:max-h-[58vh]"
                    : "aspect-video max-h-[36dvh] sm:max-h-[62vh]"
                  }`}
              >
                {/* Ambient blur backdrop for portrait videos */}
                {selectedProject.aspect === "portrait" && (
                  <video
                    src={selectedProject.videoUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-105"
                    aria-hidden="true"
                  />
                )}

                <video
                  src={selectedProject.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="relative z-10 w-full h-full object-contain"
                />

                {/* Top overlay badges */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 pointer-events-none">
                  <span
                    className="px-2.5 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-obsidian shadow-sm"
                    style={{ background: "#f5f28e", borderRadius: "800px" }}
                  >
                    {selectedProject.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] text-chalk bg-obsidian/70 backdrop-blur-sm rounded-full shadow-sm">
                    <Clock className="size-2.5" />
                    {selectedProject.duration}
                  </span>
                </div>

                {/* Floating Frosted Glass Close Button — High Contrast Top Right */}
                <DialogClose
                  render={
                    <button
                      type="button"
                      className="absolute top-3 right-3 z-30 size-9 sm:size-10 flex items-center justify-center rounded-full bg-obsidian/80 hover:bg-obsidian text-chalk hover:text-ember backdrop-blur-md border border-chalk/20 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                      aria-label="Close dialog"
                    />
                  }
                >
                  <X className="size-4 sm:size-5" />
                </DialogClose>
              </div>

              {/* Scrollable Cinema Details Strip — Native momentum-enabled scroll container */}
              <div
                className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain scrollbar-thin [scrollbar-color:rgba(7,6,7,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-obsidian/20"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3">
                  {/* Header row: Title + Client/Year + Commission CTA + Close Button */}
                  <div
                    className="flex items-center justify-between gap-3 pb-2.5"
                    style={{ borderBottom: "1px solid rgba(7,6,7,0.08)" }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-obsidian/50 uppercase tracking-wider">
                        <span className="font-semibold text-obsidian/75">{selectedProject.client}</span>
                        <span>·</span>
                        <span>{selectedProject.year}</span>
                      </div>
                      <DialogTitle className="font-heading text-lg sm:text-xl uppercase text-obsidian tracking-wide leading-tight mt-0.5">
                        {selectedProject.title}
                      </DialogTitle>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`${portfolioData.socials.whatsapp}?text=Hi%20Shahan,%20I'd%20love%20a%20cut%20like%20"${encodeURIComponent(selectedProject.title)}"`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 sm:px-3.5 h-7 text-[10px] uppercase tracking-wider font-semibold text-obsidian bg-ember hover:bg-ember/90 active:scale-[0.98] transition-all"
                        style={{ borderRadius: "800px" }}
                      >
                        <MessageCircle className="size-3" />
                        <span>Commission</span>
                      </a>

                      {/* Bottom Close Button for easy one-hand mobile thumb access */}
                      <DialogClose
                        render={
                          <button
                            type="button"
                            className="flex items-center gap-1 px-2.5 sm:px-3 h-7 text-[10px] uppercase tracking-wider font-semibold text-obsidian/75 hover:text-obsidian bg-obsidian/10 hover:bg-obsidian/15 active:scale-[0.98] transition-all cursor-pointer"
                            style={{ borderRadius: "800px" }}
                            aria-label="Close dialog"
                          />
                        }
                      >
                        <X className="size-3" />
                        <span>Close</span>
                      </DialogClose>
                    </div>
                  </div>

                  {/* Full Description */}
                  <DialogDescription className="text-xs sm:text-sm text-obsidian/65 leading-relaxed font-sans">
                    {selectedProject.description}
                  </DialogDescription>

                  {/* Role & Pipeline compact badge */}
                  <div
                    className="flex flex-wrap items-center justify-between gap-1 px-2.5 py-1 text-[10px] font-mono text-obsidian/75"
                    style={{
                      background: "#e8e7e3",
                      borderRadius: "10px",
                    }}
                  >
                    <span>Role: <strong className="text-obsidian">{selectedProject.role}</strong></span>
                    <span className="text-obsidian/60">DaVinci · Premiere Pro</span>
                  </div>

                  {/* Tags row */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-mono uppercase text-obsidian/80 font-medium"
                        style={{
                          background: "#f5f28e",
                          borderRadius: "800px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}

/* ─── Project Card ─────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: ProjectItem;
  index: number;
  onSelect: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      style={{
        background: "#f7f6f2",
        borderRadius: "40px",
        border: "1px solid rgba(7,6,7,0.08)",
        overflow: "hidden",
      }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
    >
      {/* Thumbnail */}
      <div
        className={`relative aspect-video w-full overflow-hidden bg-linear-to-tr ${project.posterGradient}`}
      >
        {/* Real video preview */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          preload="metadata"
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
        />

        {/* Halftone dot pattern overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`card-halftone-${project.id}`}
              x="0"
              y="0"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="6" cy="6" r="1.8" fill="#f7f6f2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#card-halftone-${project.id})`} />
        </svg>

        {/* Category badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span
            className="px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-obsidian group-hover:bg-ember transition-colors"
            style={{
              background: "#f5f28e",
              borderRadius: "800px",
            }}
          >
            {project.categoryLabel}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-0.5 font-mono text-[11px] text-chalk bg-obsidian/60 backdrop-blur-sm rounded-full">
            <Clock className="size-3" />
            {project.duration}
          </span>
        </div>

        {/* Frosted Glass Play Trigger — melts away on hover to reveal unobstructed live video preview */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="size-13 sm:size-15 flex items-center justify-center text-chalk bg-obsidian/55 backdrop-blur-md border border-chalk/20 shadow-xl transition-all duration-300 group-hover:opacity-0 group-hover:scale-110"
            style={{ borderRadius: "800px" }}
          >
            <Play className="size-5 sm:size-6 text-ember fill-ember ml-0.5 drop-shadow-[0_2px_8px_rgba(252,80,0,0.55)]" />
          </div>
        </div>

        {/* Client + year bottom bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-chalk/70 z-10">
          <span className="truncate">{project.client}</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Card copy */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-heading text-2xl sm:text-3xl uppercase text-obsidian group-hover:text-ember transition-colors"
            style={{ letterSpacing: "0.02em" }}
          >
            {project.title}
          </h3>
          <ArrowUpRight className="size-5 text-obsidian/30 group-hover:text-ember shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="text-xs sm:text-sm text-obsidian/55 line-clamp-2 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Sulfur tag pills */}
        <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: "1px solid rgba(7,6,7,0.1)" }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] font-mono uppercase text-obsidian/70"
              style={{ background: "#f5f28e", borderRadius: "800px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
