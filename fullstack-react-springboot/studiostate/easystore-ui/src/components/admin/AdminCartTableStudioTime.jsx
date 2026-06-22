import React from "react";
import { calculateDuration, formatDateTime } from "../../utils/time";

export default function AdminCartTableStudioTime({
  item,
  lineTotal,
  passInCart,
}) {
  return (
    <div className="flex flex-col items-start gap-3 text-left w-full">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm w-full">
        <span className="font-semibold text-primary dark:text-light">Name</span>
        <span className="text-gray-700 dark:text-gray-200">
          {item.userName || "-"}
        </span>
        <span className="font-semibold text-primary dark:text-light">
          Session Id
        </span>
        <span className="text-gray-700 dark:text-gray-200">
          {item.sessionId || "-"}
        </span>
        <span className="font-semibold text-primary dark:text-light">From</span>
        <span className="text-gray-700 dark:text-gray-200">
          {formatDateTime(item.startDateTime) || "-"}
        </span>

        <span className="font-semibold text-primary dark:text-light">To</span>
        <span className="text-gray-700 dark:text-gray-200">
          {formatDateTime(item.endDateTime) || "-"}
        </span>

        <span className="font-semibold text-primary dark:text-light">
          Duration
        </span>
        <span className="text-gray-700 dark:text-gray-200">
          {calculateDuration(
            item.startDateTime,
            item.endDateTime,
            item.sessionId,
          )}
        </span>

        <span className="font-semibold text-primary dark:text-light">
          Amount
        </span>
        <span className="text-gray-700 dark:text-gray-200">
          €{lineTotal.toFixed(2)}
        </span>
      </div>

      <div className="w-full border-t border-primary/20 dark:border-light/20 pt-2">
        <p className="font-semibold text-primary dark:text-light text-sm mb-2">
          Allocations
        </p>

        {item.allocations?.length > 0 ? (
          <div className="flex flex-col gap-2 w-full">
            {item.allocations.map((allocation) => (
              <div
                key={allocation.allocationId}
                className="rounded-md border border-primary/20 dark:border-light/20 p-2 text-sm"
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <span className="font-medium text-primary dark:text-light">
                    Type
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    {allocation.allocationType || "-"}
                  </span>

                  <span className="font-medium text-primary dark:text-light">
                    From
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    {formatDateTime(allocation.startAt) || "-"}
                  </span>

                  <span className="font-medium text-primary dark:text-light">
                    To
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    {formatDateTime(allocation.endAt) || "-"}
                  </span>

                  <span className="font-medium text-primary dark:text-light">
                    Seconds
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    {allocation.seconds ?? 0}
                  </span>

                  <span className="font-medium text-primary dark:text-light">
                    Amount
                  </span>

                  <span className="text-gray-700 dark:text-gray-200">
                    <div className="flex flex-col items-start">
                      {allocation.amountCents === 0 ? (
                        <p className="text-green-600 font-medium">
                          €0.00 (covered by pass)
                        </p>
                      ) : passInCart ? (
                        <>
                          <p>
                            €{((allocation.amountCents ?? 0) / 100).toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600">
                            This session will likely be covered by your pass at
                            checkout.
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            €{((allocation.amountCents ?? 0) / 100).toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600">
                            Add a new monthly pass to cover your WalkIn fee.
                          </p>
                        </>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No allocations available.
          </p>
        )}
      </div>
    </div>
  );
}
