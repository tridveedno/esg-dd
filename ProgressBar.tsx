import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-brand-purple text-white'
                    : index === currentStep
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`mt-2 text-xs text-center hidden md:block ${
                  index <= currentStep ? 'text-brand-purple font-semibold' : 'text-gray-400'
                }`}
              >
                {step}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                  index < currentStep ? 'bg-brand-purple' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
