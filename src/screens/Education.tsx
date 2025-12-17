// src/components/Education.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../ui/components/Avatar";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { Switch } from "../ui/components/Switch";
import { TextField } from "../ui/components/TextField";
import {
  FeatherArrowLeft,
  FeatherAward,
  FeatherBriefcase,
  FeatherFileCheck,
  FeatherGraduationCap,
  FeatherPackage,
  FeatherPlus,
  FeatherX,
  FeatherCheck,
} from "@subframe/core";
import API, { URL_PATH } from "src/common/API";

type EducationEntry = {
  id: string;
  degree: string;
  fieldOfStudy: string;
  schoolName: string;
  startYear: string;
  endYear?: string;
  currentlyStudying: boolean;
  gpa?: string;
  isDemo?: boolean;
};

const normalize = (v: string) => v.replace(/\s+/g, " ").trim();

const isValidYear = (value: string) => {
  if (!/^\d{4}$/.test(value)) return false;
  const year = Number(value);
  const currentYear = new Date().getFullYear();
  return year >= 1950 && year <= currentYear + 1;
};

const isEndAfterStart = (start: string, end: string) => {
  return Number(end) >= Number(start);
};

const toTitleCase = (v: string) =>
  normalize(v)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function Education() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  // local form state
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentlyStudying, setStudying] = useState(false);
  const [gpa, setGpa] = useState("");
  const [experienceIndex, setExperienceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchExperienceIndex = async () => {
      try {
        const res = await fetch("/api/experience-index", {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        setExperienceIndex(data.experienceIndex);
      } catch {}
    };

    fetchExperienceIndex();
  }, [userId]);

  // stored entries
  const [educations, setEducations] = useState<EducationEntry[]>([
    // default example entry to match UI preview, remove if undesired
    {
      id: "example-1",
      degree: "Bachelor of Science in Computer Science",
      fieldOfStudy: "Computer Science",
      schoolName: "Stanford University",
      startYear: "2018",
      endYear: "2022",
      currentlyStudying: false,
      gpa: "",
      isDemo: true,
    },
  ]);

  // helpers
  const isAddable = () => {
    if (
      !degree.trim() ||
      !fieldOfStudy.trim() ||
      !schoolName.trim() ||
      !startYear.trim()
    ) {
      return false;
    }

    if (!isValidYear(startYear)) {
      alert("Start year must be a valid year.");
      return false;
    }

    if (!currentlyStudying) {
      if (!endYear.trim()) {
        alert("End year is required.");
        return false;
      }

      if (!isValidYear(endYear)) {
        alert("End year must be a valid year.");
        return false;
      }

      if (!isEndAfterStart(startYear, endYear)) {
        alert("End year must be after start year.");
        return false;
      }
    }

    if (gpa && !/^(?:10(?:\.0{1,2})?|[0-9](?:\.\d{1,2})?)$/.test(gpa)) {
      alert("GPA must be between 0 and 10");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setDegree("");
    setFieldOfStudy("");
    setSchoolName("");
    setStartYear("");
    setEndYear("");
    setStudying(false);
    setGpa("");
  };

  const handleAddEducation = () => {
    if (!isAddable()) {
      alert("Please complete all required fields before adding.");
      return;
    }

    const newEntry: EducationEntry = {
      id: String(Date.now()),
      degree: toTitleCase(degree),
      fieldOfStudy: toTitleCase(fieldOfStudy),
      schoolName: toTitleCase(schoolName),
      startYear: startYear.trim(),
      endYear: currentlyStudying ? undefined : endYear.trim(),
      currentlyStudying,
      gpa: gpa.trim() || undefined,
    };

    const duplicate = educations.some(
      (e) =>
        !e.isDemo &&
        normalize(e.degree) === normalize(degree) &&
        normalize(e.fieldOfStudy) === normalize(fieldOfStudy) &&
        normalize(e.schoolName) === normalize(schoolName) &&
        e.startYear === startYear
    );

    if (duplicate) {
      alert("This education already exists.");
      return;
    }

    setEducations((prev) => {
      const withoutDemo = prev.filter((e) => !e.isDemo);
      return [newEntry, ...withoutDemo];
    });

    resetForm();
  };

  const handleRemove = (id: string) => {
    setEducations((prev) => prev.filter((e) => e.id !== id));
  };

  const hasRealEducation = educations.some((edu) => !edu.isDemo);
  const canContinue = hasRealEducation;

  /* -------------------- BUILD PAYLOAD -------------------- */
  const buildPayload = (list: EducationEntry[]) => {
    if (!userId) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return null;
    }

    const currentYear = new Date().getFullYear();

    return {
      educations: list.map((edu) => {
        const start = Number(edu.startYear);
        const end = edu.currentlyStudying ? currentYear : Number(edu.endYear);

        return {
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          schoolName: edu.schoolName,
          startYear: start,
          endYear: edu.currentlyStudying ? null : end,
          duration: Math.max(0, end - start),
          currentlyStudying: edu.currentlyStudying,
          gpa: edu.gpa ? Number(edu.gpa) : null,
        };
      }),
    };
  };

  const handleContinue = async () => {
    if (!hasRealEducation) {
      alert("Please add your education to continue.");
      return;
    }

    const cleanEducations = educations.filter((e) => !e.isDemo);

    if (cleanEducations.length === 0) {
      alert("Please add at least one education.");
      return;
    }

    const payload = buildPayload(cleanEducations);
    if (!payload) return;

    try {
      await API("POST", URL_PATH.education, payload, undefined, {
        "user-id": userId,
      });

      navigate("/experience");
    } catch (err: any) {
      alert(err.message || "Failed to save education");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-50 via-white to-neutral-50 px-6 py-20">
      <div className="w-full max-w-[800px] flex gap-8">
        {/* Left card */}
        <main className="w-full max-w-[480px] bg-white rounded-3xl border px-8 py-6 shadow-[0_10px_30px_rgba(40,0,60,0.06)]">
          {/* Top: back + progress */}
          <div className="flex items-center gap-4">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={() => navigate(-1)}
            />

            <div className="flex-1 max-w-[420px]">
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`p-${i}`}
                    style={{ height: 6 }}
                    className="flex-1 rounded-full bg-violet-700"
                  />
                ))}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`n-${i}`}
                    style={{ height: 6 }}
                    className="flex-1 rounded-full bg-neutral-200"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="mt-6">
            <h2 className="text-[20px] font-semibold text-neutral-900">
              Add your education
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Your academic background helps shape your Experience Index
            </p>
          </header>

          {/* Selected education preview list */}
          <section className="mt-6 flex flex-col gap-3">
            {educations.map((ed) => (
              <div
                key={ed.id}
                className="flex w-full flex-col items-start gap-3 rounded-3xl border border-neutral-300 bg-neutral-50 px-4 py-4"
              >
                <div className="flex w-full items-center justify-between">
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=400&fit=crop"
                      square
                      className="!rounded-2xl shadow-sm"
                    >
                      {ed.schoolName
                        .split(" ")
                        .slice(0, 2)
                        .map((s) => s[0])
                        .join("")}
                    </Avatar>

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-neutral-900">
                        {ed.degree}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {ed.schoolName}
                      </span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-2">
                    <IconButton
                      size="small"
                      icon={<FeatherX />}
                      onClick={() => handleRemove(ed.id)}
                      className="!bg-transparent !text-neutral-500"
                    />

                    <span className="text-xs text-neutral-500">
                      {ed.startYear}{" "}
                      {ed.currentlyStudying ? " - Present" : ` - ${ed.endYear}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddEducation();
            }}
            className="mt-6 flex flex-col gap-4"
          >
            {/* Degree */}
            <TextField
              label="Degree *"
              helpText="e.g., Bachelor's, Master's, MBA"
              className="w-full [&>label]:text-xs [&>div]:rounded-full [&>div]:border [&>div]:border-neutral-200"
            >
              <TextField.Input
                placeholder="Select or type your degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="rounded-full h-10 px-4 bg-white !border-none focus:ring-0"
              />
            </TextField>

            {/* Field of Study */}
            <TextField
              className="h-auto w-full [&>div]:rounded-full [&>div]:border [&>div]:border-neutral-200"
              label="Field of Study *"
              helpText="Your major or concentration"
            >
              <TextField.Input
                className="rounded-full h-10 px-4 bg-white !border-none focus:ring-0"
                placeholder="e.g., Computer Science, Business Administration"
                value={fieldOfStudy}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldOfStudy(ev.target.value)
                }
              />
            </TextField>

            {/* School Name */}
            <TextField
              className="h-auto w-full [&>div]:rounded-full [&>div]:border [&>div]:border-neutral-200"
              label="School Name *"
              helpText=""
            >
              <TextField.Input
                className="rounded-full h-10 px-4 bg-white !border-none focus:ring-0"
                placeholder="Name of institution"
                value={schoolName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setSchoolName(ev.target.value)
                }
              />
            </TextField>

            {/* Years */}
            <div className="flex gap-4">
              <TextField
                label="Start Year *"
                helpText=""
                className="[&>div]:rounded-full [&>div]:border [&>div]:border-neutral-200 flex-1"
              >
                <TextField.Input
                  className="rounded-full h-10 px-4 bg-white !border-none focus:ring-0"
                  placeholder="YYYY"
                  value={startYear}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    // enforce numeric-ish input
                    setStartYear(ev.target.value.replace(/[^\d]/g, ""));
                  }}
                  maxLength={4}
                />
              </TextField>

              <TextField
                label="End Year *"
                helpText=""
                className="[&>div]:rounded-full [&>div]:border [&>div]:border-neutral-200 flex-1"
              >
                <TextField.Input
                  className={`rounded-full h-10 px-4 focus:ring-0 ${
                    currentlyStudying
                      ? "bg-neutral-100/50 !border-none"
                      : "bg-white !border-none"
                  }`}
                  placeholder="YYYY"
                  value={endYear}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setEndYear(ev.target.value.replace(/[^\d]/g, ""))
                  }
                  maxLength={4}
                  disabled={currentlyStudying}
                />
              </TextField>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={currentlyStudying}
                onCheckedChange={setStudying}
                tabIndex={0}
                role="switch"
                aria-checked={currentlyStudying}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setStudying((prev) => !prev);
                  }
                }}
                className="
    h-5 w-9
    data-[state=checked]:bg-violet-700
    data-[state=unchecked]:bg-neutral-300
    [&>span]:h-4 [&>span]:w-3
    [&>span]:data-[state=checked]:translate-x-2
    [&>span]:data-[state=unchecked]:translate-x-0
  "
              />

              <span className="text-sm text-neutral-700">
                I am currently studying
              </span>
            </div>

            {/* GPA */}
            <TextField
              className="h-auto w-full [&>div]:rounded-full [&>div]:border [&>div]:border-neutral-200"
              label="GPA"
              helpText=""
            >
              <TextField.Input
                className="rounded-full h-10 px-4 bg-white !border-none focus:ring-0"
                placeholder="e.g., 7.8 (out of 10)"
                value={gpa}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setGpa(ev.target.value)
                }
              />
            </TextField>

            <div className="mt-2 flex gap-3 items-center">
              <Button
                type="button"
                variant="neutral-secondary"
                icon={<FeatherPlus />}
                className="w-full rounded-full h-10 px-4 flex items-center gap-2"
                onClick={handleAddEducation}
              >
                Add another education
              </Button>
              <div className="flex-1" /> {/* pushes continue to the right */}
            </div>
          </form>
          {/* Top form horizontal line */}
          <div className="w-full h-[1px] bg-gray-300 my-4 flex-shrink-0" />
          <footer>
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`
    w-full h-10 rounded-full
    transition-all
    ${
      canContinue
        ? "bg-violet-700 text-white shadow-[0_6px_18px_rgba(99,52,237,0.18)]"
        : "bg-violet-300 text-white cursor-not-allowed"
    }
  `}
            >
              Continue
            </Button>
          </footer>
        </main>

        {/* Right panel */}

        <aside className="w-72 shrink-0">
          <div className="sticky top-6 bg-white rounded-[20px] px-6 py-6 shadow-[0_10px_30px_rgba(40,0,60,0.04)] border border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-900">
              Your Experience Index
            </h3>

            <div className="flex items-center justify-center py-6">
              <span className="font-['Afacad_Flux'] text-[48px] font-[500] leading-[56px] text-neutral-300">
                {experienceIndex ?? 0}
              </span>
            </div>

            {/* Top form horizontal line */}
            <div className="w-full h-[1px] bg-gray-300 my-4 flex-shrink-0" />

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

              {/* 🟣 Active — Education */}
              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-2 mb-3 hover:shadow-sm"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-white shadow-sm">
                  <IconWithBackground
                    size="small"
                    icon={<FeatherGraduationCap />}
                  />
                </div>
                <span className="text-sm font-semibold text-neutral-900">
                  Education
                </span>
              </button>

              {/* Inactive steps */}
              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-neutral-200 bg-default-background px-4 py-2 mb-3 hover:bg-neutral-50"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-white">
                  <IconWithBackground
                    variant="neutral"
                    size="small"
                    icon={<FeatherBriefcase />}
                  />
                </div>
                <span className="text-sm text-neutral-500">Experience</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-neutral-200 bg-default-background px-4 py-2 mb-3 hover:bg-neutral-50"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-white">
                  <IconWithBackground
                    variant="neutral"
                    size="small"
                    icon={<FeatherFileCheck />}
                  />
                </div>
                <span className="text-sm text-neutral-500">Certifications</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-neutral-200 bg-default-background px-4 py-2 mb-3 hover:bg-neutral-50"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-white">
                  <IconWithBackground
                    variant="neutral"
                    size="small"
                    icon={<FeatherAward />}
                  />
                </div>
                <span className="text-sm text-neutral-500">Awards</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-neutral-200 bg-default-background px-4 py-2 hover:bg-neutral-50"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-white">
                  <IconWithBackground
                    variant="neutral"
                    size="small"
                    icon={<FeatherPackage />}
                  />
                </div>
                <span className="text-sm text-neutral-500">Projects</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
