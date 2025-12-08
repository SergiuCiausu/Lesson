import React from "react";
import { Upload, Brain, Network, Zap, BookOpen, Share2 } from "lucide-react";

const Features = ({ ref }) => {
  const features = [
    {
      icon: Upload,
      label: "Easy Document Upload",
      description: "Drag and drop your PDFs, Word docs, or Powerpoint presentations. We support all major text document formats.",
    },
    {
      icon: Brain,
      label: "AI Concept Extraction",
      description: "Our AI automatically identifies key concepts, definitions, and relationships from your notes.",
    },
    {
      icon: Network,
      label: "Smart Relationship Mapping",
      description: "Watch as AI connects related ideas, building a web of knowledge that mirrors how you think.",
    },
    {
      icon: Zap,
      label: "Instant Mind Maps",
      description: "Get beautiful, interactive mind maps generated in seconds, not hours of manual work.",
    },
    {
      icon: BookOpen,
      label: "Study Mode",
      description: "Navigate your knowledge graph to review concepts and test your understanding.",
    },
    {
      icon: Share2,
      label: "Collaborate & Share",
      description: "Share your mind maps with study groups and collaborate on shared knowledge bases.",
    },
  ];

  return (
    <div className="max-w-6xl pt-8!" ref={ref}>
      <h2 className="relative z-5 text-center mb-2!">Everything You Need to Learn Smarter</h2>
      <p className="text-white text-[20px]! text-center z-5! opacity-80">
        Powerful features designed to transform how students organize, understand, and retain information.
      </p>
      <div className="relative z-5 grid grid-cols-3 gap-8! my-16!">
        {features.map((feature, index) => {
          const { icon: Icon } = feature;

          return (
            <div key={`feature-${index}`} className="flex flex-col gap-2 feature-border p-8! select-none">
              <div className="w-fit p-3! flex items-center justify-center rounded-2xl primary-color-bg-15 mb-4! primary-color-text">
                <Icon />
              </div>
              <h3 className="text-xl! text-white p-0!">{feature.label}</h3>
              <p className="text-white">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
