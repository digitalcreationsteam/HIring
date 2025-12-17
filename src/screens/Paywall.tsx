"use client";

import React from "react";
import { Badge } from "../ui/components/Badge";
import { Button } from "../ui/components/Button";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherCheck, FeatherStar } from "@subframe/core";

function Paywall() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-[800px] flex flex-col items-center gap-10">
        {/* ✅ Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-sans text-gray-1000">Pick your plan</h1>
          <p className="text-sm text-gray-500 max-w-md">
            Choose how you want to use the platform. You can switch later.
          </p>
        </div>

        {/* ✅ Cards Wrapper */}
        <div className="w-full flex flex-wrap justify-center gap-8">
          {/* ✅ BASIC CARD */}
          <div className="w-full max-w-[380px] bg-white border border-gray-200 rounded-3xl p-6 flex flex-col gap-6 shadow-sm">
            <div>
              <h2 className="text-2xl text-gray-900">Basic Plan</h2>
              <p className="text-sm text-gray-500 mt-1">
                Good for starting out.
              </p>
            </div>

            <p className="text-sm font-medium">You get:</p>

            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {[
                "Access to your ranking table",
                "Skill tests twice a month",
                "Entry to all hackathons",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  {/* ✅ SAME SIZE AS PREMIUM NOW */}
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <FeatherCheck className="text-gray-600 w-3 h-3" />
                  </div>

                  <span className="text-sm text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ PREMIUM CARD (HIGHLIGHTED) */}
          <div className="w-full max-w-[380px] bg-white border-2 border-purple-600 rounded-3xl p-6 flex flex-col gap-6 shadow-md">
            {/* ✅ Title + Popular Badge */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl text-gray-900">Premium Plan</h2>

                <div className="flex items-center gap-1 bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                  <FeatherStar className="w-3 h-3" />
                  <span>Popular</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-1">For steady growth.</p>
            </div>

            <p className="text-sm font-medium">You get:</p>

            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {[
                "All Basic features",
                "Case studies and practice sets",
                "Courses and prep guides",
                "Monthly growth reports",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  {/* ✅ Light purple premium-only icon */}
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <FeatherCheck className="text-purple-600 w-3 h-3" />
                  </div>

                  <span className="text-sm text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ CONTINUE BUTTON */}
        <Button className="w-full max-w-[760px] h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Paywall;
