const ProgressBars = ({ numProgressBars, updateStepFunc, currentStep, isError, updateErrorFunc }) => {
  let step = currentStep;

  const progressBars = [];

  const handleProgressBarClick = (index) => {
    if (isError) {
      updateErrorFunc();
    } else {
      step = index;
      updateStepFunc(index);
    }
  };

  for (let i = 0; i < numProgressBars; i++) {
    progressBars.push(
      <button className={`flex-1 h-8`} key={i} onClick={() => handleProgressBarClick(i)}>
        <div className={`steps-progress-bar ${i === step ? "steps-progress-bar-active" : ""}`}></div>
      </button>
    );
  }

  return <div className="w-full flex gap-8 py-6!">{progressBars}</div>;
};

export default ProgressBars;
