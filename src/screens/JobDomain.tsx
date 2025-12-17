"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { DropdownMenu } from "../ui/components/DropdownMenu";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherAlertTriangle } from "@subframe/core";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import * as SubframeCore from "@subframe/core";

function JobDomain() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-50 px-6 py-6">
      <div className="flex max-w-[1280px] grow shrink-0 basis-0 items-start justify-center gap-6 mx-auto">
        <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-start gap-6 rounded-lg border border-solid border-neutral-border bg-default-background px-8 py-8 shadow-lg">
          <div className="flex w-full items-center justify-center gap-4">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4">
              <div className="flex grow shrink-0 basis-0 items-center gap-2">
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
                <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-300" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Choose your job domain
            </span>
            <span className="text-caption font-caption text-subtext-color">
              Your domain and skills will decide your assessment and rankings
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-body-bold font-body-bold text-default-font">
                Job Domain *
              </span>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <div className="flex w-full items-center justify-between rounded-md border border-solid border-neutral-border bg-neutral-100 px-3 py-2 cursor-pointer">
                    <span className="text-body font-body text-default-font">
                      Product Management
                    </span>
                    <FeatherChevronDown className="text-body font-body text-default-font" />
                  </div>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu className="h-auto grow shrink-0 basis-0">
                      <DropdownMenu.DropdownItem icon={null}>
                        Product Management
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={null}>
                        Design
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={null}>
                        Data Analytics
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={null}>
                        Marketing
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </div>
            <div className="flex w-full flex-col items-start gap-3 rounded-md border border-solid border-warning-300 bg-warning-50 px-4 py-4">
              <div className="flex w-full items-start gap-3">
                <IconWithBackground
                  variant="warning"
                  size="small"
                  icon={<FeatherAlertTriangle />}
                />
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Choose with care.
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Your job domain cannot be changed later. Recruiters prefer
                    candidates who stay focused on one domain.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between border-t border-solid border-neutral-border pt-4">
            <Button
              className="h-8 grow shrink-0 basis-0"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDomain;