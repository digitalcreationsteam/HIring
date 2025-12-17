"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { Progress } from "../ui/components/Progress";
import { FeatherAward } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { FeatherGlobe } from "@subframe/core";
import { FeatherMap } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherRefreshCw } from "@subframe/core";
import { FeatherTrendingUp } from "@subframe/core";

function AssessmentResults() {
  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-4 bg-neutral-50 py-12">
      <div className="flex w-full max-w-[1024px] grow shrink-0 basis-0 flex-col items-center justify-center gap-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Assessment Results
            </span>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2">
            <Button
              variant="neutral-secondary"
              icon={<FeatherRefreshCw />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Retake Assessment (2 attempts left)
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-8 rounded-md border border-solid border-neutral-border px-12 py-12 bg-gradient-to-b from-brand-50 to-white">
          <div className="flex flex-col items-center gap-4">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Your Score
            </span>
            <div className="flex items-end gap-2">
              <span className="font-['Nunito_Sans'] text-[60px] font-[500] leading-[64px] text-brand-600">
                87
              </span>
              <span className="text-heading-2 font-heading-2 text-subtext-color pb-2">
                / 100
              </span>
            </div>
            <span className="text-body font-body text-default-font">
              Strong Performance
            </span>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full max-w-[576px] flex-col items-start gap-3">
              <div className="flex w-full items-center gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  Percentile
                </span>
                <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color text-right">
                  Top 15%
                </span>
              </div>
              <Progress value={85} />
              <span className="text-caption font-caption text-subtext-color">
                You scored higher than 85% of candidates who took this
                assessment
              </span>
            </div>
          </div>
          <div className="flex w-full items-start gap-6 flex-wrap">
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
              <div className="flex items-center gap-2">
                <FeatherCalendar className="text-heading-2 font-heading-2 text-success-600" />
                <span className="text-heading-2 font-heading-2 text-default-font">
                  Dec 15, 2024
                </span>
              </div>
              <span className="text-body font-body text-subtext-color">
                Completed
              </span>
            </div>
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
              <div className="flex items-center gap-2">
                <FeatherClock className="text-heading-2 font-heading-2 text-brand-600" />
                <span className="text-heading-2 font-heading-2 text-default-font">
                  27 minutes
                </span>
              </div>
              <span className="text-body font-body text-subtext-color">
                Time Taken
              </span>
            </div>
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
              <div className="flex items-center gap-2">
                <FeatherTrendingUp className="text-heading-2 font-heading-2 text-warning-600" />
                <span className="text-heading-2 font-heading-2 text-default-font">
                  +12 points
                </span>
              </div>
              <span className="text-body font-body text-subtext-color">
                vs. Previous
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-4 flex-wrap">
          <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
            <div className="flex items-center gap-2">
              <FeatherAward className="text-heading-2 font-heading-2 text-brand-600" />
              <span className="text-heading-2 font-heading-2 text-default-font">
                Top 5%
              </span>
            </div>
            <span className="text-body font-body text-subtext-color">
              University Ranking
            </span>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
            <div className="flex items-center gap-2">
              <FeatherMapPin className="text-heading-2 font-heading-2 text-brand-600" />
              <span className="text-heading-2 font-heading-2 text-default-font">
                Top 12%
              </span>
            </div>
            <span className="text-body font-body text-subtext-color">
              City Ranking
            </span>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
            <div className="flex items-center gap-2">
              <FeatherMap className="text-heading-2 font-heading-2 text-brand-600" />
              <span className="text-heading-2 font-heading-2 text-default-font">
                Top 18%
              </span>
            </div>
            <span className="text-body font-body text-subtext-color">
              State Ranking
            </span>
          </div>
          <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-12 py-8 shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <FeatherGlobe className="text-heading-2 font-heading-2 text-brand-600" />
              <span className="text-heading-2 font-heading-2 text-default-font">
                #4567
              </span>
            </div>
            <span className="text-body font-body text-subtext-color">
              Country Ranking
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Button
            className="h-8 grow shrink-0 basis-0"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AssessmentResults;