import { monthlyPlanId, yearlyPlanId } from "@/lib/payments";
import React from "react";
import SubscribeBtn from "../SubscribeBtn";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const plan = params.plan as string | undefined;
  const planId = plan === "monthly" ? monthlyPlanId : yearlyPlanId;
  if (!planId) {
    return <div>Invalid subscription plan.</div>;
  }
  return (
    <div className="flex border justify-center text-center p-4 rounded-md flex-col">
      <h1 className="text-2xl justify-center text-center font-bold">
        Start your subscription now:
      </h1>
      <div className="flex  mt-3 justify-center text-center">
        <SubscribeBtn price={planId} />
      </div>
    </div>
  );
}
