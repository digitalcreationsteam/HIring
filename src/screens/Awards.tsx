// src/components/Awards.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { TextField } from "../ui/components/TextField";
import {
  FeatherArrowLeft,
  FeatherAward,
  FeatherPackage,
  FeatherPlus,
  FeatherX,
  FeatherCheck,
} from "@subframe/core";

type AwardEntry = {
  id: string;
  name: string;
  description: string;
  year: string;
  isDemo?: boolean;
};

const toTitleCase = (value: string) =>
  value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const toSentenceCase = (v: string) =>
  v ? v.charAt(0).toUpperCase() + v.slice(1) : v;


const normalizeSpaces = (v: string) => v.replace(/\s+/g, " ").trim();

export default function Awards() {
  const navigate = useNavigate();
  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [experienceIndex, setExperienceIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchExperienceIndex = async () => {
      try {
        const res = await fetch("/api/experience-index", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setExperienceIndex(data.experienceIndex);
      } catch {
        // silent fail
      }
    };

    fetchExperienceIndex();
  }, []);

  // stored awards (example)
  const [awards, setAwards] = useState<AwardEntry[]>([
    {
      id: "example-1",
      name: "Hackathon Winner",
      description: "First place in University Tech Competition",
      year: "2021",
      isDemo: true,
    },
  ]);

  // SC2 small textfield classes
  const scTextFieldClass =
    "w-full [&>label]:text-[12px] [&>label]:font-medium [&>p]:text-[11px] [&>div]:rounded-full [&>div]:border [&>div]:border-neutral-300 [&>div]:h-9";
  const scInputClass =
    "rounded-full h-9 px-3 text-[12px] placeholder:text-[12px] bg-white !border-none focus:ring-0 w-full";


  const resetForm = () => {
    setName("");
    setDescription("");
    setYear("");
  };

  const handleAddAward = () => {
    if (!name.trim() || !description.trim() || !year.trim()) {
    alert("Please complete all required fields before adding.");
    return;
  }

    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();

    if (yearNum < 2000 || yearNum > currentYear) {
      alert(`Year must be between 2000 and ${currentYear}.`);
      return;
    }

    const newAward: AwardEntry = {
      id: String(Date.now()),
      name: normalizeSpaces(name),
      description: normalizeSpaces(description),
      year: year.trim(),
    };

    setAwards((prev) => {
      const withoutDemo = prev.filter((a) => !a.isDemo);
      return [newAward, ...withoutDemo];
    });

    resetForm();
  };

  const handleRemove = (id: string) => {
    setAwards((prev) => prev.filter((a) => a.id !== id));
  };

  const hasRealAward = awards.some((a) => !a.isDemo);
  const canContinue = hasRealAward;

  const handleContinue = () => {
    if (!hasRealAward) {
      alert("Please add at least one award to continue.");
      return;
    }

    const realAwards = awards.filter((a) => !a.isDemo);
    console.log("Awards submitted:", realAwards);

    navigate("/projects");
  };

  return (
    <div className="min-h-800px flex justify-center bg-neutral-50 px-20 py-20">
      <div className="w-full max-w-[800px] flex gap-8">
        {/* Left card */}
        <main className="w-full max-w-[448px] flex flex-col gap-6 rounded-[28px] border border-solid border-neutral-border bg-white px-8 py-8 shadow-[0_10px_30px_rgba(40,0,60,0.06)]">
          {/* top row - back + progress */}
          <div className="flex items-center gap-4">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={() => navigate(-1)}
            />
            <div className="flex-1 max-w-[420px]">
              <div className="flex items-center gap-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`p-${i}`}
                    style={{ height: 4 }}
                    className="flex-1 rounded-full bg-purple-700"
                  />
                ))}
                {[...Array(2)].map((_, i) => (
                  <div
                    key={`n-${i}`}
                    style={{ height: 4 }}
                    className="flex-1 rounded-full bg-neutral-200"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <header className=" w-full">
            <h2 className="text-[20px] font-semibold text-neutral-900">
              Add awards and extracurriculars
            </h2>
            <p className="text-xs text-neutral-500">
              These help recruiters understand your interests and achievements
            </p>
          </header>

          {/* Selected awards preview */}
          <section className="flex flex-col gap-3 w-full">
            {awards.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-neutral-900 leading-tight">
                    {a.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {a.description}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <IconButton
                    size="small"
                    icon={<FeatherX />}
                    tabIndex={0}
                    aria-label={`Delete award ${a.name}`}
                    onClick={() => handleRemove(a.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRemove(a.id);
                      }
                    }}
                    className="!bg-transparent !text-neutral-500"
                  />

                  <span className="text-xs text-neutral-500">{a.year}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddAward();
            }}
            className="flex flex-col gap-4 mt-2"
          >
            <TextField
              label="Award or Activity Name *"
              helpText=""
              className={scTextFieldClass}
            >
              <TextField.Input
                placeholder="e.g., Hackathon Winner"
                value={name}
                onChange={(e) => setName(toTitleCase(e.target.value))}
                className={scInputClass}
              />
            </TextField>

            <TextField
              label="Description *"
              helpText=""
              className={scTextFieldClass}
            >
              <TextField.Input
                placeholder="Brief description of the achievement or role"
                value={description}
                onChange={(e) => setDescription(toSentenceCase(e.target.value))}
                className={scInputClass}
              />
            </TextField>

            <TextField label="Year *" helpText="" className={scTextFieldClass}>
              <TextField.Input
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/[^\d]/g, ""))}
                maxLength={4}
                className={scInputClass}
              />
            </TextField>

            <div className="flex gap-3 mt-2">
              <Button
                type="button"
                variant="neutral-secondary"
                icon={<FeatherPlus />}
                className="w-full rounded-full h-10 px-4 flex items-center gap-2"
                onClick={handleAddAward}
              >
                Add another award
              </Button>
              <div className="flex-1" />
            </div>
          </form>

          <div className="w-full h-[1px] bg-gray-300 my-4 flex-shrink-0" />

          <footer>
            <Button
              className="w-full h-10 rounded-full bg-violet-700 text-white shadow-[0_6px_18px_rgba(99,52,237,0.18)]"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continue
            </Button>
          </footer>
        </main>

        {/* Right panel */}
        <aside className="w-72 shrink-0">
          <div className="sticky top-6 bg-white rounded-[20px] px-6 py-6 shadow-[0_10px_30px_rgba(40,0,60,0.04)] border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">
              Your Experience Index
            </h3>

            <div className="flex items-center justify-center py-6">
              <span aria-live="polite" className="font-['Afacad_Flux'] text-[48px] font-[500] leading-[56px] text-neutral-300">
                {experienceIndex ?? 0}
              </span>
            </div>

            <div className="h-px bg-neutral-100" />

            <div className="mt-4">
              <div className="text-sm font-semibold text-neutral-800 mb-3">
                Progress Steps
              </div>

              {/* ⚪ Completed — Demographics */}
              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2 mb-3 hover:bg-neutral-50"
              >
                <IconWithBackground
                  size="small"
                  icon={<FeatherCheck className="w-4 h-4 text-green-900" />}
                  className="!bg-green-100 !rounded-full !p-3"
                />
                <span className="text-sm text-neutral-700">Demographics</span>
              </button>

              {/* Education — completed (green) */}
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2 mb-3">
                <IconWithBackground
                  size="small"
                  icon={<FeatherCheck className="w-4 h-4 text-green-900" />}
                  className="!bg-green-100 !rounded-full !p-3"
                />
                <span className="text-sm text-neutral-700">Education</span>
              </div>

              {/* Experience — completed (green) */}
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2 mb-3">
                <IconWithBackground
                  size="small"
                  icon={<FeatherCheck className="w-4 h-4 text-green-900" />}
                  className="!bg-green-100 !rounded-full !p-3"
                />
                <span className="text-sm text-neutral-700">Experience</span>
              </div>

              {/* Certifications — completed (green) */}
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2 mb-3">
                <IconWithBackground
                  size="small"
                  icon={<FeatherCheck className="w-4 h-4 text-green-900" />}
                  className="!bg-green-100 !rounded-full !p-3"
                />
                <span className="text-sm text-neutral-700">Certifications</span>
              </div>

              {/* Awards — active (purple) */}
              <div className="flex items-center gap-3 rounded-2xl border border-violet-300 bg-violet-50 px-4 py-2 mb-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-white shadow-sm">
                  <IconWithBackground
                    size="small"
                    variant="neutral"
                    className="!bg-white !text-violet-600"
                    icon={<FeatherAward className="!text-violet-800" />}
                  />
                </div>
                <span className="text-sm font-semibold text-neutral-900">
                  Awards
                </span>
              </div>

              {/* Projects — inactive */}
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2">
                <IconWithBackground
                  variant="neutral"
                  size="small"
                  className="!bg-white !text-neutral-600"
                  icon={<FeatherPackage />}
                />
                <span className="text-sm text-neutral-500">Projects</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
