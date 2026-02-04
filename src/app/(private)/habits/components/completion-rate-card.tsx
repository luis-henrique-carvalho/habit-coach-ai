"use client";

interface CompletionRateCardProps {
  rate30Days: number;
  rate60Days: number;
  rate90Days: number;
}

export function CompletionRateCard({
  rate30Days,
  rate60Days,
  rate90Days,
}: CompletionRateCardProps) {
  const getRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600 bg-green-50";
    if (rate >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getProgressBarColor = (rate: number) => {
    if (rate >= 80) return "bg-green-500";
    if (rate >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 30 Days */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">Last 30 Days</p>
        <div className="mb-3">
          <div
            className={`text-2xl font-bold ${getRateColor(
              rate30Days
            ).split(" ")[0]}`}
          >
            {rate30Days}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getProgressBarColor(
              rate30Days
            )}`}
            style={{ width: `${rate30Days}%` }}
          />
        </div>
      </div>

      {/* 60 Days */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">Last 60 Days</p>
        <div className="mb-3">
          <div
            className={`text-2xl font-bold ${getRateColor(
              rate60Days
            ).split(" ")[0]}`}
          >
            {rate60Days}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getProgressBarColor(
              rate60Days
            )}`}
            style={{ width: `${rate60Days}%` }}
          />
        </div>
      </div>

      {/* 90 Days */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">Last 90 Days</p>
        <div className="mb-3">
          <div
            className={`text-2xl font-bold ${getRateColor(
              rate90Days
            ).split(" ")[0]}`}
          >
            {rate90Days}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getProgressBarColor(
              rate90Days
            )}`}
            style={{ width: `${rate90Days}%` }}
          />
        </div>
      </div>
    </div>
  );
}
