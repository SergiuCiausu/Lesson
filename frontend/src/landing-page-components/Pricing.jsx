import React from "react";
import { Sparkles } from "lucide-react";

const Pricing = ({ ref }) => {
  const pricings = [
    {
      name: "Student",
      price: "Free",
      type: "forever",
      description: "Perfect for individual learners getting started",
      checkmarks: ["Up to 10 documents per month", "Basic AI concept extraction", "Interactive mind maps", "Export to PNG", "Community support"],
      btnLabel: "Get Started Free",
    },
    {
      name: "Pro",
      price: "$9.99",
      type: "per month",
      description: "For serious students who want to pass all of their exams",
      checkmarks: [
        "Unlimited documents",
        "Advanced AI analysis",
        "Real-time collaboration up to 5 members",
        "Export to PDF, SVG, PNG",
        "Priority support",
        "Custom color themes",
        "Study mode & quizzes",
      ],
      btnLabel: "Start Free Now",
    },
    {
      name: "Team",
      price: "Starting at $24.99",
      type: "per month",
      description: "For study groups and small education teams",
      checkmarks: [
        "Everything in Pro",
        "Unlimited team members",
        "Shared workspaces",
        "Team analytics",
        "Admin controls",
        "Dedicated support",
        "Custom integrations",
      ],
      btnLabel: "Contact Sales",
    },
  ];

  return (
    <div className="w-full primary-color-bg-15 py-16!" ref={ref}>
      <div className="max-w-6xl margin-auto flex flex-col items-center relative">
        <h2 className="text-white mb-2!">Choose Your Plan</h2>
        <p className="text-[20px]! text-white! opacity-70">
          Choose the perfect plan for your learning journey. All plans include a 14-day free trial.
        </p>
        <div className="w-full my-16! grid grid-cols-3 gap-8">
          {pricings.map((pricing, index) =>
            index === 1 ? (
              <div key={`pricing-${index}`} className="feature-border brand-gradient-bg p-8! rounded-2xl! flex flex-col gap-4 justify-between">
                <div className="absolute w-fit h-fit py-2! rounded-2xl! px-4! primary-color-bg brand-border-glow top-34 left-127 text-white flex items-center gap-2">
                  <Sparkles />
                  <p>Most popular</p>
                </div>
                <div className="flex flex-col items-center mt-4!">
                  <h3 className="text-white p-0!">{pricing.name}</h3>
                  <div className="flex flex-col items-center mt-2!">
                    <h2 className="text-white p-0!">{pricing.price}</h2>
                    <p className="text-white">{pricing.type}</p>
                  </div>
                  <p className="text-white mt-4! text-base! text-center">{pricing.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {pricing.checkmarks.map((checkmark, index2) => (
                    <div key={`checkmark-${index}-${index2}`} className="flex gap-2 items-center">
                      <img src="/general-icons/checkmark-white.svg" alt="Checkmark icon" />
                      <p className="text-white">{checkmark}</p>
                    </div>
                  ))}
                </div>
                <button className="bg-white primary-color-text w-full rounded-2xl! text-center py-4! mt-4! font-semibold primary-font">
                  {pricing.btnLabel}
                </button>
              </div>
            ) : (
              <div
                key={`pricing-${index}`}
                className="feature-border brand-border-glow bg-transparent p-8! rounded-2xl! flex flex-col gap-4 justify-between"
              >
                <div className="flex flex-col items-center mt-4!">
                  <h3 className="p-0! text-white">{pricing.name}</h3>
                  <div className="flex flex-col items-center mt-2!">
                    <h2 className="p-0!">{pricing.price}</h2>
                    <p className="text-white">{pricing.type}</p>
                  </div>
                </div>
                <p className="mt-4! text-white text-base! text-center">{pricing.description}</p>
                <div className="flex flex-col gap-1">
                  {pricing.checkmarks.map((checkmark, index2) => (
                    <div key={`checkmark-${index}-${index2}`} className="flex gap-2 items-center">
                      <img src="/general-icons/checkmark-pink.svg" alt="Checkmark icon" />
                      <p className="text-white">{checkmark}</p>
                    </div>
                  ))}
                </div>
                <button className="pricing-btn">{pricing.btnLabel}</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
