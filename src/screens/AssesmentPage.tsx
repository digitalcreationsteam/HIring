"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/components/Button";
import { CheckboxCard } from "../ui/components/CheckboxCard";
import { Progress } from "../ui/components/Progress";
import { FeatherAlertCircle } from "@subframe/core";
import { FeatherArrowRight } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { FeatherSidebar } from "@subframe/core";
import { FeatherX } from "@subframe/core";

type OptionKey = "A" | "B" | "C" | "D";

type Question = {
  id: number;
  prompt: string;
  options: {
    key: OptionKey;
    title: string;
    description: string;
  }[];
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function AssessmentPage() {
  // --- QUESTIONS (kept same content as your UI) ---
  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        prompt:
          "You are the PM for a mobile app with declining engagement. User research shows three key pain points: slow load times, confusing navigation, and lack of personalization. Your engineering team can only tackle one issue this quarter. Which should you prioritize?",
        options: [
          {
            key: "A",
            title: "A. Fix slow load times",
            description:
              "Performance impacts every user session and creates frustration before they can even use features. Faster load times directly improve retention metrics.",
          },
          {
            key: "B",
            title: "B. Simplify navigation",
            description:
              "If users cannot find features, they cannot use them. Better navigation increases feature discovery and time spent in app.",
          },
          {
            key: "C",
            title: "C. Add personalization",
            description:
              "Personalized experiences drive engagement and make users feel the app understands their needs, creating stronger product-market fit.",
          },
          {
            key: "D",
            title: "D. Address all three issues with a phased approach",
            description:
              "Rather than choosing one, break each problem into smaller increments and ship iterative improvements across all three areas throughout the quarter.",
          },
        ],
      },
      // create 20 questions placeholders to match your UI counts (you can replace these)
      ...Array.from({ length: 19 }).map((_, idx) => ({
        id: idx + 2,
        prompt: `Placeholder question ${idx + 2}`,
        options: [
          {
            key: "A" as OptionKey,
            title: `A. Option A for ${idx + 2}`,
            description: "Option A description",
          },
          {
            key: "B" as OptionKey,
            title: `B. Option B for ${idx + 2}`,
            description: "Option B description",
          },
          {
            key: "C" as OptionKey,
            title: `C. Option C for ${idx + 2}`,
            description: "Option C description",
          },
          {
            key: "D" as OptionKey,
            title: `D. Option D for ${idx + 2}`,
            description: "Option D description",
          },
        ],
      })),
    ],
    []
  );

  // --- STATE ---
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 0-based
  const [answers, setAnswers] = useState<(OptionKey | null)[]>(() =>
    Array(questions.length).fill(null)
  );

  // Timer initial value matches your UI: 24:59 => 24 * 60 + 59;
  const initialTimeSeconds = 24 * 60 + 59;
  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(initialTimeSeconds);

  // --- TIMER EFFECT ---
  useEffect(() => {
    const id = setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // --- COMPUTED VALUES ---
  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers]
  );
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // --- HANDLERS ---
  const selectOption = (key: OptionKey) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = key;
      return copy;
    });
  };

  const clearAnswer = (index: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setCurrentIndex(index);
  };

  const skipQuestion = () => {
    // leave current question unanswered and move forward
    const next = Math.min(currentIndex + 1, questions.length - 1);
    setCurrentIndex(next);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // last question -> submit
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Replace this with your real submit API call.
    // For now we log and show a simple alert.
    console.log("Submitting answers:", answers);
    alert(
      `Submitting ${answeredCount} answered of ${questions.length}. Check console for detailed answers.`
    );
  };

  // --- RENDER NAVIGATOR NUMBERS (keeps UI markup/style) ---
  const renderNavigatorItem = (qIndex: number) => {
    const isCurrent = qIndex === currentIndex;
    const isAnswered = answers[qIndex] !== null;
    // replicate the same class names used in UI for each visual state
    if (isCurrent) {
      return (
        <div
          key={qIndex}
          onClick={() => goToQuestion(qIndex)}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border-2 border-solid border-violet-600 bg-violet-100 cursor-pointer"
        >
          <span className="text-body-bold font-body-bold text-brand-600">
            {qIndex + 1}
          </span>
        </div>
      );
    }

    if (isAnswered) {
      return (
        <div
          key={qIndex}
          onClick={() => goToQuestion(qIndex)}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-green-100 cursor-pointer"
        >
          <span className="text-body-bold font-body-bold text-success-700">
            {qIndex + 1}
          </span>
        </div>
      );
    }

    // unanswered default
    return (
      <div
        key={qIndex}
        onClick={() => goToQuestion(qIndex)}
        className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border-2 border-solid border-neutral-border bg-default-background cursor-pointer"
      >
        <span className="text-body-bold font-body-bold text-subtext-color">
          {qIndex + 1}
        </span>
      </div>
    );
  };

  // For display: mm:ss
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  // Current question to show
  const currentQuestion = questions[currentIndex];

  //Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="w-screen h-screen bg-neutral-50 flex justify-center py-12">
      <div className="flex w-full max-w-[1024px] h-full items-stretch gap-6">
        <div className="flex w-64 flex-none flex-col items-start gap-4 self-stretch h-full rounded-2xl border border-solid border-neutral-border bg-white px-8 py-8 overflow-y-auto">
          <div className="flex w-full items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Question Navigator
              </span>
              <span className="text-sm font-caption text-subtext-color">
                {answeredCount} of {questions.length} answered
              </span>
            </div>
            <FeatherSidebar
              className="mt-2 text-body font-body text-subtext-color cursor-pointer"
              onClick={() => setSidebarOpen((prev) => !prev)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-3">
            {questions.map((_, idx) => renderNavigatorItem(idx))}
          </div>

          {/* Bottom horizontal line */}
          <div className="w-full h-[1px] bg-gray-300 my-4 flex-shrink-0" />

          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-center gap-2">
              <div className="flex h-3 w-3 flex-none items-start rounded-full bg-violet-600" />
              <span className="text-caption font-caption text-default-font">
                Current
              </span>
            </div>
            <div className="flex w-full items-center gap-2">
              <div className="flex h-3 w-3 flex-none items-start rounded-full bg-green-200" />
              <span className="text-caption font-caption text-default-font">
                Answered
              </span>
            </div>
            <div className="flex w-full items-center gap-2">
              <div className="flex h-3 w-3 flex-none items-start rounded-full border border-solid border-neutral-border bg-default-background" />
              <span className="text-caption font-caption text-default-font">
                Unanswered
              </span>
            </div>
          </div>
        </div>

        <div className="flex grow shrink-0 basis-0 flex-col items-start justify-start gap-4 h-full">
          <div className="flex w-full items-center justify-between rounded-full border bg-yellow-50 px-3 py-1">
            <div className="flex items-center gap-2">
              <FeatherAlertCircle className="text-caption font-caption text-yellow-700" />
              <span className="text-xs text-yellow-700">
                Your Skill Index is built from this score
              </span>
            </div>
            <FeatherX className="text-caption font-caption text-yellow-700" />
          </div>

          <div className="flex w-full flex-col items-start gap-6 rounded-2xl border border-solid border-neutral-border bg-white px-8 py-8 shadow-sm">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-subtext-color">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2">
                <FeatherClock className="text-body font-body text-default-font" />
                <div className="flex items-center gap-1">
                  <span className="text-sm font-body-bold text-default-font">
                    {pad2(minutes)}:{pad2(seconds)}
                  </span>
                  <span className="text-sm text-default-font">remaining</span>
                </div>
              </div>
            </div>

            {/* progress bar (custom accessible) */}
            <div className="flex w-full flex-col items-start gap-2">
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercent}
                className="w-full rounded-full bg-neutral-200 h-2 overflow-hidden"
                title={`${progressPercent}% complete`}
              >
                <div
                  className="h-full rounded-full bg-violet-600"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="text-caption font-caption text-neutral-600">
                {progressPercent}% complete
              </span>
            </div>

            <span className="w-full text-heading-3 font-heading-3 text-neutral-700">
              Product Management Fundamentals Assessment
            </span>

            {/* Bottom horizontal line */}
            <div className="w-full h-[1px] bg-gray-300 my-2 flex-shrink-0" />

            <div className="flex w-full flex-col items-start gap-4">
              <span className="font-['Nunito_Sans'] text-[16px] font-[500] leading-[24px] text-default-font">
                {currentQuestion.prompt}
              </span>

              <div className="flex w-full flex-col items-start gap-3">
                {currentQuestion.options.map((opt) => (
                  <CheckboxCard
                    key={opt.key}
                    className={`h-auto w-full flex-none rounded-2xl border px-4 py-3 
  ${
    answers[currentIndex] === opt.key
      ? "border-violet-600 bg-violet-50"
      : "border-neutral-200 bg-white"
  }
`}
                    hideCheckbox={true}
                    checked={answers[currentIndex] === opt.key}
                    onCheckedChange={(checked: boolean) => {
                      // CheckboxCard's onCheckedChange passes boolean;
                      // treat any truthy as selection
                      if (checked) selectOption(opt.key);
                      else {
                        // uncheck (if the component allows toggling)
                        setAnswers((prev) => {
                          const copy = [...prev];
                          // only clear if the same option being toggled off
                          if (copy[currentIndex] === opt.key)
                            copy[currentIndex] = null;
                          return copy;
                        });
                      }
                    }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-body-bold font-body-bold text-default-font">
                        {opt.title}
                      </span>

                      <span className="text-xs font-body text-subtext-color">
                        {opt.description}
                      </span>
                    </div>
                  </CheckboxCard>
                ))}
              </div>
            </div>

            {/* Bottom horizontal line */}
            <div className="w-full h-[1px] bg-gray-300 my-2 flex-shrink-0" />

            <div className="flex w-full rounded-full items-center justify-between">
              <Button
                className="w-10px h-10 rounded-full text-white]"
                variant="neutral-secondary"
                size="large"
                onClick={() => skipQuestion()}
              >
                Skip Question
              </Button>
              <Button
                className="w-10px h-10 rounded-full bg-gradient-to-r from-violet-600 to-violet-600  hovur:from-violet-600 hover:to-violet-800
               text-white shadow-[0_6px_18px_rgba(99,52,237,0.18)]"
                size="large"
                iconRight={<FeatherArrowRight />}
                onClick={() => nextQuestion()}
              >
                {currentIndex < questions.length - 1
                  ? "Next Question"
                  : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;
