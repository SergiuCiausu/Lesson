import { MoveRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { SmilePlus } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl pt-[200px]! pb-[100px]! flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="hero-tag">
          <Sparkles className="w-5" />
          <p>AI-Powered Learning</p>
        </div>
        <h1 className="text-white text-center lp-h1">
          Ace Your Exams And <span className="primary-color-text">Effortlessly</span> Learn Complex Topics
        </h1>
        <p className="max-w-3/4 text-white text-[20px]! text-center z-5!">
          Upload your documents and let AI turn scattered notes into an intelligent mind map. Discover hidden connections, learn faster, and master
          complex subjects with visual logic.
        </p>
        <button className="hero-btn" onClick={() => navigate("/pr/dashboard")}>
          Start for free
          <MoveRight />
        </button>
        <div className="text-white flex w-full justify-center gap-16 mt-16! z-10!">
          <div className="flex flex-col items-center">
            <div className="p-3! flex items-center justify-center rounded-2xl primary-color-bg-15 mb-4! primary-color-text">
              <GraduationCap />
            </div>
            <p className="text-2xl! semibold">50K+</p>
            <p className="text-base! opacity-50">Active Students</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3! flex items-center justify-center rounded-2xl primary-color-bg-15 mb-4! primary-color-text">
              <NotebookPen />
            </div>
            <p className="text-2xl! semibold">1M+</p>
            <p className="text-base! opacity-50">Notes Organized</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3! flex items-center justify-center rounded-2xl primary-color-bg-15 mb-4! primary-color-text">
              <SmilePlus />
            </div>
            <p className="text-2xl! semibold">98%</p>
            <p className="text-base! opacity-50">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
