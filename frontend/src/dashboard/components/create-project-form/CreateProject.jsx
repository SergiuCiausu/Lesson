import React, { useState } from "react";
import CloseBtn from "../../../general-components/CloseBtn";
import "./create-project.css";
import ProgressBars from "../../../general-components/ProgressBars";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import { AnimatePresence, motion } from "framer-motion";
import ControlStepBtns from "./components/ControlStepBtns";
import SubmitCreateProjectBtn from "./components/step3-components/SubmitCreateProjectBtn";
import PreviousIconBtn from "../../../general-components/PreviousIconBtn";
import AddLinksTextPanel from "./components/AddLinksTextPanel";
import { useNavigate } from "react-router-dom";

const CreateProject = ({ setIsCreateProject }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isError, setIsError] = useState(true);
  const [agreedTnC, setAgreedTnC] = useState(false);
  const [tnCError, setTnCError] = useState("");
  const [extensions, setExtensions] = useState([]);
  const [currentExtension, setCurrentExtension] = useState("");
  const [isAddTextLinksPanelOpen, setIsAddTextLinksPanelOpen] = useState(""); // "" / text / links
  const [formData, setFormData] = useState({
    projectName: {
      value: "",
      error: "",
    },
    subject: {
      value: "",
      error: "",
    },
    queue: {
      value: [], // { id: 0, type: "", label: "", file?: "", content?: "", extension?: ""}
      error: "",
    },
  });

  const handleBlur = () => {
    const projectNameError = !formData.projectName.value.trim() ? "Project name cannot be empty." : "";
    const subjectError = !formData.subject.value.trim() ? "You must have at least a subject in your project!" : "";

    const isError = !!(projectNameError || subjectError);

    setFormData((prev) => ({
      ...prev,
      projectName: { ...prev.projectName, error: projectNameError },
      subject: { ...prev.subject, error: subjectError },
    }));

    setIsError(isError);

    return isError;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: {
        value: e.target.value,
        error: "",
      },
    }));
  };

  const convertToFormData = () => {
    const convertedFormData = new FormData();

    const filesToBeAdded = formData.queue.value.filter((item) => item.type === "file");
    const linksToBeAdded = formData.queue.value.filter((item) => item.type === "link");
    const textToBeAdded = formData.queue.value.filter((item) => item.type === "text");

    filesToBeAdded.forEach((file) => convertedFormData.append("files", file.file));
    convertedFormData.append("links", JSON.stringify(linksToBeAdded));
    convertedFormData.append("text", JSON.stringify(textToBeAdded));

    return convertedFormData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
      let createProject = null;

      if (!formData.queue.value.length > 0) {
        createProject = await fetch("http://localhost:3000/api/projects/create-project", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newProject: {
              projectName: formData.projectName.value,
              subject: formData.subject.value,
              queue: [],
            },
            extractedText: [],
          }),
        });
      } else {
        const dataForBackend = convertToFormData();

        try {
          const res = await fetch("http://localhost:3000/api/extract-text", {
            method: "POST",
            body: dataForBackend,
            credentials: "include",
          });

          if (!res.ok) throw new Error("extract-text failed");

          const { results } = await res.json();

          const updatedQueue = formData.queue.value.map((item) => {
            const matchedFile = results.find((file) => file.filename === item.label);
            if (item.type === "file" && matchedFile) {
              return { ...item, content: matchedFile.text };
            }
            return item;
          });

          setFormData((prev) => ({
            ...prev,
            queue: {
              ...prev.queue,
              value: updatedQueue,
            },
          }));

          const extractedText = results.map((file) => ({
            filename: file.filename,
            content: file.text,
          }));

          const queueWithoutFiles = updatedQueue.map(({ file, ...rest }) => rest);

          createProject = await fetch("http://localhost:3000/api/projects/create-project", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newProject: {
                projectName: formData.projectName.value,
                subject: formData.subject.value,
                queue: queueWithoutFiles,
              },
              extractedText,
            }),
          });
        } catch (err) {
          console.error("Error: ", err);
        }
      }

      if (!createProject.ok) throw new Error("create-project failed");

      const { project } = await createProject.json();

      navigate(`/pr/${project.id}/loading`, {
        state: {
          projectId: project.id,
        },
      });
    }
  };

  const handleTnCClick = () => {
    setAgreedTnC((prev) => !prev);
    setTnCError("");
  };

  const handleAddToQueue = (e, name, value) => {
    if (e) e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      queue: {
        ...prev.queue,
        error: !value ? "Cannot add an empty source." : "",
        value: !value
          ? prev.queue.value
          : [
              {
                id: 0,
                type: name,
                label: value.name || value,
                content: "",
                ...(value?.name && { file: value }),
                ...(value?.name && { extension: value.name.split(".").pop().toLowerCase() }),
              },
              ...prev.queue.value.map((item) => ({
                ...item,
                id: item.id + 1,
              })),
            ],
      },
    }));

    setExtensions((prev) => {
      if (!value?.name) return prev;

      const ext = value.name.split(".").pop().toLowerCase();

      if (prev.includes(ext)) return prev;

      return [...prev, ext];
    });
  };

  const content = {
    0: {
      title: {
        text: "Create a",
        span: "New Project",
      },
      layout: Step1,
      props: {
        handleChange: handleChange,
        handleBlur: handleBlur,
        formData: formData,
      },
    },
    1: {
      title: {
        text: "Transform Gibrish Notes Into",
        span: "Beautiful Roadmaps",
      },
      layout: Step2,
      props: {
        type: isAddTextLinksPanelOpen,
        updateStepFunc: setStep,
        formData: formData,
        handleAddToQueue: handleAddToQueue,
        setIsAddTextLinksPanelOpen: setIsAddTextLinksPanelOpen,
        isAddTextLinksPanelOpen: isAddTextLinksPanelOpen,
        setFormData: setFormData,
      },
    },
    2: {
      title: {
        text: "Finishing Touches to",
        span: "Start Your Journey",
      },
      layout: Step3,
      props: {
        formData: formData,
        handleChange: handleChange,
        handleBlur: handleBlur,
        isError: isError,
        checked: agreedTnC,
        onClick: handleTnCClick,
        tnCError: tnCError,
        setFormData: setFormData,
        setCurrentExtension: setCurrentExtension,
        currentExtension: currentExtension,
        extensions: extensions,
      },
    },
  };

  const variants = {
    enter: (direction) => ({
      // prettier-ignore
      x: direction > 0 ? -300 : (isPrevious ? -300 : 300),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      // prettier-ignore
      x: direction > 0 ? 300 : (isPrevious ? 300 : -300),
      opacity: 0,
    }),
  };

  const { layout: CurrentStep, props } = content[step];

  const addLinksTextPanelProps = {
    type: isAddTextLinksPanelOpen,
    handleAddLink: handleAddToQueue,
    queue: formData.queue,
    setFormData: setFormData,
    setIsAddTextLinksPanelOpen: setIsAddTextLinksPanelOpen,
  };

  const progressBarsProps = {
    numProgressBars: Object.keys(content).length,
    updateStepFunc: setStep,
    currentStep: step,
    isError: isError,
    updateErrorFunc: handleBlur,
  };

  const controlStepBtnsProps = {
    step: step,
    updateStepFunc: setStep,
    setDirection: setDirection,
    setIsPrevious: setIsPrevious,
    formData: formData,
    setFormData: setFormData,
    isError: isError,
    updateErrorFunc: handleBlur,
  };

  const submitCreateProjectBtnProps = {
    formData: formData,
    agreedTnC: agreedTnC,
    setError: setTnCError,
    error: tnCError,
  };

  return (
    <div className="create-project-container">
      <motion.div key="modal" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        <div className="create-project-overlay-container overflow-x-hidden">
          {isAddTextLinksPanelOpen && <AddLinksTextPanel {...addLinksTextPanelProps} />}
          <AnimatePresence mode="wait">
            <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className={`w-full flex ${step === 0 && "flex-row-reverse"} justify-between`}>
                {step > 0 && <PreviousIconBtn updateStateFunc={setStep} />}
                <CloseBtn updateStateFunc={setIsCreateProject} />
              </div>
              <ProgressBars {...progressBarsProps} />
              <h1 className="text-center">
                {content[step].title.text} <span className="primary-color-text">{content[step].title.span}</span>
              </h1>
              <form onSubmit={handleSubmit} className="w-full">
                <CurrentStep {...props} />
                {step < 2 ? <ControlStepBtns {...controlStepBtnsProps} /> : <SubmitCreateProjectBtn {...submitCreateProjectBtnProps} />}
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
export default CreateProject;
