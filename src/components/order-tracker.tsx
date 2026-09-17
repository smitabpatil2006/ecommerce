"use client";

import { useSyncExternalStore } from "react";

import { ORDER_STAGES, type OrderStage } from "@/db/schema";
import { formatDate } from "@/lib/format";
import { currentStage, STAGE_LABELS } from "@/lib/orders";

const TICK_MS = 15000;

const subscribeToTick = (onChange: () => void) => {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
};

export function OrderTracker({
  stage,
  createdAt,
  estimatedDelivery,
}: {
  stage: OrderStage;
  createdAt: Date;
  estimatedDelivery: Date;
}) {
  const tick = useSyncExternalStore(
    subscribeToTick,
    () => Math.floor(Date.now() / TICK_MS),
    () => 0,
  );
  const now = tick === 0 ? createdAt : new Date(tick * TICK_MS);

  const active = currentStage({ stage, createdAt, estimatedDelivery }, now);
  const activeIndex = ORDER_STAGES.indexOf(active);

  return (
    <div className="mt-6">
      <ol className="flex items-center">
        {ORDER_STAGES.map((entry, index) => {
          const reached = index <= activeIndex;
          return (
            <li key={entry} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    reached
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "border border-neutral-300 text-neutral-400 dark:border-neutral-700"
                  }`}
                >
                  {reached ? "✓" : index + 1}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    index === activeIndex
                      ? "text-orange-600"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {STAGE_LABELS[entry]}
                </span>
              </div>
              {index < ORDER_STAGES.length - 1 && (
                <span
                  className={`mx-2 mb-5 h-0.5 flex-1 ${
                    index < activeIndex
                      ? "bg-neutral-900 dark:bg-white"
                      : "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>

      <p
        data-testid="order-status"
        className="mt-4 text-sm text-neutral-600 dark:text-neutral-300"
      >
        <span className="font-semibold">{STAGE_LABELS[active]}</span> ·{" "}
        {active === "delivered" ? "Delivered on " : "Estimated delivery "}
        {formatDate(estimatedDelivery)}
      </p>
    </div>
  );
}
