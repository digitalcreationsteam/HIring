// src/components/AssessmentIntro.tsx
"use client";

import React, { useState } from "react";
import { Button } from "../ui/components/Button";
import { TextField } from "../ui/components/TextField";
import { IconWithBackground } from "../ui/components/IconWithBackground";

import {
  FeatherArrowLeft,
  FeatherFileText,
  FeatherClock,
  FeatherCheckSquare,
  FeatherTrendingUp,
  FeatherTarget,
  FeatherUsers,
  FeatherMessageSquare,
  FeatherLayers,
} from "@subframe/core";

type Props = {
  skills?: string[];
  onBack?: () => void;
  onStart?: (payload: { role: string; skills: string[] }) => void;
  onSkip?: () => void;
};

export default function AssessmentIntro({
  skills: initialSkills,
  onBack,
  onStart,
  onSkip,
}: Props) {
  const [skills] = useState<string[]>(
    initialSkills?.length
      ? initialSkills
      : ["Product Strategy", "User Research", "Roadmapping"]
  );

  const [role, setRole] = useState("");
  const [starting, setStarting] = useState(false);

  const handleBack = () => {
    if (onBack) return onBack();
    alert("Back clicked — connect navigation.");
  };

  const handleStart = async () => {
    if (!role.trim()) return alert("Please enter your target role.");
    setStarting(true);
    try {
      if (onStart) {
        await onStart({ role: role.trim(), skills });
      } else {
        console.log("Assessment starting:", role, skills);
      }
    } finally {
      setStarting(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) return onSkip();
    alert("Skip clicked — wire routing.");
  };

  const startEnabled = role.trim().length > 0 && !starting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-neutral-50 px-14 py-16">
      <div className="w-full max-w-[900px]">
        <div className="bg-white rounded-[28px] px-10 py-10 shadow-[0_10px_30px_rgba(40,0,60,0.06)] border border-neutral-200">
          {/* Back Button */}
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherArrowLeft />}
            onClick={handleBack}
          >
            Back
          </Button>

          {/* Header */}
          <div className="mt-8 flex flex-col items-start gap-4 ml-2">
            <IconWithBackground
              size="large"
              square
              className="!bg-[#F4ECFF]  !text-[#7A3BFE] !rounded-2xl !w-14 !h-14 flex items-center justify-center"
              icon={<FeatherFileText className="w-6 h-6 !text-[#7A3BFE]" />}
            />

            <div className="flex-1">
              <h1 className="text-3xl text-neutral-900">Skill Assessment</h1>

              {/* SC2 bullet list */}
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <FeatherTarget className="mt-3 text-neutral-900" />
                  <div>
                    <div className="text-sm text-neutral-800">
                      Strategic thinking and execution
                    </div>
                    <div className="text-xs text-neutral-500">
                      Evaluates your ability to define product vision and
                      execute on roadmaps
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FeatherUsers className="mt-3 text-neutral-900" />
                  <div>
                    <div className="text-sm text-neutral-800">
                      User research and data analysis
                    </div>
                    <div className="text-xs text-neutral-500">
                      Tests your competency in gathering insights and making
                      data-driven decisions
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FeatherMessageSquare className="mt-3 text-neutral-900" />
                  <div>
                    <div className="text-sm text-neutral-800">
                      Stakeholder communication
                    </div>
                    <div className="text-xs text-neutral-500">
                      Assesses your skills in cross-functional collaboration and
                      alignment
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FeatherLayers className="mt-3 text-neutral-900" />
                  <div>
                    <div className="text-sm text-neutral-800">
                      Prioritization frameworks
                    </div>
                    <div className="text-xs text-neutral-500">
                      Measures your ability to balance competing priorities and
                      make tradeoffs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-neutral-200" />

          {/* Assessment Details */}
          <div className="mt-6 space-y-4">
            <div className="text-sm font-medium text-neutral-700">
              Assessment Details
            </div>

            {/* Pills */}
            <div className="flex flex-col gap-3">
              {/* Duration pill */}
              <div className="flex items-center justify-between rounded-full bg-gray-100 border border-neutral-200 px-4 py-2">
                <div className="flex items-center gap-3">
                  <IconWithBackground
                    size="small"
                    className="!bg-purple-100 !text-purple-700"
                    icon={<FeatherClock className="text-purple-700" />}
                  />
                  <div>
                    <div className="text-sm  text-neutral-800">Duration</div>
                  </div>
                </div>
                <div className="text-xs text-neutral-600">30 minutes</div>
              </div>

              <div className="flex items-center justify-between rounded-full bg-gray-100 border border-neutral-200 px-4 py-2">
    <div className="flex items-center gap-3">
      <IconWithBackground
        size="small"
        className="!bg-purple-100 !text-purple-700"
        icon={<FeatherCheckSquare className="text-purple-700" />}
      />
      <div>
        <div className="text-sm font-medium text-neutral-800">Questions</div>
      </div>
    </div>
    <div className="text-xs text-neutral-600">20 scenarios</div>
  </div>

              <div className="flex items-center justify-between rounded-full bg-gray-100  border border-neutral-200 px-4 py-2">
                <div className="flex items-center gap-3">
                  <IconWithBackground
                    size="small"
                    className="!bg-neutral-100 !text-neutral-700"
                    icon={<FeatherTrendingUp />}
                  />
                  <div>
                    <div className="text-sm font-medium text-neutral-800">
                      Impact
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 h-px bg-neutral-200" />

          {/* Start + Skip */}
          <div className="mt-6 flex flex-col items-center justify-center w-full">
            {/* Start assessment button */}
            <Button
              className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 
               text-white shadow-lg"
              onClick={handleStart}
              disabled={!startEnabled}
            >
              {starting ? "Starting..." : "Start assessment"}
            </Button>

            {/* Skip centered */}
            <Button
              variant="neutral-tertiary"
              onClick={handleSkip}
              className="mt-4 text-center"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
