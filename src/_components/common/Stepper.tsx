import React from "react";
import cn from "~/lib/utils";
import CheckIcon from "../icons/Check";

interface StepperProps {
  steps: number;
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
}: StepperProps) => (
  <nav aria-label="Progress" className="w-full">
    <ol role="list" className="flex items-center">
      {Array.from({ length: steps }, (_, i) => i + 1).map((step) => (
        <li
          key={step}
          className={cn(step !== steps ? "pr-8 sm:pr-20" : "", "relative")}
        >
          {step < currentStep ? (
            <>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="h-0.5 w-full bg-green" />
              </div>

              <a
                href="#"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green hover:bg-indigo-900"
              >
                <CheckIcon aria-hidden="true" />
                <span className="sr-only">Step {step}</span>
              </a>
            </>
          ) : step === currentStep ? (
            <>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="h-0.5 w-full bg-gray-200" />
              </div>

              <a
                href="#"
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-green bg-white"
                aria-current="step"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full bg-green"
                  aria-hidden="true"
                />
              </a>
            </>
          ) : (
            <>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="h-0.5 w-full bg-gray-200" />
              </div>

              <a
                href="#"
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white"
                aria-current="step"
              >
                <span className="h-2.5 w-2.5 rounded-full" aria-hidden="true" />
              </a>
            </>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Stepper;
