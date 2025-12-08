import React from "react";
import { Upload, Cpu, GitBranch } from "lucide-react";

const HowItWorks = ({ ref }) => {
  const steps = [
    {
      icon: Upload,
      label: "Upload Your Documents",
      description:
        "Simply drag and drop your lecture notes, textbooks, or study materials. Our system accepts PDFs, Word documents, Powerpoint presentations, and more.",
    },
    {
      icon: Cpu,
      label: "AI Analyzes & Extracts",
      description:
        "Our advanced AI reads through your documents, identifying key concepts, definitions, formulas, and important relationships between ideas.",
    },
    {
      icon: GitBranch,
      label: "Visualize Your Mind Map",
      description:
        "Instantly see your knowledge transformed into an interactive mind map, with concepts linked by logical relations that make sense to you.",
    },
  ];

  return (
    <div className="w-full primary-color-bg-15 pt-16! select-none" ref={ref}>
      <div className="max-w-6xl margin-auto">
        <h2 className="relative z-5 text-center mb-2!">How Lesson Works</h2>
        <p className="text-white text-[20px]! text-center z-5! opacity-80">
          Three simple steps to transform your scattered notes into organized, connected knowledge.
        </p>
        <div className="relative z-5 grid grid-cols-3 gap-8! my-16!">
          {steps.map((step, index) => {
            const { icon: Icon } = step;

            return (
              <div className="flex flex-col gap-2 feature-border p-8!">
                <div className="w-full relative flex items-center justify-between z-0!">
                  <div
                    key={`step-${index}`}
                    className="w-fit p-3! flex items-center justify-center mb-4! text-white brand-gradient-bg rounded-circle"
                  >
                    <Icon />
                  </div>
                  <p className="absolute right-0 mt-32! text-[200px]! opacity-70 primary-color-text-30 font-semibold">{index + 1}</p>
                </div>
                <h3 className="text-xl! text-white p-0! z-10!">{step.label}</h3>
                <p className="text-white z-10!">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
