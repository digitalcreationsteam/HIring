"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherInfo } from "@subframe/core";

function SkillIndexIntro() {
  return (
    /* Use more space, turn this into a notion style page */
    <div className="min-h-screen w-full items-center justify-center bg-neutral-50 px-10 py-16">
      <div className="flex max-w-[880px] grow shrink-0 basis-0 items-start justify-center gap-6 mx-auto">
        <div className="flex max-w-[768px] grow shrink-0 basis-0 flex-col items-start gap-8 rounded-3xl border border-solid border-neutral-border bg-white px-12 py-10 shadow-lg">
          <div className="flex w-full items-center justify-center gap-4">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4">
              <div className="flex grow shrink-0 basis-0 items-center gap-2">
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-700" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-violet-300" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <h2 className="text-[30px] text-semibold text-neutral-900">
              Now let's calculate your Skill Index
            </h2>

            <p className="text-xs text-neutral-500">
              The Skill Index is the foundation of UniTalent’s hiring system and
              the most important step in your evaluation. It provides evidence
              of job readiness and role-relevant knowledge, enabling
              transparent, skill-first hiring
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              What happens next
            </span>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-caption-bold font-caption-bold text-brand-primary" />
              <div className="flex flex-col items-start gap-1">
                <span className=" text-default-font">
                  Chose your job domain
                </span>
                <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                  {
                    "You will be asked to select your primary job domain — the role you want to be evaluated for."
                  }
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-caption-bold font-caption-bold text-brand-primary" />
              <div className="flex flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Take the Skill Index Assessment
                </span>
                <span className="text-body font-body text-subtext-color">
                  You will complete a focused, role-specific assessment designed
                  to objectively evaluate your readiness for this role.
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-caption-bold font-caption-bold text-brand-primary" />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Get your Hireability Score
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Your performance here directly impacts how recruiters
                    discover, evaluate, and rank your profile on UniTalent
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-3 rounded-md border border-solid border-brand-200 bg-brand-50 px-6 py-6">
              <div className="flex w-full items-start gap-4">
                <IconWithBackground
                  variant="brand"
                  size="medium"
                  icon={<FeatherInfo />}
                />
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Note :
                  </span>
                  <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                    {
                      "This is the most critical part of the process.\nRecruiters rely on the Skill Index to make decisions.\nYour performance here determines how you stand among others competing for the same roles."
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between border-t border-solid border-neutral-border pt-6">
            <Button
              className="h-10 grow shrink-0 basis-0"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Proceed to Skill Index Assessment
            </Button>
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start bg-gradient-to-br from-brand-500 to-brand-700 absolute inset-0 -z-10" />
      </div>
    </div>
  );
}

export default SkillIndexIntro;
