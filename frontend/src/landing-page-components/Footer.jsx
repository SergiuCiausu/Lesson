import { MoveRight } from "lucide-react";
import React from "react";

const Footer = () => {
  const footerBenefits = ["Free 14-day trial", "No credit card required", "Cancel anytime"];

  const footerLinks = [
    {
      column: "Product",
      links: ["Features", "Pricing", "How It Works", "Security"],
    },
    {
      column: "Company",
      links: ["About", "Blog", "Careers"],
    },
    {
      column: "Resources",
      links: ["Help Center", "Tutorials", "Community"],
    },
    {
      column: "Legal",
      links: ["Privacy", "Terms", "Cookie Policy"],
    },
  ];

  return (
    <div className="w-full p-8!">
      <div className="app-container">
        <div className="flex flex-col items-center gap-2 p-8!">
          <h2 className="text-white">Ready to Transform your Learning?</h2>
          <p className="text-white">Join thousands of students who are learning smarter, not harder. Start organizing your notes with AI today.</p>
          <button className="footer-btn mt-4! mb-8!">
            <p>Get Started Free</p>
            <MoveRight />
          </button>
          <div className="flex gap-4 items-center">
            {footerBenefits.map((benefit, index) => (
              <div key={`footer-benefit-${index}`} className="flex gap-2 items-center">
                <img src="/general-icons/checkmark-pink.svg" alt="Checkmark icon" />
                <p className="text-white">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between my-8!">
          {footerLinks.map((link, index) => (
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold cursor-pointer">{link.column}</p>
              {link.links.map((l, i) => (
                <p key={`feature-link-${i}-${index}`} className="text-white opacity-70 cursor-pointer">
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>
        <p className="text-white text-center">© 2025 MindLink. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
